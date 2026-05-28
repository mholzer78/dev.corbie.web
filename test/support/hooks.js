import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';

let browser;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: true,
  });
});

Before(async function () {
  this.context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    isMobile: false,
  });

  this.page = await this.context.newPage();
});

After(async function (scenario) {
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser?.close();
});
