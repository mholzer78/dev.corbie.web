import { Given, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user is using Aspect Ratio Tool', async function () {
  await this.page.goto('http://localhost:4200/aspect-ratio');
  await this.page.waitForLoadState('networkidle');
});

When('aspect-ratio mode is set to {string}', async function (desiredMode) {
  const card = this.page.locator('#mainCard');

  const currentMode = await card.getAttribute('currentMode');
  if (currentMode !== desiredMode) {
    await this.page.locator('app-link-toggle').nth(0).click();

    await expect
      .poll(async () => {
        return await card.getAttribute('currentMode');
      })
      .toBe(desiredMode);
  }
});

When('user clicks the swap button', async function () {
  await this.page.locator('#swapValues').click();

  await expect
    .poll(async () => {
      return await this.page.locator('#inputPresets').evaluate((el) => el.value);
    })
    .toBe('9,16');
});

When('dropdown is set to {string}', async function (newValue) {
  const dropdown = this.page.locator('#inputPresets');
  await dropdown.selectOption(newValue);
});
