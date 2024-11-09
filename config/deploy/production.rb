server '37.97.173.115', user: 'lofanje', roles: %w{app db web}
set :deploy_to, '~/domains/lofanjedt.nl'
ask :branch, 'master'