'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

var prompts = {
  projectAuthor: 'Name of author',
  projectName: 'Name of project',
  projectDescription: 'Description of project',
  shouldCloneWordpress: false
};

describe('wp-simple:app', function () {
  describe('when not cloning the Wordpress repo', function() {

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts(prompts)
        .on('end', done);
    });

    it('copies the template files', function () {
      assert.file([
        'grunt-local-config-default.js',
        'Gruntfile.js',
        'app/index.php',
        'package.json',
        'README.md',
        'app/wp-config.php',
        '.editorconfig',
        '.gitignore',
        'app/.htaccess',
        '.jshintrc'
      ]);
    });

    it('creates the wordpress directory', function () {
      assert.file([
        'app/wordpress/.gitkeep'
      ]);
    });

    it('creates the content directory', function () {
      assert.file([
        'app/wp-content/.gitkeep'
      ]);
    });

  });

  describe('when cloning the Wordpress repo', function() {

    before(function (done) {
      this.timeout(60000);
      prompts.shouldCloneWordpress = true;
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts(prompts)
        .on('end', done);
    });

    it('clones the Wordpress repo', function () {
      assert.file([
        'app/wordpress/index.php'
      ]);
    });

  });
});
