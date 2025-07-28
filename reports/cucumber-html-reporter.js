const { generate } = require('multiple-cucumber-html-reporter');
const path = require('path');

// Generate a timestamp for the report folder
const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Replace invalid characters for file paths
const reportOutputDir = path.resolve(__dirname, `./cucumber-html-${timestamp}`);

generate({
  jsonDir: './reports/json', // Directory where JSON files are stored
  reportPath: reportOutputDir, // Directory where the HTML report will be generated
  metadata: {
    browser: {
      name: process.env.BROWSER || 'chromium',
    },
    device: 'Local Machine',
    platform: {
      name: process.platform,
      version: process.version,
    },
  },
  customData: {
    title: 'Execution Info',
    data: [
      { label: 'Project', value: 'Playwright Automation Framework' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Start Time', value: new Date().toLocaleString() },
    ],
  },
  displayDuration: true, // Display duration of each scenario
  reportName: `Cucumber HTML Report - ${timestamp}`,
  pageTitle: 'Cucumber HTML Report',
  openReportInBrowser: false,
  screenshotsDirectory: './reports/json/screenshots', // Directory where screenshots are stored
});

console.log(`[INFO]: Cucumber HTML report generated at: ${reportOutputDir}`);
