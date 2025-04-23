var common = [
    `--format ${
        process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
    }`,
    '--format json:./reports/cucumber-json-reports/report.json',
    '--format rerun:./reports/@rerun.txt',
    '--format usage:./reports/usage.txt',
    '--parallel 20',
    '--require ./build/features/step-definitions/**/*.js',
    '--require ./build/features/step-definitions/*.js'
].join(' ');

module.exports = {
    default: common,
};
