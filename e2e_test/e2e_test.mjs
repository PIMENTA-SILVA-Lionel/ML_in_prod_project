// e2e_test/e2e_test.mjs
import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';

describe('e2e_test', function () {
  this.timeout(30000); // Timeout global pour les tests
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
    assert.strictEqual(result, 'expected result'); // Remplacez par le résultat attendu
  });
});
