require 'json'
require 'minitest/autorun'
require 'rack/test'

require './repository'

DB = Sequel.connect 'sqlite://test.db'

Sequel.extension :migration
Sequel::IntegerMigrator.new(DB, 'migrations').run

module TransactionalTestCase
  def run *args
    [].tap do |rv|
      DB.transaction(rollback: :always) { rv << super(*args) }
    end.pop
  end
end

describe Repository do
  include Rack::Test::Methods
  include TransactionalTestCase

  let(:app) { Repository }
  let(:forks) { DB[:forks] }
  let(:stub_fork) { {'abc' => '123'} }
  let(:stub_fork_2) { {'123' => 'abc'} }

  before { @fork_id = forks.insert(data: stub_fork.to_json) }

  it 'should reply with default data on requests for non-existent forks' do
    Dir.mktmpdir do |tmpdir|
      Dir.mkdir File.join(tmpdir, 'spec')

      File.open(File.join(tmpdir, 'thing.js'), 'w') { |f| f << 'abc' }
      File.open(File.join(tmpdir, 'spec', 'thing_spec.js'), 'w') { |f| f << '123' }

      get '/v1/forks/xyzzy', {}, {'repository.path' => tmpdir}

      assert last_response.ok?, 'Failed to get non-existent fork: xyzzy'
      JSON(last_response.body).must_equal 'thing' => {'src' => 'abc', 'spec' => '123'}
    end
  end

  it 'should reply with the data for a fork' do
    get "/v1/forks/#{@fork_id}"

    assert last_response.ok?, "Failed to get fork: #{@fork_id}"
    JSON(last_response.body).must_equal stub_fork
  end

  it 'should overrwrite forks' do
    put "/v1/forks/#{@fork_id}", stub_fork_2.to_json

    assert last_response.ok?, "Failed to put fork: #{@fork_id}"
    JSON(DB[:forks][id: @fork_id][:data]).must_equal stub_fork_2
  end

  it 'should create new forks' do
    post '/v1/forks/new', stub_fork.to_json

    assert last_response.successful?, 'Failed to create a new fork'

    new_id = JSON(last_response.body)['id']
    DB[:forks][id: new_id][:data].must_equal stub_fork.to_json
  end
end
