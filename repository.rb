require 'grape'
require 'sequel'

class Repository < Grape::API
  version 'v1'
  default_format :json

  helpers do
    def forks
      DB[:forks]
    end

    def default_fork
      path = env['repository.path']

      scripts = Dir[File.join(path, '*.js')].map do |src_path|
        spec_name = File.basename(src_path).gsub /\.js$/, ''
        spec_path = File.join path, 'spec', spec_name + '_spec.js'

        src = File.open(src_path).read
        spec = File.open(spec_path).read

        [spec_name, {src: src, spec: spec}]
      end

      Hash[scripts]
    end
  end

  resource :forks do
    get ':id' do
      if fork = forks[id: params[:id]]
        fork[:data]
      else
        default_fork
      end
    end

    put ':id' do
      forks[id: params[:id]] = {data: request.body.read}
    end

    post 'new' do
      {id: forks.insert(data: request.body.read)}
    end
  end
end
