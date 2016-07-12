// Imports _____________________________________________________________________

const execSync = require('child_process').execSync;

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const git = require('../index.js');

// Test Suite __________________________________________________________________

describe('git', function() {
    it('should have common commands available as functions', () => {
        // Sanity check to ensure there is no magic getter logic returning proxy
        // methods for any unknown object members
        expect(git.outtahere).to.not.exist;

        // A handful of commonly-used Git commands
        [
            '$status',
            'branch',
            'add',
            'commit',
            'stash',
            'pull',
            'push',
        ].forEach(method => {
            expect(git[method]).to.exist;
            expect(typeof git[method]).to.equal('function');
        });
    });

    describe('._exec', () => {
        it('should throw if an unknown command is passed', () => {
            const spy = sinon.spy(git, '_exec');

            try {
                git._exec('ayylmao');
            }
            catch (x) {
                // ¯\_(ツ)_/¯
            }

            expect(spy).to.have.thrown;

            git._exec.restore();
        });
    });
});
