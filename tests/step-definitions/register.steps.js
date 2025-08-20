const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { until } = require('selenium-webdriver');
const { getDriver } = require('./webdriver.hooks.js');
const RegisterPage = require('../pages/RegisterPage');

let driver;
let register;
let lastErrorText;

Before(function () {
  driver = getDriver();
  register = new RegisterPage(driver);
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

Given('user membuka halaman register', {timeout: 20000}, async function () {
  await register.open();
});

When('user mengisi nama lengkap {string}', async function (nama) {
  await register.fillNamaLengkap(nama);
});

When('user mengisi nomor whatsapp untuk register yang belum terdaftar', async function () {
  // Nomor dummy yang belum terdaftar
  await register.fillNomorTelepon('081234567890');
});

When('user mengisi nomor whatsapp untuk register yang sudah terdaftar', async function () {
  // Nomor dummy yang sudah terdaftar
  await register.fillNomorTelepon('089876543210');
});

When('user mengisi password {string}', async function (password) {
  await register.fillPassword(password);
});

When('user mengisi konfirmasi password {string}', async function (password) {
  await register.fillKonfirmasiPassword(password);
});

When('user mengisi password {string} dan konfirmasi password {string}', async function (password, konfirmasi) {
  await register.fillPassword(password);
  await register.fillKonfirmasiPassword(konfirmasi);
});

When('user hanya mengisi password {string} dan konfirmasi password {string}', async function (password, konfirmasi) {
  await register.fillPassword(password);
  await register.fillKonfirmasiPassword(konfirmasi);
});

When('user klik tombol Daftar', async function () {
  await register.clickDaftar();
});

When('user klik tombol Daftarr', async function () {
  await register.clickDaftar();
  await register.clickDaftar();
});
Then('muncul peringatan yaitu {string}', async function (expectedError) {
  const text = await register.getPasswordNotIdenticalText();
  if (!text.includes(expectedError)) {
    throw new Error(`Expected error message not found. Got: ${text}`);
  }
});

Then('muncul peringatan registrasi {string}', async function (expectedError) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  await driver.wait(until.elementLocated({id: 'warningErrorText'}), 15000);
  lastErrorText = await register.getWarningErrorText();
  if (!lastErrorText) {
    const el = await driver.findElement({id: 'warningErrorText'});
    const html = await el.getAttribute('innerHTML');
    console.log('Isi HTML warningErrorText:', html);
  }
  if (!lastErrorText.includes(expectedError)) {
    throw new Error(`Expected error message not found. Got: ${lastErrorText}`);
  }
});
