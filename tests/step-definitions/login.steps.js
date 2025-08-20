const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { getDriver } = require('./webdriver.hooks.js');
const LoginPage = require('../pages/LoginPage');

let driver;
exports.driver = driver;
let login;

Before(function () {
  driver = getDriver();
  login = new LoginPage(driver);
});

After(async function () {
  if (driver) {
    try {
      await driver.manage().deleteAllCookies();
      await driver.executeScript('window.localStorage.clear(); window.sessionStorage.clear();');
    } catch (e) {
      console.warn('Gagal clear cache/cookies:', e);
    }
  }
});

Given('user membuka halaman login', async function () {
  await login.open();
});

When('user mengisi nomor whatsapp yang sudah terdaftar', async function () {
  await login.fillNoWaEmail('089654961080');
});

When('user mengisi password yang salah', async function () {
  await login.fillPassword('passwordSalah123');
});

When('user mengisi password yang benar', async function () {
  await login.fillPassword('Az12345678');
});

When('user klik tombol Masuk', async function () {
  await login.clickMasuk();
});

Then('muncul peringatan {string}', async function (expectedError) {
  await login.checkWarningCredential(expectedError);
});

Then('muncul peringatan bahwa {string}', async function (expectedError) {
  await login.checkWarningField(expectedError);
});

Then('user berhasil login dan diarahkan ke halaman utama', {timeout: 20000}, async function () {
  await login.handleBannerAndCheckProfile();
});
