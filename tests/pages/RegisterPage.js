const { By, until } = require('selenium-webdriver');
const urls = require('./urls.json');

class RegisterPage {
  constructor(driver) {
    this.driver = driver;
    this.url = urls.register;
    this.TnCTitle = By.id('lblSyaratKetentuan');
  }

  async open() {
    await this.driver.get(this.url);
  }

  async fillNamaLengkap(nama) {
    await this.driver.wait(until.elementLocated(By.css('input[placeholder="Nama Lengkap"]')), 15000);
    await this.driver.findElement(By.css('input[placeholder="Nama Lengkap"]')).sendKeys(nama);
  }

  async fillNomorTelepon(no) {
    await this.driver.wait(until.elementLocated(By.id('inpNomorTelepon')), 15000);
    const input = await this.driver.findElement(By.id('inpNomorTelepon'));
    await input.clear();
    await input.sendKeys(no);
  }

  async fillPassword(password) {
    await this.driver.wait(until.elementLocated(By.css('input[placeholder="Password"]')), 15000);
    await this.driver.findElement(By.css('input[placeholder="Password"]')).sendKeys(password);
  }

  async fillKonfirmasiPassword(password) {
    await this.driver.wait(until.elementLocated(By.css('input[placeholder="Konfirmasi Password"]')), 15000);
    await this.driver.findElement(By.css('input[placeholder="Konfirmasi Password"]')).sendKeys(password);
  }

  async clickDaftar() {
    await this.driver.wait(until.elementLocated(By.id('btnDaftar')), 15000);
    await this.driver.findElement(By.id('btnDaftar')).click();
  }
  async getTitleTnCText() {
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 detik
    await this.driver.wait(until.elementLocated(this.TnCTitle), 15000);
    return await this.driver.findElement(this.TnCTitle).getText();
  }

  async getPasswordNotIdenticalText() {
    await this.driver.wait(until.elementLocated(By.id('passwordNotIdentical')), 15000);
    return await this.driver.findElement(By.id('passwordNotIdentical')).getText();
  }

  async getWarningErrorText() {
    await this.driver.wait(until.elementLocated(By.id('warningErrorText')), 15000);
    const el = await this.driver.findElement(By.id('warningErrorText'));
    const text = await el.getText();
    if (!text) {
      // Jika text kosong, log isi HTML-nya
      const html = await el.getAttribute('innerHTML');
      console.log('Isi HTML warningErrorText:', html);
    }
    return text;
  }

  async getWarningErrorHTML() {
    await this.driver.wait(until.elementLocated(By.id('warningErrorText')), 15000);
    const el = await this.driver.findElement(By.id('warningErrorText'));
    return await el.getAttribute('innerHTML');
  }
}

module.exports = RegisterPage;
