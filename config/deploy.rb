set :application, 'lofanje-react'
set :repo_url, 'git@github.com:Michelium/lofanje-react.git'
set :tmp_dir, '/home/lofanje/deploy_tmp'

ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Keep the last 5 releases
set :keep_releases, 5

namespace :deploy do
  desc 'Install correct Node.js version from .nvmrc'
  task :load_nvm do
    on roles(:app) do
      within release_path do
        execute "cd #{release_path} && source $HOME/.bashrc && nvm install"
      end
    end
  end

  desc 'Install node modules'
  task :npm_install do
    on roles(:app) do
      within release_path do
        execute "cd #{release_path} && source $HOME/.bashrc && nvm use && npm install"
      end
    end
  end

  desc 'Build the React app'
  task :npm_run_build do
    on roles(:app) do
      within release_path do
        execute "cd #{release_path} && source $HOME/.bashrc && nvm use && npm run build"
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