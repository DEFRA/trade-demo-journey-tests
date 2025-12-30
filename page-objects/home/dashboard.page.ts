import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly dashboardPage: Page;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.dashboardPage = page;

    this.pageTitle = this.dashboardPage.locator('h1');
  }
}
