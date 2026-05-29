import reporter from 'cucumber-html-reporter';
import fs from 'fs';
const currentDate = new Date().toISOString();
const options = {
  brandTitle: 'Feature Test Report',
  theme: 'bootstrap',
  jsonFile: 'test/results/cucumber_report.json',
  output: 'test/reports/cucumber_report_' + currentDate + '.html',
  screenshotsDirectory: './Screenshots/',
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  launchReport: true,
};
// Making the directory if it doesn't exist
if (!fs.existsSync('test/reports')) {
  fs.mkdirSync('test/reports');
}
if (!fs.existsSync('test/screenshots')) {
  fs.mkdirSync('test/screenshots');
}
reporter.generate(options);
