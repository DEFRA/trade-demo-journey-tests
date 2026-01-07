import { Page, Locator } from '@playwright/test';

export class ConsignmentOriginPage {
  readonly consignmentOriginPage: Page;
  readonly pageTitle: Locator;
  readonly countrySelector: Locator;
  readonly saveAndContinue: Locator;

  constructor(page: Page) {
    this.consignmentOriginPage = page;

    this.pageTitle = this.consignmentOriginPage.locator('h1');
    this.countrySelector = this.consignmentOriginPage.locator('#origin-country');
    this.saveAndContinue = this.consignmentOriginPage.getByRole('button', { name: 'Save and continue' });
  }

  async selectCountryOfOrigin(country: string) {
    await this.countrySelector.click();
    await this.countrySelector.selectOption({ label: country });
  }

  async submit() {
    await this.saveAndContinue.click();
  }
}
