const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function runTest() {
  let driver;

  try {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(
        new chrome.Options().setBinary('/usr/bin/google-chrome') // Chemin explicite pour Chrome
      )
      .build();

    await driver.get("http://localhost:3000/");
    await driver.findElement(By.name("sepalLength")).sendKeys("1");
    await driver.findElement(By.name("sepalWidth")).sendKeys("1");
    await driver.findElement(By.name("petalLength")).sendKeys("1");
    await driver.findElement(By.name("petalWidth")).sendKeys("1");
    await driver.findElement(By.css("button")).click();
  } catch (error) {
    console.error(error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
