set :application, 'lofanje-react'
set :repo_url, 'git@github.com:Michelium/lofanje-react.git'
set :tmp_dir, '/home/lofanje/deploy_tmp'

ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Keep the last 5 releases
set :keep_releases, 5

# Custom NVM Cache Directory
set :nvm_cache_dir, "/home/lofanje/.nvm-cache"

namespace :deploy do
  desc 'Install correct Node.js version from .nvmrc'
  task :load_nvm do
    on roles(:app) do
      within release_path do
        execute "mkdir -p #{fetch(:nvm_cache_dir)} && export NVM_CACHE_DIR=#{fetch(:nvm_cache_dir)} && source $HOME/.bashrc && cd #{release_path} && nvm install"
      end
    end
  end

  desc 'Install node modules'
  task :npm_install do
    on roles(:app) do
      within release_path do
        execute "export NVM_CACHE_DIR=#{fetch(:nvm_cache_dir)} && source $HOME/.bashrc && cd #{release_path} && nvm use && npm install"
      end
    end
  end

  desc 'Build the React app'
  task :npm_run_build do
    on roles(:app) do
      within release_path do
        execute "export NVM_CACHE_DIR=#{fetch(:nvm_cache_dir)} && source $HOME/.bashrc && cd #{release_path} && nvm use && npm run build"
      end
    end
  end

  desc 'Empty tmp directory'
  task :cap_empty_tmp do
    on roles(:app) do
      within release_path do
        execute "rm -rf #{fetch(:tmp_dir)}/*"
      end
    end
  end

  before :npm_install, :load_nvm
  after :updated, 'deploy:npm_install'
  after :npm_install, 'deploy:npm_run_build'
  after :npm_run_build, 'deploy:cap_empty_tmp'
end
