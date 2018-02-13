import test from 'ava';
import * as cp from 'child_process';
import * as path from 'path';

function execCli(...args: string[]): Promise<{err: Error | null, stdout: string, stderr: string, code: number}> {
    interface ErrorWithCode extends Error {
        code: number;
    }
    return new Promise((resolve) => {
        cp.exec(`${path.normalize('./node_modules/.bin/wotan')} '${args.join("' '")}'`, (err, stdout, stderr) => {
            return resolve({err, stdout, stderr, code: err ? (<ErrorWithCode>err).code : 0});
        });
    });
}

test('can be used with --module flag', async (t) => {
    const result = await execCli('-m', './src', '-c', './test/fixtures/.wotanrc.yaml', '-f', 'prose', 'test/fixtures/*');
    t.is(result.code, 2);
    t.is(result.stderr, '');
    t.is(result.stdout.trim(), `ERROR: ${path.resolve('test/fixtures/my-rule.js').replace(/\\/g, '/')}[5, 18]: Missing semicolon
ERROR: ${path.resolve('test/fixtures/my-rule.js').replace(/\\/g, '/')}[7, 2]: Missing semicolon
WARNING: ${path.resolve('test/fixtures/myTslintRuleRule.js').replace(/\\/g, '/') /*tslint:disable-line*/}[3, 1]: unused expression, expected an assignment or function call
ERROR: ${path.resolve('test/fixtures/myTslintRuleRule.js').replace(/\\/g, '/')}[9, 2]: Missing semicolon`);
});