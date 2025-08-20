const { By, until } = require('selenium-webdriver');

class ResetPasswordPage {
  async checkWarningResetPassword(expectedError) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const text = await this.getWarningEmailText();
    if (!text.includes(expectedError)) {
      throw new Error(`Expected reset error not found. Got: ${text}`);
    }
  }
  constructor(driver) {
    this.driver = driver;
    this.url = require('./urls.json').forgot_password;
  }

  async open() {
    await this.driver.get(this.url);
  }

  async fillNoWhatsapp(no) {
    await this.driver.wait(until.elementLocated(By.css('input[placeholder="No. Whatsapp"]')), 15000);
    await this.driver.findElement(By.css('input[placeholder="No. Whatsapp"]')).sendKeys(no);
  }

  async clickCariAkun() {
    await this.driver.wait(until.elementLocated(By.id('btnMasuk')), 15000);
    await this.driver.findElement(By.id('btnMasuk')).click();
  }

  async getWarningEmailText() {
    const xpath = '/html/body/div[4]/div/div[2]/div[3]/div[3]/div/span';
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000);
    return await this.driver.findElement(By.xpath(xpath)).getText();
  }

  async getOtpPageText(xpath) {
    await this.driver.wait(until.elementLocated(By.xpath(xpath)), 15000);
    return await this.driver.findElement(By.xpath(xpath)).getText();
  }

  async waitForOtpImages() {
    await this.driver.wait(until.elementLocated(By.xpath('/html/body/div[4]/div[3]/img')), 15000);
    await this.driver.wait(until.elementLocated(By.xpath('/html/body/div[4]/div[4]/img')), 15000);
  }
}

module.exports = ResetPasswordPage;
