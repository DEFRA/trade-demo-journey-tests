import { Page, Locator } from '@playwright/test';

export class ConsignmentPurposePage {
  readonly consignmentPage: Page;
  readonly pageTitle: Locator;
  readonly reasonOfImport: Locator;
  readonly purpose: Locator;
  readonly saveAndContinue: Locator;

  constructor(page: Page) {
    this.consignmentPage = page;

    this.pageTitle = this.consignmentPage.locator('h1');
    this.reasonOfImport = this.consignmentPage.locator('input[id="purpose"]');
    this.purpose = this.consignmentPage.locator('#internal-market-purpose');
    this.saveAndContinue = this.consignmentPage.getByRole('button', { name: 'Save and continue' });
  }

  async selectReasonOfImport(purpose: string) {
    await this.reasonOfImport.click();
    await this.purpose.click();
    await this.purpose.selectOption({ label: purpose });

    await this.saveAndContinue.click();
  }
}
