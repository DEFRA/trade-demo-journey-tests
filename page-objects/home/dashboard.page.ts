import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly dashboardPage: Page;
  readonly pageTitle: Locator;
  readonly newImportBtn: Locator;

  constructor(page: Page) {
    this.dashboardPage = page;

    this.pageTitle = this.dashboardPage.locator('h1');
    this.newImportBtn = this.dashboardPage.locator('a', { hasText: 'New Import' });
  }

  async startNewImport() {
    await this.newImportBtn.click();
  }
}
