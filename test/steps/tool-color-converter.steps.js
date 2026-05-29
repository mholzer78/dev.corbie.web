import { Given } from '@cucumber/cucumber';

Given('the user is using Color Connverter', async function () {
  await this.page.goto('http://localhost:4200/color-converter');
  await this.page.waitForLoadState('networkidle');
});
