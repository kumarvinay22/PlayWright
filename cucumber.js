const browser = process.env.BROWSER || 'chromium'; // Default to 'chromium'
const tags = process.env.TAGS || ''; // Default to no tags
const execution = process.env.EXECUTION || 'local'; // Default to local execution
const responsive = process.env.RESPONSIVE === 'true'; // Default to false if not set
const featureFilePath = process.env.FEATURE || './features/**/*.feature'; // Default to all feature files
const parallelExecution = process.env.PARALLEL || 1; // Default to 1 (no parallelism)

const config = {
  default: {
    require: [
      './step-definitions/**/*.ts', // Load all step definitions
      './step-definitions/hooks.ts', // Load hooks
    ],
    requireModule: ['ts-node/register'], // Enable TypeScript support
    format: ['html:./reports/cucumber-report.html'], // Generate HTML report
    paths: [featureFilePath], // Path to feature files
    tags: tags, // Filter scenarios by tags
    parallel: parseInt(parallelExecution, 10), // Enable parallel execution
    worldParameters: {
      browser: browser,
      responsive: responsive,
    },
    publishQuiet: true, // Disable publishing to the Cucumber cloud
  },
};

if (execution === 'cloud') {
  console.log('[INFO]: Running tests on cloud...');
  const sauceUsername = process.env.SAUCE_USERNAME;
  const sauceAccessKey = process.env.SAUCE_ACCESS_KEY;

  if (!sauceUsername || !sauceAccessKey) {
    console.error('[ERROR]: Sauce Labs credentials are missing. Set SAUCE_USERNAME and SAUCE_ACCESS_KEY.');
    process.exit(1);
  }

  config.default.worldParameters.sauce = {
    username: sauceUsername,
    accessKey: sauceAccessKey,
  };
} else {
  console.log('[INFO]: Running tests locally...');
}

console.log(`[INFO]: Configuration:`, JSON.stringify(config, null, 2));
module.exports = config;

