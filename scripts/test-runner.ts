import { exec } from 'child_process';

const args = process.argv.slice(2).join(' ');
const env = process.env.ENV || 'qa';
const tags = process.env.TAGS || '';
const execution = process.env.EXECUTION || 'local'; // Default to local execution

if (execution === 'saucelabs') {
  console.log('[INFO]: Running tests on Sauce Labs using saucectl...');
  exec(
    `saucectl run --env ENV=${env} --env TAGS=${tags}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`[ERROR]: Sauce Labs execution failed with message: ${error.message}`);
        process.exit(1); // Exit with failure code
      }
      if (stderr) {
        console.error(`[STDERR]: ${stderr}`);
        process.exit(1); // Exit with failure code
      }
      console.log(`[STDOUT]: ${stdout}`);
      process.exit(0); // Exit with success code
    }
  );
} else {
  console.log('[INFO]: Running tests locally...');
  exec(
    `npx cucumber-js ${args} --world-parameters '{"env":"${env}","tags":"${tags}"}'`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`[ERROR]: Local execution failed with message: ${error.message}`);
        process.exit(1); // Exit with failure code
      }
      if (stderr) {
        console.error(`[STDERR]: ${stderr}`);
        process.exit(1); // Exit with failure code
      }
      console.log(`[STDOUT]: ${stdout}`);
      process.exit(0); // Exit with success code
    }
  );
}

// Ensure dependencies are installed:
// npm install @cucumber/cucumber playwright @playwright/test saucectl
