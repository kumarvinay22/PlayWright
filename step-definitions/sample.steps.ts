import { Given } from '@cucumber/cucumber';
import { BasePage } from '../page-objects/BasePage';
import { EnvironmentConfig } from '../utils/EnvironmentConfig';

let basePage: BasePage;

Given('I navigate to {string} in {string} environment', async function (path: string, env: string) {
  const baseURL = EnvironmentConfig.getBaseURL(env); // Retrieve the base URL from EnvironmentConfig
  const fullURL = `${baseURL}${path}`;
  console.log(`[INFO]: Navigating to URL: ${fullURL}`);
  basePage = new BasePage(this.page); // Use the page from pageFixture
  try {
    await basePage.navigateTo(fullURL);
  } catch (error) {
    console.error(`[ERROR]: Navigation failed for URL: ${fullURL}`);
    console.error(`[ERROR DETAILS]:`, error);
    throw error;
  }
});


