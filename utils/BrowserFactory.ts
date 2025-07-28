import { chromium, firefox, webkit, Browser, BrowserContext } from '@playwright/test';

export class BrowserFactory {
  private static async getBrowser(browserType: string): Promise<Browser> {
    switch (browserType) {
      case 'chromium':
        return await chromium.launch();
      case 'firefox':
        return await firefox.launch();
      case 'webkit':
        return await webkit.launch();
      default:
        throw new Error(`[ERROR]: Unsupported browser type: ${browserType}`);
    }
  }

  public static async createBrowserContext(
    browserType: string,
    responsive: boolean
  ): Promise<BrowserContext> {
    const browser = await this.getBrowser(browserType);

    if (responsive) {
      return await browser.newContext({
        viewport: { width: 375, height: 812 }, // Example: iPhone X dimensions
        isMobile: true,
      });
    } else {
      return await browser.newContext(); // Default desktop context
    }
  }
}
