var prompts = {
  getQuestions: function() {
    return [
      {
        type: 'text',
        name: 'projectAuthor',
        message: 'Enter your name (project author):'
      },
      {
        type: 'text',
        name: 'projectName',
        message: 'Enter the name of your project:'
      },
      {
        type: 'text',
        name: 'projectDescription',
        message: 'Enter a description of your project:'
      },
      {
        type: 'confirm',
        name: 'shouldCloneWordpress',
        message: 'Do you have a few minutes to clone the Wordpress repo (this could get a bit complicated if you decide to do it yourself later)?',
        default: true
      }
    ];
  }
}

module.exports = prompts;
