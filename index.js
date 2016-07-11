// Imports _____________________________________________________________________

const execSync = require('child_process').execSync;
const hyphenToCamel = require('./utilities.js').hyphenToCamel;
const git_commands = require('./git_commands.js');
const reserved_words = require('./reserved_words.js');

// Object Definition ___________________________________________________________

const git = {
    /**
     * Default entry point for running Git commands. This function should
     * generally not be used†, but will remain publicly-accessible in order to
     * maintain forward compatibility with future versions of Git which may
     * contain new methods not yet defined by the `git_commands` module.
     *
     * † — However, this is *super* helpful if you use a lot of aliases!
     *
     * @param  {String} cmd  The full subcommand, including any arguments.
     * @param  {Object} opts An options object to pass on to the `execSync` method.
     *
     * @throws {TypeError} If an unknown command or flag is passed in.
     *
     * @return {String} A string representation of the stdout stream.
     */
    _exec(cmd, opts) {
        return execSync(`git ${cmd}`, opts).toString();
    }
};

// Add all commands onto the `git` object
git_commands.forEach(sub_command => {
    // Create JavaScript-compatible method names
    let method_name = hyphenToCamel(sub_command);

    // Rename methods that are reserved words in JavaScript by prefixing them
    // with a “$” character.
    if (reserved_words.includes(sub_command)) {
        method_name = '$' + method_name;
    }

    git[method_name] = function(args) {
        let cmd = sub_command;
        if (typeof args === 'string') {
            cmd = `${sub_command} ${args}`;
        }

        return git._exec(cmd);
    }
});

// Exports _____________________________________________________________________

module.exports = git;
