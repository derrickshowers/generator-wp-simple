'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var git = require('simple-git');
var multiline = require('multiline');

var files = require('./files.json');
var utils = require('./utils');
var prompts = require('./prompts');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async(),
        thePrompts;

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('wp-simple') + ' generator!'
    ));

    thePrompts = prompts.getQuestions();

    this.prompt(thePrompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: {
    copy: function() {
      var contextData = utils.formatDataForTemplate.call(this);

      files.forEach(function(file) {
        this.fs.copyTpl(
          this.templatePath(file.templateName),
          this.destinationPath(file.destination),
          contextData
        );
      }.bind(this));
    },
    git: function() {
      var done;

      if (this.props.shouldCloneWordpress) {
        done = this.async();
        this.log('Pulling down latest from Wordpress. This could take some time.');
        git()
          .init()
          .submoduleAdd('git://github.com/WordPress/WordPress.git', 'app/wordpress', function(err) {
            this.log('Success! Wordpress has been pulled into your project!');
            utils.createWordpressStructure.call(this);
            done();
          }.bind(this));
      } else {
        utils.createWordpressStructure.call(this);
      }
    }
  },

  install: function () {
    this.npmInstall();
  },

  end: function() {
    var whatNext = multiline(function() {/*
    That's it! We're done! Hooray! Shots!

    Ok, maybe that's a little overboard. There's still more work to be done. Look at the
    README that is part of your new project, it will have all the details, but a quick list:
         * Copy 'grunt-local-config-default.js' to 'grunt-local-config.js' (in the
           root of your project) and modify the values for you.
         * Update app/wp-config.php with your database info
         * Update 'Gruntfile.js' with the correct path to your scss (only necessary if
           you're planning to use the 'grunt dev' task)

    Ok, now you're done. Open issues/ask questions via Github.
    */});
    this.log(chalk.green(whatNext));


    if (!this.props.shouldCloneWordpress) {
      this.log(chalk.bold.yellow('Since you elected not to install Wordpress, when you\'re ready to, run the following command in the root of your project:\ngit submodule add git://github.com/WordPress/WordPress.git app/wordpress/'));
    }
  }
});
