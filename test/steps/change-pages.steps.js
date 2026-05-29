import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user is on {string}', async function (url) {
  await this.page.goto(url);
  await this.page.waitForLoadState('networkidle');
});

When('the user clicks the {string} {string}', async function (toolName, elementType) {
  if (elementType === 'text link') {
    const textLink = this.page.getByRole('link', { name: new RegExp(toolName, 'i') });
    await textLink.click();
  } else if (elementType === 'icon link') {
    const iconLink = this.page.locator('[aria-label="' + toolName + '"]');
    await iconLink.click();
  }
});

Then('the browser URL should change to {string}', async function (expectedUrl) {
  await this.page.waitForURL(expectedUrl);

  const currentUrl = this.page.url();
  if (currentUrl !== expectedUrl) {
    throw new Error(`Expected redirection to be "${expectedUrl}", but resolved to "${currentUrl}"`);
  }
});
