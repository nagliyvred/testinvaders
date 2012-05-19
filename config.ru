require 'rack-rewrite'

run Rack::Builder.new {
  use Rack::Rewrite do
    r302 '/', '/public/html/index.html'
  end

  map '/public' do
    run Rack::Directory.new File.join Dir.pwd, 'public'
  end
}
