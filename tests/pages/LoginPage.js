const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.url = require('./urls.json').login;
  }

  async open() {
    await this.driver.get(this.url);
  }

  async waitForProfileText() {
    await this.driver.wait(until.elementLocated(By.xpath('/html/body/header[1]/div[2]/div/div[2]/button/span')), 15000);
  }

  async getProfileText() {
    const xpath = '/html/body/header[1]/div[2]/div/div[2]/button/span';
    await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000);
    const text = await this.driver.findElement(By.xpath(xpath)).getText();
    if (text !== 'We CS QCF Sepuluh') {
      throw new Error(`Expected profile text 'We CS QCF Sepuluh' not found. Got: ${text}`);
    }
    return text;
  }

  async checkWarningCredential(expectedError) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const text = await this.getWarningWhatsappText1();
    if (!text.includes(expectedError)) {
      throw new Error(`Expected login error not found. Got: ${text}`);
    }
  }

  async checkWarningField(expectedError) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const text = await this.getWarningWhatsappText2();
    if (!text.includes(expectedError)) {
      throw new Error(`Expected login error not found. Got: ${text}`);
    }
  }

  async handleBannerAndCheckProfile() {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await this.closeBannerPromo();
    } catch (e) {
      console.warn('Banner promo tidak muncul atau gagal diklik:', e.message);
    }
    await this.getProfileText();
  }

  async fillNoWaEmail(value) {
    await this.driver.wait(until.elementLocated(By.css('input[placeholder="No. Whatsapp/Email"]')), 15000);
    await this.driver.findElement(By.css('input[placeholder="No. Whatsapp/Email"]')).sendKeys(value);
  }

  async fillPassword(password) {
    await this.driver.wait(until.elementLocated(By.css('input[placeholder="Password"]')), 15000);
    await this.driver.findElement(By.css('input[placeholder="Password"]')).sendKeys(password);
  }

  async clickMasuk() {
    await this.driver.wait(until.elementLocated(By.id('btnMasuk')), 15000);
    await this.driver.findElement(By.id('btnMasuk')).click();
  }

  async getWarningWhatsappText1() {
    await new Promise(resolve => setTimeout(resolve, 500));
    const xpath = '/html/body/div[4]/div[2]/div[2]/div[4]/div/span';
    await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000);
    return await this.driver.findElement(By.xpath(xpath)).getText();
  }

  async getWarningWhatsappText2() {
    await new Promise(resolve => setTimeout(resolve, 500));
    const xpath = '/html/body/div[4]/div[2]/div[2]/div[5]/div/span';
    await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000);
    return await this.driver.findElement(By.xpath(xpath)).getText();
  }

  async closeBannerPromo() {
    const xpath = '/html/body/div[10]/div/div/button';
    const el = await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000);
    await this.driver.wait(until.elementIsVisible(el), 5000);
    await this.driver.wait(until.elementIsEnabled(el), 5000);
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', el);
    await el.click();
  }

  async getBannerText(xpath) {
    await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000);
    return await this.driver.findElement(By.xpath(xpath)).getText();
  }
}

module.exports = LoginPage;
