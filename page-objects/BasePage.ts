import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    try {
      console.log(`[LOG]: Navigating to ${url}`);
      await this.page.goto(url, { waitUntil: 'load', timeout: 30000 });
    } catch (error) {
      console.error(`[ERROR]: Failed to navigate to ${url}`);
      if (error.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
        console.error(`[ERROR]: The domain name could not be resolved. Please check the URL: ${url}`);
      }
      throw error;
    }
  }
}
