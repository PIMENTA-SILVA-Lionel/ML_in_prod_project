const { Builder, By, Key, until, Browser } = require('selenium-webdriver')
const assert = require('assert')
// const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

describe('e2e_test', function () {
  this.timeout(30000);
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('Remplir le formulaire et envoyer', async function () {
    await driver.get('http://localhost:3000/');
    await driver.findElement(By.name('sepalLength')).sendKeys('1');
    await driver.findElement(By.name('sepalWidth')).sendKeys('1');
    await driver.findElement(By.name('petalLength')).sendKeys('1');
    await driver.findElement(By.name('petalWidth')).sendKeys('1');
    await driver.findElement(By.css('button')).click();

    const result = await driver.findElement(By.id('result')).getText();
    assert.strictEqual(result, 'Setosa');
  });
});
