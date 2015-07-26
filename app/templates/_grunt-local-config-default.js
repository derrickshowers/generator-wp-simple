/**
 * This is the local config file for grunt. Grunt will not work without modifying
 * properties in this file so that they match your local environment.
 *
 * First, rename this file 'grunt-local-config.js'. Git is already configured so that
 * it will ignore your copy (if you see 'grunt-local-config-default.js' modified when
 * doing a 'git status,' it means you modified the wrong file).
 *
 * After renaming the file, change the properties in the 'config' object below.
 *
 * server_user: Username for your server. Make sure you have your ssh key
 *              set as an authorized key on the server. Instructions on how to do that
 *              are in the README.
 *
 * server_hostname: The hostname of your server (e.g. `ssh user@SERVERNAME`)
 *
 * local_repo_path: Path for the project on your machine.
 *
 * base_path: Path for the theme relative to the root of the project.
 *
 * theme_name: The name of your wordpress theme.
 */

var config = {
  server_user:        'user',
  server_hostname:    'dev.servername.com'
  local_repo_path:    'local/path/to/your/project',
  base_path:          'app/wp-content/themes/theme-name',
  theme_name:         'twenty-eleven'
};

module.exports = config;
