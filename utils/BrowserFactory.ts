import { chromium, firefox, webkit, Browser, BrowserContext } from '@playwright/test';

export class BrowserFactory {
  static async initializeBrowser(parameters: any): Promise<{ browserInstance: Browser; browserContext: BrowserContext }> {
    const browserType = parameters.browser || 'webkit'; // Default to 'chromium'
    const responsive = parameters.responsive || false; // Default to desktop view
    let browser: Browser;

    console.log(`[INFO]: Launching browser: ${browserType}`);
    if (browserType === 'chromium') {
      browser = await chromium.launch({ headless: false });
    } else if (browserType === 'firefox') {
      browser = await firefox.launch({ headless: false });
    } else if (browserType === 'webkit') {
      browser = await webkit.launch({ headless: false });
    } else {
      throw new Error(`[ERROR]: Unsupported browser type: ${browserType}`);
    }

    console.log(`[INFO]: Creating browser context. Responsive: ${responsive}`);
    const context = responsive
      ? await browser.newContext({
          viewport: { width: 375, height: 812 }, // Example: iPhone X dimensions
          isMobile: true,
        })
      : await browser.newContext(); // Default desktop context

    console.log('[INFO]: Browser and context launched successfully.');
    return { browserInstance: browser, browserContext: context };
  }
}

