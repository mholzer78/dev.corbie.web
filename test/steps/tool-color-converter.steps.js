import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user is using Color Connverter', async function () {
  await this.page.goto('http://localhost:4200/color-converter');
  await this.page.waitForLoadState('networkidle');
});

When('the user changes {string} to {string}', async function (key, input) {
  if (key === 'inputName') {
    await this.page.locator('#' + key).selectOption(input);
  } else {
    await this.page.locator('#' + key).fill(input);
  }
});

Then('the following values should be displayed:', async function (dataTable) {
  const rows = dataTable.rows();
  for (const [key, expectedValue] of rows) {
    const actualValue = await this.page.locator('#' + key).inputValue();
    if (actualValue !== expectedValue) {
      throw new Error(
        `Expected value for "${key}" to be "${expectedValue}", but got "${actualValue}"`,
      );
    }
  }
});
