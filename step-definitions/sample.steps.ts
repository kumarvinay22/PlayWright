import { Given, Then } from '@cucumber/cucumber';
import { LoginPage } from '../page-objects/LoginPage';
import { EnvironmentConfig } from '../utils/EnvironmentConfig';

let loginPage: LoginPage;

Given('I navigate to {string} in {string} environment', async function (path: string, env: string) {
  const baseURL = EnvironmentConfig.getBaseURL(env as 'sit' | 'qa' | 'uat');
  const fullURL = `${baseURL}${path}`;
  loginPage = new LoginPage(this.page);
  await loginPage.navigateToLoginPage(fullURL);
});

Given('I navigate to the login page in {string} environment', async function (env: string) {
  const baseURL = EnvironmentConfig.getBaseURL(env as 'sit' | 'qa' | 'uat');
  loginPage = new LoginPage(this.page);
  await loginPage.navigateToLoginPage(baseURL);
});

Then('I should see the login form with username and password fields', async function () {
  const isLoginFormVisible = await loginPage.isLoginFormVisible();
  if (!isLoginFormVisible) {
    throw new Error('Login form is not visible on the login page.');
  }
});
