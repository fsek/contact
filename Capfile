# Load DSL and set up stages
require 'capistrano/setup'

# Include default deployment tasks
require 'capistrano/deploy'

require 'capistrano/rbenv'
set :rbenv_type, :user # or :system, depends on your rbenv setup

# Do not forget to update in .ruby-version, circle.yml and Gemfile
set :rbenv_ruby, '2.5.0'

# Load the SCM plugin appropriate to your project:
#
# require "capistrano/scm/hg"
# install_plugin Capistrano::SCM::Hg
# or
# require "capistrano/scm/svn"
# install_plugin Capistrano::SCM::Svn
# or
require 'capistrano/scm/git'
install_plugin Capistrano::SCM::Git

require 'capistrano/bundler'
require 'capistrano/rails/assets'
require 'capistrano/rails/migrations'
require 'capistrano/passenger'
#require 'rollbar/capistrano3'
require 'capistrano/yarn'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
