const { BeforeAll, AfterAll, Before, After } = require('@cucumber/cucumber');
// Scenario timing and reporting
const scenarioTimes = [];

Before(function (scenario) {
  this._startTime = Date.now();
  this._scenarioStatus = 'Passed';
});

After(function (scenario) {
  const endTime = Date.now();
  const duration = ((endTime - this._startTime) / 1000).toFixed(2);
  let status = 'Passed';
  if (scenario.result && typeof scenario.result.status === 'string') {
    status = scenario.result.status.toLowerCase() === 'failed' ? 'Failed' : 'Passed';
  }
  console.log('[DEBUG] Scenario:', scenario.pickle.name, '| Cucumber status:', scenario.result.status, '| Report status:', status);
  scenarioTimes.push({
    name: scenario.pickle.name,
    duration: `${duration}s`,
    status
  });
});
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// Path to chromedriver
const chromedriverPath = 'C:/my-document/shidqi/selenium-muat2/chromedriver/win64-138.0.7204.185/chromedriver-win64/chromedriver.exe';
const service = new chrome.ServiceBuilder(chromedriverPath);
const options = new chrome.Options();
const isHeadless = process.env.HEADLESS === 'true';
if (isHeadless) {
  options.addArguments('--headless');
}
options.addArguments('--window-size=1920,1080');

// Shared driver
let driver;

BeforeAll(async function () {
  if (!driver) {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .setChromeService(service)
      .build();
    await driver.manage().window().maximize();
    this.driver = driver;
  }
});

AfterAll({timeout: 20000}, async function () {
  if (driver) {
    try {
      // Clear cache, cookies, and local storage before closing browser
      await driver.manage().deleteAllCookies();
      await driver.executeScript('window.localStorage.clear(); window.sessionStorage.clear();');
    } catch (e) {
      console.warn('Gagal clear cache/cookies:', e);
    }
    await driver.quit();
  }

  // Print scenario report table
  if (scenarioTimes.length > 0) {
    // Calculate max scenario name length
  const maxNameLength = Math.max(...scenarioTimes.map(row => row.name.length), 15);
  const nameCol = maxNameLength;
    const timeCol = 8;
    const statusCol = 8;
    // Center align helper
    const center = (str, len) => {
      if (str.length > len) str = str.slice(0, len - 3) + '...';
      const padLen = len - str.length;
      const left = Math.floor(padLen / 2);
      const right = padLen - left;
      return ' '.repeat(left) + str + ' '.repeat(right);
    };
    // Left align helper
    const leftAlign = (str, len) => {
      if (str.length > len) str = str.slice(0, len - 3) + '...';
      return str.padEnd(len);
    };

    // Table with 3 columns: Scenario Name, Time, Status
    console.log(`\n┌${'─'.repeat(nameCol)}┬${'─'.repeat(timeCol)}┬${'─'.repeat(statusCol)}┐`);
  console.log(`│${center('Scenario Name', nameCol)}│${center('Time', timeCol)}│${center('Status', statusCol)}│`);
    console.log(`├${'─'.repeat(nameCol)}┼${'─'.repeat(timeCol)}┼${'─'.repeat(statusCol)}┤`);
    scenarioTimes.forEach(row => {
      let rawStatus = row.status;
      let centeredStatus = center(rawStatus, statusCol);
      let coloredStatus = centeredStatus.replace(rawStatus, row.status === 'Passed' ? `\x1b[32m${rawStatus}\x1b[0m` : row.status === 'Failed' ? `\x1b[31m${rawStatus}\x1b[0m` : rawStatus);
      console.log(
        `│${leftAlign(row.name, nameCol)}│${center(row.duration, timeCol)}│${coloredStatus}│`
      );
    });
    console.log(`└${'─'.repeat(nameCol)}┴${'─'.repeat(timeCol)}┴${'─'.repeat(statusCol)}┘\n`);
  }
});

module.exports = {
  getDriver: () => driver
};
