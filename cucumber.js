const tags = process.env.TAGS || '@QA'; // Default to no tags
const execution = process.env.EXECUTION || 'local'; // Default to local execution
const responsive = process.env.RESPONSIVE === 'true'; // Default to false if not set
const featureFilePath = './features/sample.feature'; // Specify the feature file path directly
const parallelExecution = parseInt(process.env.PARALLEL || '2', 10); // Default to 1 (no parallelism)

const config = {
  default: {
    require: [
      './step-definitions/**/*.ts', // Ensure this path matches the location of your step definitions
      './step-definitions/hooks.ts', // Load hooks
    ],
    requireModule: ['ts-node/register'], // Enable TypeScript support
    format: ['html:./reports/cucumber-report.html'], // Generate HTML report
    paths: [featureFilePath], // Path to the specific feature file
    tags: tags, // Filter scenarios by tags
    parallel: parallelExecution, // Enable parallel execution
    worldParameters: {
      responsive: responsive,
      execution: execution,
    },
    publishQuiet: true, // Disable publishing to the Cucumber cloud
  },
};

const sauceUsername = process.env.SAUCE_USERNAME;
const sauceAccessKey = process.env.SAUCE_ACCESS_KEY;

if (execution === 'cloud') {
  console.log('[INFO]: Running tests on cloud...');
  if (!sauceUsername || !sauceAccessKey) {
    console.error('[ERROR]: Sauce Labs credentials are missing. Set SAUCE_USERNAME and SAUCE_ACCESS_KEY.');
    process.exit(1);
  }
  // Add Sauce Labs credentials to world parameters
  config.default.worldParameters.sauce = {
    username: sauceUsername,
    accessKey: sauceAccessKey,
  };
} else {
  console.log('[INFO]: Running tests locally...');
}

// Log the final configuration
console.log(`[INFO]: Configuration:`, JSON.stringify(config, null, 2));
module.exports = config;

