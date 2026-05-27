import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user is on {string}', async function (url) {
  await this.page.goto(url);
  await this.page.waitForLoadState('networkidle');
});

When('the user clicks the {string} {string}', async function (toolName, elementType) {
  if (elementType === 'text link') {
    // 1. Universally locate the link by the text passed from the data table row
    // E.g., looks for text matches like "Color Converter", "SQL Formatter", etc.
    const textLink = this.page.getByRole('link', { name: new RegExp(toolName, 'i') });
    await textLink.click();
  } else if (elementType === 'icon link') {
    // Target the specific link wrapper housing that specific icon asset
    const iconLink = this.page.locator('[aria-label="' + toolName + '"]');
    await iconLink.click();
  }
});

Then('the browser URL should change to {string}', async function (expectedUrl) {
  // Gracefully wait until navigation settles on the dynamic path variable target
  await this.page.waitForURL(expectedUrl);

  const currentUrl = this.page.url();
  if (currentUrl !== expectedUrl) {
    throw new Error(`Expected redirection to be "${expectedUrl}", but resolved to "${currentUrl}"`);
  }
});
