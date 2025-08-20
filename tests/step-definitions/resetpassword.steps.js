

const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { getDriver } = require('./webdriver.hooks.js');
const ResetPasswordPage = require('../pages/ResetPasswordPage.js');

let driver;
let resetPage;
let lastResetErrorText;

Before(function () {
  driver = getDriver();
  resetPage = new ResetPasswordPage(driver);
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

Given('user membuka halaman reset password', {timeout: 20000}, async function () {
  await resetPage.open();
});

When('user klik tombol Cari Akun', async function () {
  await resetPage.clickCariAkun();
});

When('user mengisi nomor telepon untuk reset password yaitu {string}', async function (no) {
  await resetPage.fillNoWhatsapp(no);
});

When('user mengisi nomor telepon yang sudah terdaftar', async function () {
  await resetPage.fillNoWhatsapp('089654961080');
});

Then('muncul peringatan reset password {string}', async function (expectedError) {
  await resetPage.checkWarningResetPassword(expectedError);
});

Then('user berhasil diarahkan ke halaman OTP', async function () {
  await resetPage.waitForOtpImages();
});
