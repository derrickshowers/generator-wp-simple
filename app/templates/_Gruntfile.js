var localConfig = require('./grunt-local-config');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    localConfig: localConfig,
    sass: {
      dist: {
        files: {
          '<%= yeomanConfigPathsBase %>/library/css/style.css': '<%= yeomanConfigPathsBase %>/library/scss/style.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['<%= yeomanConfigPathsBase %>/library/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    },
    wordpressdeploy: {
      options: {
        backup_dir: 'backups/',
        target: 'staging',
        rsync_args: ['--verbose', '--progress', '-rlpt', '--compress', '--omit-dir-times', '--delete'],
        exclusions: ['Gruntfile.js', '.git/', 'tmp/*', 'backups/', 'wp-config.php', 'composer.json', 'composer.lock', 'README.md', '.gitignore', 'package.json', 'node_modules']
      },
      local: {
        'title':        'local',                          // name of environment
        'database':     'database_name',                  // name of database
        'user':         'db_user',                        // database user
        'pass':         'backstreetboys4life',            // database user's password
        'host':         'localhost',                      // database hostname
        'url':          'http://localhost:9000',          // site url
        'path':         '/path/to/project'                // full path to project in this environment
      },
      staging: {
        'title':        'staging',                        // name of environment
        'database':     'database_name',                  // name of database
        'user':         'db_user',                        // database user
        'pass':         'britspears4life',                // database user's password
        'host':         'localhost',                      // database hostname
        'url':          'http://staging.com',             // site url
        'path':         '/var/www/path/to/project'        // full path to project in this environment
      }
    },
    rsync: {
      pull_uploads: {
        options: {
          args: ['--verbose', '--progress', '-rlt', '--compress', '--omit-dir-times'],
          src: '<%= yeomanLocalConfigServerUser %>@<%= yeomanLocalConfigServerHostname %>:/var/www/sites/<%= yeomanLocalConfigThemeName %>/wp-content/uploads/',
          dest: '<%= yeomanLocalConfigRepoPath %>/app/wp-content/uploads/',
          ssh: true,
          delete: true
        }
      },
      pull_plugins: {
        options: {
          args: ['--verbose', '--progress', '-rlt', '--compress', '--omit-dir-times'],
          src: '<%= yeomanLocalConfigServerUser %>@<%= yeomanLocalConfigServerHostname %>:/var/www/sites/<%= yeomanLocalConfigThemeName %>/wp-content/plugins/',
          dest: '<%= yeomanLocalConfigRepoPath %>/app/wp-content/plugins/',
          ssh: true,
          delete: true
        }
      },
      push_uploads: {
        options: {
          args: ['--verbose', '--progress', '-rlt', '--compress', '--omit-dir-times'],
          src: '<%= yeomanLocalConfigRepoPath %>/app/wp-content/uploads/',
          dest: '<%= yeomanLocalConfigServerUser %>@<%= yeomanLocalConfigServerHostname %>:/var/www/sites/<%= yeomanLocalConfigThemeName %>/wp-content/uploads/',
          ssh: true,
          delete: true
        }
      },
      push_plugins: {
        options: {
          args: ['--verbose', '--progress', '-rlt', '--compress', '--omit-dir-times'],
          src: '<%= yeomanLocalConfigRepoPath %>/app/wp-content/plugins/',
          dest: '<%= yeomanLocalConfigServerUser %>@<%= yeomanLocalConfigServerHostname %>:/var/www/sites/<%= yeomanLocalConfigThemeName %>/wp-content/plugins/',
          ssh: true,
          delete: true
        }
      },
      deploy_theme: {
        options: {
          args: ['--verbose', '--progress', '-rlt', '--compress', '--omit-dir-times'],
          exclude: ['scss','.sass-cache'],
          src: '<%= yeomanLocalConfigRepoPath %>/app/wp-content/themes/<%= yeomanLocalConfigThemeName %>/',
          dest: '<%= yeomanLocalConfigServerUser %>@<%= yeomanLocalConfigServerHostname %>:/var/www/sites/<%= yeomanLocalConfigThemeName %>/wp-content/themes/<%= yeomanLocalConfigThemeName %>/',
          ssh: true,
          delete: true
        }
      }
    },
    prompt: {
      git_master: {
        options: {
          questions: [
            {
              config: 'continue',
              type: 'confirm',
              message: 'You are about to deploy the <%= yeomanLocalConfigThemeName %> theme to staging. Are you sure you\'re on master?',
              default: false
            }
          ],
          then: function(results, done) {
            if (results.continue) {
              done();
            } else {
              grunt.fail.warn('Please make sure you\'re deploying master');
            }
          }
        }
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-wordpress-deploy');
  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-prompt');

  // tasks
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('pull', ['pull_db', 'rsync:pull_uploads', 'rsync:pull_plugins']);
  grunt.registerTask('push', ['push_db', 'rsync:push_uploads', 'rsync:push_plugins']);
  grunt.registerTask('deploy_theme', ['prompt:git_master', 'rsync:deploy_theme']);

};
