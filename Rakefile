begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

task :spec do
  require './repository_spec'
end

namespace :db do
  task :migrate do
    require 'sequel'

    db = Sequel.connect ENV['DATABASE_URL'] || 'sqlite://development.db'
    Sequel.extension :migration
    Sequel::IntegerMigrator.new(db, 'migrations').run
  end
end
