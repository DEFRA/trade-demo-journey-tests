import { Page, Locator, expect } from '@playwright/test';

export class CommodityPage {
  readonly commodityPage: Page;
  readonly pageTitle: Locator;
  readonly inputCommodityCode: Locator;
  readonly searchBtn: Locator;
  readonly commoditiesTable: Locator;
  readonly speciesCheckBox: Locator;
  readonly saveAndContinue: Locator;
  readonly noOfAnimals: Locator;
  readonly noOfPacks: Locator;

  constructor(page: Page) {
    this.commodityPage = page;

    this.pageTitle = this.commodityPage.locator('h1[class="govuk-heading-xl"]');
    this.inputCommodityCode = this.commodityPage.locator('input[id="commodity-code"]');
    this.searchBtn = this.commodityPage.getByRole('button', { name: 'Search' });
    this.commoditiesTable = this.commodityPage.locator('table', { hasText: 'Commodities' });
    this.speciesCheckBox = this.commodityPage.locator('input[type="checkbox"]');
    this.saveAndContinue = this.commodityPage.getByRole('button', { name: 'Save and continue' });
    this.noOfAnimals = this.commodityPage.locator('input[id*="noOfAnimals"]');
    this.noOfPacks = this.commodityPage.locator('input[id*="noOfPacks"]');
  }

  async searchCommodity(commodityCode: string) {
    await this.inputCommodityCode.fill(commodityCode);
    await this.searchBtn.click();
  }

  async verifyCommodity(commodityCode: string, description: string) {
    const commodityTable = await this.commoditiesTable.locator('th').allInnerTexts();
    const commodityDetails = await this.commodityPage.locator('td').allInnerTexts();
    expect(commodityTable).not.toBeNull();
    expect(commodityTable).toEqual(['Commodity code', 'Description']);
    expect(commodityDetails).not.toBeNull();
    expect(commodityDetails).toEqual([commodityCode, description]);
  }

  async selectSpecies() {
    await this.speciesCheckBox.first().check();
    await this.saveAndContinue.click();
  }

  async enterQuantities() {
    await this.noOfAnimals.fill('100');
    await this.noOfAnimals.fill('10');
    await this.saveAndContinue.click();
  }
}
