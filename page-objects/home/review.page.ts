import { Page, Locator } from '@playwright/test';

export class ReviewPage {
  readonly reviewPage: Page;
  readonly pageTitle: Locator;
  readonly confirmCheckBox: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.reviewPage = page;

    this.pageTitle = this.reviewPage.locator('h1[class="govuk-heading-l"]');
    this.confirmCheckBox = this.reviewPage.locator('input[id="confirmAccurate"]');
    this.submitBtn = this.reviewPage.locator('button[type="submit"]');
  }

  async reviewAndSubmit() {
    await this.confirmCheckBox.check();
    await this.submitBtn.click();
  }
}
