import { Given, Then } from '@cucumber/cucumber';
import { LoginPage } from '../page-objects/LoginPage';
import { EnvironmentConfig } from '../utils/EnvironmentConfig';

let loginPage: LoginPage;

Given('I navigate to the login page in {string} environment', async function (env: string) {
  const baseURL = EnvironmentConfig.getBaseURL(env as 'sit' | 'qa' | 'uat'); // Get the base URL for the environment
  console.log(`[INFO]: Navigating to URL: ${baseURL}`);
  loginPage = new LoginPage(this.page); // Initialize the LoginPage object
  await loginPage.navigateToLoginPage(baseURL); // Navigate to the login page
});

Then('I should see the login form with username and password fields', async function () {
  const isLoginFormVisible = await loginPage.isLoginFormVisible(); // Check if the login form is visible
  if (!isLoginFormVisible) {
    throw new Error('[ERROR]: Login form is not visible on the login page.');
  }
  console.log('[INFO]: Login form is visible with username, password fields, and login button.');
});
