require 'rack-rewrite'
require './repository'

db = Sequel.connect ENV['DATABASE_URL'] || 'sqlite://development.db'

Sequel.extension :migration
Sequel::IntegerMigrator.new(db, 'migrations').run

public_directory = File.join Dir.pwd, 'public'

run Rack::Builder.new {
  use Rack::Config do |env|
    env['repository.path'] = File.join public_directory, 'javascript', 'game'
  end

  run Repository

  use Rack::Rewrite do
    rewrite %r{^/(\?[0-9]*)?$}, '/public/html/index.html'
  end

  map '/public' do
    run Rack::Directory.new public_directory
  end
}
