import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameSelector = 'input[name="username"]';
  private passwordSelector = 'input[name="password"]';
  private loginButtonSelector = 'button[type="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLoginPage(url: string): Promise<void> {
    try {
      console.log(`[INFO]: Navigating to ${url}`);
      await this.page.goto(url, { waitUntil: 'load', timeout: 30000 });
    } catch (error: any) {
      console.error(`[ERROR]: Navigation failed for URL: ${url}`);
      console.error(`[ERROR DETAILS]:`, error);
      throw error;
    }
  }

  async isLoginFormVisible(): Promise<boolean> {
    const isUsernameVisible = await this.page.isVisible(this.usernameSelector);
    const isPasswordVisible = await this.page.isVisible(this.passwordSelector);
    const isLoginButtonVisible = await this.page.isVisible(this.loginButtonSelector);

    return isUsernameVisible && isPasswordVisible && isLoginButtonVisible;
  }
}
    