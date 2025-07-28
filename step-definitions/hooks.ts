import { BeforeAll, AfterAll, Before, After, setWorldConstructor, Status } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import { BrowserFactory } from '../utils/BrowserFactory';
import path from 'path';
import fs from 'fs';

let context: BrowserContext;

class CustomWorld {
  page!: Page; // The Playwright page instance
}

setWorldConstructor(CustomWorld);

BeforeAll(async () => {
  const browserType = process.env.BROWSER || 'chromium';
  const responsive = process.env.RESPONSIVE === 'true'; // Default to false if not set
  context = await BrowserFactory.createBrowserContext(browserType, responsive);
});

Before(async function () {
  this.page = await context.newPage(); // Attach the page instance to the World
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
});

AfterAll(async () => {
  await context.close();
});
   

