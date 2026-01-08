import { Page, Locator } from '@playwright/test';

export class TransportDetailsPage {
  readonly transportDetailsPage: Page;
  readonly pageTitle: Locator;
  readonly portOfEntry: Locator;
  readonly meanOfTransport: Locator;
  readonly vehicleIdentifier: Locator;
  readonly saveAndContinue: Locator;

  constructor(page: Page) {
    this.transportDetailsPage = page;

    this.pageTitle = this.transportDetailsPage.locator('h1[class="govuk-heading-xl"]');
    this.portOfEntry = this.transportDetailsPage.locator('input[id="bcp"]');
    this.meanOfTransport = this.transportDetailsPage.locator('#transport-means-before');
    this.vehicleIdentifier = this.transportDetailsPage.locator('input[id="vehicle-identifier"]');
    this.saveAndContinue = this.transportDetailsPage.locator('button[type="submit"]');
  }

  async enterTransportDetails() {
    await this.portOfEntry.fill('sevington');
    await this.transportDetailsPage.waitForTimeout(3000);
    this.transportDetailsPage.locator('div[class="bcp-name"]').first();

    await this.meanOfTransport.selectOption({ label: 'Vessel' });
    await this.vehicleIdentifier.fill('ID12345');
    await this.saveAndContinue.click();
  }
}
