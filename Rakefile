begin
  require 'jasmine'
  require 'jasmine-phantom/server'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

task :spec do
  require './repository_spec'
end

namespace :jasmine do
  namespace :phantom do
    desc "Run jasmine specs using phantomjs and report the results"
    task :ci => "jasmine:require" do
      jasmine_config_overrides = File.join(Jasmine::Config.new.project_root, 'spec', 'javascripts' ,'support' ,'jasmine_config.rb')
      require jasmine_config_overrides if File.exist?(jasmine_config_overrides)

      port = Jasmine::Phantom::Server.start
      script = File.join File.dirname(__FILE__), 'spec/javascripts/support/run-jasmine.js'

      pid = fork { exit system("phantomjs #{script} http://localhost:#{port}") }

      begin
        Thread.pass
        sleep 0.1
        wait_pid, status = Process.waitpid2 pid, Process::WNOHANG
      end while wait_pid.nil?
      exit(1) unless status.success?
    end
  end
end

namespace :db do
  task :migrate do
    require 'sequel'

    db = Sequel.connect ENV['DATABASE_URL'] || 'sqlite://development.db'
    Sequel.extension :migration
    Sequel::IntegerMigrator.new(db, 'migrations').run
  end
end

namespace :build do
  desc "building deployable deb"
  task :package do
    puts "building version #{ENV['GO_PIPELINE_LABEL']}"
    system("fpm  -s dir -t deb -n testinvaders -v #{ENV['GO_PIPELINE_LABEL']} -x '*.git*' --prefix=/opt/testinvaders .")
  end

end
