import { Page } from '@playwright/test';

export async function waitForVisible(page: Page, selector: string): Promise<void> {
  try {
    await page.waitForSelector(selector, { state: 'visible' });
  } catch (error) {
    console.error(`[ERROR]: Failed to wait for visibility of selector: ${selector}`, error);
    throw error;
  }
}

export async function waitForClick(page: Page, selector: string): Promise<void> {
  try {
    await waitForVisible(page, selector);
    await page.click(selector);
    console.log(`[LOG]: Clicked on selector: ${selector}`);
  } catch (error) {
    console.error(`[ERROR]: Failed to click on selector: ${selector}`, error);
    throw error;
  }
}

export async function getText(page: Page, selector: string): Promise<string> {
  try {
    await waitForVisible(page, selector);
    const text = await page.textContent(selector);
    console.log(`[LOG]: Extracted text from selector: ${selector} -> ${text}`);
    return text || '';
  } catch (error) {
    console.error(`[ERROR]: Failed to get text from selector: ${selector}`, error);
    throw error;
  }
}

export async function logMessage(message: string): Promise<void> {
  const timestamp = new Date().toISOString();
  console.log(`[LOG] [${timestamp}]: ${message}`);
}

export async function takeScreenshot(page: Page, filePath: string): Promise<void> {
  try {
    await page.screenshot({ path: filePath });
    console.log(`[LOG]: Screenshot saved at ${filePath}`);
  } catch (error) {
    console.error(`[ERROR]: Failed to take screenshot at ${filePath}`, error);
    throw error;
  }
}
