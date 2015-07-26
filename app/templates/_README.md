# <%= projectName %>

<%= projectDescription %>

## Directory Structure

This site contains static pages and a Wordpress app. Therefore, the setup that makes the most sense is as follows:

```
.
+-- README.md
+-- .gitignore
+-- ... (any other dev files)
+-- __app
+-- ____wordpress (wordpress core - setup as a [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules))
+-- ____wp-content (custom theme(s))
```

## Grunt

To get started, run `npm install`. Next, configure your local environment settings by copying 'grunt-local-config-default.js' to 'grunt-local-config.js' and update properties--more details located at the top of the file. Make sure your prereqs (below) are met, and you're all set.

### Prereqs

Ensure your ssh key is authorized your dev server. To do so, run the following command (replacing `<user>` with your username and `<server>` with your sever's name).

    cat ~/.ssh/id_rsa.pub | ssh <user>@<server> 'cat >> .ssh/authorized_keys'

Make sure you can log onto the server without a password.

    ssh <user>@<server>

That's it!

### Available Tasks

`grunt dev`: Use this before you start local development, it will take care of things like watching and compiling your sass.

`grunt pull`: Pulls the most recent version of the database, uploads, and plugins. **Note: this will overwrite everything you have locally, so make sure to run this prior to making any local updates to your database.**

`grunt push`: Pushes your local database changes to the staging server, as well as anything in uploads and plugins. **Note: this will overwrite the database, uploads, and plugins on the server, so make sure you did a pull prior to the updates you just made.**

`grunt deploy_theme`: Pushes the theme code (the important stuff) to the staging server. This should only be done when you're at a point you want to deploy. Master should be the only branch that is ever deployed, so make sure you have master checked out, and it's in sync with origin/master (e.g. Did you do a `git pull`?).

### Uh oh!

If something goes wrong with the database sync, don't worry--all is not lost (hopefully!). You should have a 'backups' directory after running `grunt pull` or `grung push` in the root of your project. There you will find a copy of the local and server databases for each time the task was run. If you need to revert to one fo these versions, you can import the datbase doing something like:

    mysql -u <username> -p <db_name> < path/to/your/file.sql

If you get an error while trying to push and pull, make sure that your filepath on the server is correct. This can be found in `Gruntfile.js` at the root of your project. By default, the path is `/var/www/sites`.
