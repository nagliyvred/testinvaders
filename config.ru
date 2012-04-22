require 'rack-rewrite'
require 'rack/coffee'

run Rack::Builder.new {
  use Rack::Rewrite do
    r302 '/', '/public/html/index.html'
  end

  use Rack::Coffee,
    :root => Dir.pwd,
    :urls => '/public'

  map '/public' do
    run Rack::Directory.new File.join Dir.pwd, 'public'
  end
}
