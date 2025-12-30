import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly homePage: Page;
  readonly title: Locator;
  readonly navTabs: Locator;
  readonly startTxt: Locator;
  readonly dashboardBtn: Locator;

  constructor(page: Page) {
    this.homePage = page;

    // selectors
    this.navTabs = this.homePage.locator('#navigation').getByRole('listitem');
    this.title = this.homePage.locator('main[id="main-content"] h1');
    this.startTxt = this.homePage.locator('main[id="main-content"] h2');
    this.dashboardBtn = this.homePage.getByRole('button', { name: 'dashboard' });
  }

  async openHomePage(HOME_PAGE: string): Promise<void> {
    await this.homePage.goto(HOME_PAGE);

    const title = await this.title.innerText();
    expect(title).toEqual('CDP Import Notifications');

    const tabs = await this.navTabs.allInnerTexts();
    expect(tabs).toEqual(['Home', 'About', 'Dashboard']);
    expect(tabs).toHaveLength(3);

    expect(await this.startTxt.innerText()).toEqual('Start');
  }

  async clickDashboardBtn(): Promise<void> {
    await this.dashboardBtn.click();
  }

  async signInPage(): Promise<void> {
    await this.homePage.goto('/');
    await this.dashboardBtn.click();
    await this.homePage.waitForTimeout(300);
  }
}
