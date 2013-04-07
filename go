#! /usr/bin/env bash
[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm"
[[ -s "/usr/lib/rvm/scripts/rvm" ]] && . "/usr/lib/rvm/scripts/rvm"


rvm rvmrc trust
cd spec; cd .. # hack to load RVMRC

HAS_BUNDLER=`gem list --local |grep bundler`
if [ "$HAS_BUNDLER" = "" ]; then
  gem install bundler --no-rdoc --no-ri
fi

bundle check > /dev/null || bundle install
bundle exec rake $@ 
