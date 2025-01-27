// Import des modules nécessaires
const chrome = require('selenium-webdriver/chrome');

driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(
    new chrome.Options().setBinary('/usr/bin/google-chrome') 
  )
  .build();

const assert = require('assert');

// Définition du test
describe('e2e_test', function () {
  this.timeout(30000);
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('Remplir le formulaire et envoyer', async function () {
    console.log('Ouverture du site web...');
    await driver.get('http://localhost:3000/');
    console.log('Site web chargé.');
    
    console.log('Réglage de la taille de la fenêtre...');
    await driver.manage().window().setRect({ width: 810, height: 816 });
  
    console.log('Remplissage des champs...');
    await driver.findElement(By.name('sepalLength')).sendKeys('1');
    await driver.findElement(By.name('sepalWidth')).sendKeys('1');
    await driver.findElement(By.name('petalLength')).sendKeys('1');
    await driver.findElement(By.name('petalWidth')).sendKeys('1');
  
    console.log('Soumission du formulaire...');
    await driver.findElement(By.css('button')).click();
  
    console.log('Test terminé.');
  });
});
