require 'rubygems'
require 'daemons'

options = {
  :app_name => "testinvaders",
  :backtrace => true,
  :dir_mode => :normal,
  :dir => "/opt/testinvaders"
}

Daemons.run('/usr/bin/shotgun', options)
