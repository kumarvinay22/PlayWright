import { BeforeAll, AfterAll, Before, After, setWorldConstructor, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { BrowserFactory } from '../utils/BrowserFactory';
import path from 'path';
import fs from 'fs';

let browser: Browser | null = null;
let context: BrowserContext | null = null;

class CustomWorld {
  page!: Page; // The Playwright page instance
  context!: BrowserContext; // The Playwright browser context instance
}

setWorldConstructor(CustomWorld);

// Set a global maximum timeout for all Cucumber steps and hooks
setDefaultTimeout(120 * 1000); // Set timeout to 120 seconds

BeforeAll(async function () {
  console.log('[INFO]: Initializing browser and context...');
  try {
    const { browserInstance, browserContext } = await BrowserFactory.initializeBrowser(this.parameters); // Use BrowserFactory
    browser = browserInstance;
    context = browserContext;
    console.log('[INFO]: Browser and context initialized successfully.');
  } catch (error) {
    console.error('[ERROR]: Failed to initialize browser or context:', error);
    throw error;
  }
});

Before(async function () {
  if (!context) {
    throw new Error('[ERROR]: Browser context is not initialized. Ensure BeforeAll hook runs successfully.');
  }
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
    try {
      await fs.promises.mkdir(path.dirname(screenshotPath), { recursive: true });
      await this.page.screenshot({ path: screenshotPath });
      console.log(`[INFO]: Screenshot saved at ${screenshotPath}`);
    } catch (error) {
      console.error('[ERROR]: Failed to save screenshot:', error);
    }
  }
  if (this.page) {
    try {
      await this.page.close();
      console.log('[INFO]: Page closed after the scenario.');
    } catch (error) {
      console.error('[ERROR]: Failed to close the page:', error);
    }
  }
});

AfterAll(async () => {
  console.log('[INFO]: Closing the browser and context...');
  try {
    if (context) {
      await context.close();
      context = null; // Ensure context is set to null after closing
      console.log('[INFO]: Context closed.');
    }
    if (browser) {
      await browser.close();
      browser = null; // Ensure browser is set to null after closing
      console.log('[INFO]: Browser closed.');
    }
  } catch (error) {
    console.error('[ERROR]: Failed to close browser or context:', error);
  }
});






