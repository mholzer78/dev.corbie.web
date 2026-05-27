import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';

let browser;

BeforeAll(async function () {
  // Launch the Chromium browser.
  // Set headless to true in CI/CD pipelines, or leave false to watch the execution.
  browser = await chromium.launch({
    headless: true,
  });
});

Before(async function () {
  // Create an isolated context with an explicit desktop aspect ratio viewport
  this.context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1, // Ensures 1:1 pixel rendering accuracy
    isMobile: false, // Explicitly tells Playwright this is not a mobile touch device
  });

  this.page = await this.context.newPage();
});

After(async function () {
  // Gracefully close tabs and clear session state after every scenario loop
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  // Terminate the core browser process once the entire test run finishes
  await browser?.close();
});
