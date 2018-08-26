# config valid for current version and patch releases of Capistrano
lock '~> 3.11.0'

set :application, 'contact'
set :repo_url, 'https://github.com/fsek/contact.git'
set :stages, %w(production development)
set :rbenv_path, '$HOME/.rbenv'

set :user, :dirac

set :use_sudo, false
set :bundle_binstubs, nil

# Default value for :linked_files is []
set :linked_files, %w(.rbenv-vars)

# Default value for linked_dirs is []
set :linked_dirs, %w(log tmp vendor/bundle public/system
                     public/uploads storage public/sitemaps)

set :pty, true

set :nvm_type, :user
set :nvm_node, 'v0.10.21'
set :nvm_map_bins, %w{node npm yarn}

after 'deploy:published', 'passenger:restart'
