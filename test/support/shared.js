import { Given, When, Then } from '@cucumber/cucumber';

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
    const el = await this.page.locator('#' + key);

    const actualValue =
      (await el.count()) > 0
        ? await el.evaluate((el) => el.value ?? el.textContent?.trim() ?? '')
        : '';

    if (actualValue !== expectedValue) {
      throw new Error(
        `Expected value for "${key}" to be "${expectedValue}", but got "${actualValue}"`,
      );
    }
  }
});
