import { BeforeAll, AfterAll, Before, After, setWorldConstructor, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

let browser: Browser;
let context: BrowserContext;

class CustomWorld {
  page!: Page; // The Playwright page instance
  context!: BrowserContext; // The Playwright browser context instance
}

setWorldConstructor(CustomWorld);

// Set a global maximum timeout for all Cucumber steps and hooks
setDefaultTimeout(120 * 1000); // Set timeout to 120 seconds

BeforeAll(async function () {
  console.log('[INFO]: Launching the browser in headed mode...');
  browser = await chromium.launch({ headless: false }); // Launch the browser in headed mode
  context = await browser.newContext();
  console.log('[INFO]: Browser launched and context created.');
});

Before(async function () {
  console.log('[INFO]: Creating a new page for the scenario...');
  this.context = context; // Attach the shared context to the World instance
  this.page = await context.newPage(); // Create a new page for the scenario
  console.log('[INFO]: New page created.');
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshotPath = path.resolve(
      __dirname,
      `../reports/json/screenshots/${scenario.pickle.name.replace(/ /g, '_')}.png`
    );
    await fs.promises.mkdir(path.dirname(screenshotPath), { recursive: true });
    await this.page.screenshot({ path: screenshotPath });
    console.log(`[INFO]: Screenshot saved at ${screenshotPath}`);
  }
  await this.page.close();
  console.log('[INFO]: Page closed after the scenario.');
});

AfterAll(async () => {
  console.log('[INFO]: Closing the browser and context...');
  await context.close();
  await browser.close();
  console.log('[INFO]: Browser and context closed after all tests.');
});
 



