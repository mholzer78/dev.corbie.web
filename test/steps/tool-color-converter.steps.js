import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the user is using Color Connverter', async function () {
  await this.page.goto('http://localhost:4200/color-converter');
  await this.page.waitForLoadState('networkidle');
});
