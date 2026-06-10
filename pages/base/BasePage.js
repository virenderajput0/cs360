const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  /* -------------------------------------------------------------------------- */
  /* Navigation */
  /* -------------------------------------------------------------------------- */

  async navigate(url) {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
    });
  }

  /* -------------------------------------------------------------------------- */
  /* Click */
  /* -------------------------------------------------------------------------- */

  async click(locator) {
    await locator.waitFor({
      state: 'visible',
    });

    await locator.click();
  }

  /* -------------------------------------------------------------------------- */
  /* Wait And Click */
  /* -------------------------------------------------------------------------- */

  async waitAndClick(locator) {
    await expect(locator).toBeVisible();

    await expect(locator).toBeEnabled();

    await locator.click();
  }

  /* -------------------------------------------------------------------------- */
  /* Fill */
  /* -------------------------------------------------------------------------- */

  async fill(locator, value) {
    await locator.waitFor({
      state: 'visible',
    });

    await locator.fill(value);
  }

  /* -------------------------------------------------------------------------- */
  /* Wait And Fill */
  /* -------------------------------------------------------------------------- */

  async waitAndFill(locator, value) {
    await expect(locator).toBeVisible();

    await locator.clear();

    await locator.fill(value);
  }

  /* -------------------------------------------------------------------------- */
  /* Get Text */
  /* -------------------------------------------------------------------------- */

  async getText(locator) {
    return (await locator.textContent())?.trim();
  }

  /* -------------------------------------------------------------------------- */
  /* Verify Text */
  /* -------------------------------------------------------------------------- */

  async verifyText(locator, expectedText) {
    await expect(locator).toContainText(
      expectedText
    );
  }

  /* -------------------------------------------------------------------------- */
  /* Is Visible */
  /* -------------------------------------------------------------------------- */

  async isVisible(locator) {
    return await locator.isVisible();
  }

  /* -------------------------------------------------------------------------- */
  /* Wait For Element */
  /* -------------------------------------------------------------------------- */

  async waitForElement(locator) {
    await locator.waitFor({
      state: 'visible',
    });
  }

  /* -------------------------------------------------------------------------- */
  /* Wait For Loader */
  /* -------------------------------------------------------------------------- */

  async waitForLoaderToDisappear() {
    const loader = this.page
      .locator(
        "//*[name()='circle' and contains(@class,'ng-star-in')]"
      )
      .first();

    try {
      await loader.waitFor({
        state: 'hidden',
        timeout: 160000,
      });
    } catch {
      console.log(
        'Loader not found or already hidden'
      );
    }
  }

  /* -------------------------------------------------------------------------- */
  /* Wait For Network */
  /* -------------------------------------------------------------------------- */

  async waitForNetworkIdle() {
    await this.page.waitForLoadState(
      'networkidle'
    );
  }

  /* -------------------------------------------------------------------------- */
  /* Scroll To Element */
  /* -------------------------------------------------------------------------- */

  async scrollToElement(locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  /* -------------------------------------------------------------------------- */
  /* Hover */
  /* -------------------------------------------------------------------------- */

  async hover(locator) {
    await locator.hover();
  }

  /* -------------------------------------------------------------------------- */
  /* Select Dropdown */
  /* -------------------------------------------------------------------------- */

  async selectDropdown(locator, value) {
    await locator.selectOption(value);
  }

  /* -------------------------------------------------------------------------- */
  /* Upload File */
  /* -------------------------------------------------------------------------- */

  async uploadFile(locator, filePath) {
    await locator.setInputFiles(filePath);
  }

  /* -------------------------------------------------------------------------- */
  /* Handle Alert */
  /* -------------------------------------------------------------------------- */

  async handleDialog(action = 'accept') {
    this.page.once(
      'dialog',
      async (dialog) => {
        console.log(
          `Dialog Message : ${dialog.message()}`
        );

        if (action === 'dismiss') {
          await dialog.dismiss();
        } else {
          await dialog.accept();
        }
      }
    );
  }

  /* -------------------------------------------------------------------------- */
  /* Alert Message Validation */
  /* -------------------------------------------------------------------------- */

  async validateAlertMessage(
    expectedText
  ) {
    const alertMessage =
      this.page.locator(
        'div.message, .message, .toast-message'
      );

    await expect(alertMessage).toContainText(
      expectedText,
      {
        timeout: 10000,
      }
    );
  }

  /* -------------------------------------------------------------------------- */
  /* Screenshot */
  /* -------------------------------------------------------------------------- */

  async takeScreenshot(
    fileName = 'screenshot'
  ) {
    await this.page.screenshot({
      path: `reports/screenshots/${fileName}.png`,
      fullPage: true,
    });
  }

  /* -------------------------------------------------------------------------- */
  /* Current URL */
  /* -------------------------------------------------------------------------- */

  getCurrentUrl() {
    return this.page.url();
  }

  /* -------------------------------------------------------------------------- */
  /* Refresh Page */
  /* -------------------------------------------------------------------------- */

  async refreshPage() {
    await this.page.reload();
  }
}

module.exports = BasePage;