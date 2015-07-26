var utils = {
  formatDataForTemplate: function() {
    return {
      projectName: this.props.projectName,
      projectDescription: this.props.projectDescription,
      projectAuthor: this.props.projectAuthor,
      yeomanConfigPathsBase: '<%= localConfig.base_path %>',
      yeomanLocalConfigServerUser: '<%= localConfig.server_user %>',
      yeomanLocalConfigServerHostname: '<%= localConfig.server_hostname %>',
      yeomanLocalConfigRepoPath: '<%= localConfig.repo_path %>',
      yeomanLocalConfigThemeName: '<%= localConfig.theme_name %>'
    }
  },
  createWordpressStructure: function() {
    this.fs.write(this.destinationPath('app/wordpress/.gitkeep'), '');
    this.fs.write(this.destinationPath('app/wp-content/.gitkeep'), '');
    this.fs.write(this.destinationPath('app/wp-content/themes/.gitkeep'), '');
    this.fs.write(this.destinationPath('app/wp-content/plugins/.gitkeep'), '');
    this.fs.write(this.destinationPath('app/wp-content/uploads/.gitkeep'), '');
  }
}

module.exports = utils;
