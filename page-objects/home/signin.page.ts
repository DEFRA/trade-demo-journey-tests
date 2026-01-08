/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Page, Locator, expect } from '@playwright/test';

export class SigninPage {
  readonly signPage: Page;
  readonly pageTitle: Locator;
  readonly table: Locator;
  readonly signInLink: Locator;
  readonly expireLink: Locator;

  constructor(page: Page) {
    this.signPage = page;

    this.pageTitle = this.signPage.locator('table', { hasText: 'Registered Users' });
    this.table = this.signPage.locator('table');
    this.signInLink = this.signPage.locator('a', { hasText: 'Log in' });
    this.expireLink = this.signPage.locator('a', { hasText: 'Expire' });
  }

  async signIn(email: string) {
    const titleTxt = await this.table.locator('caption').allInnerTexts();
    expect(titleTxt).not.toBeNull();
    expect(titleTxt).toEqual(['Registered users']);

    const cells = await this.table.locator('th').allInnerTexts();
    const matchedUser = cells.filter((item) => item.includes(email));

    expect(matchedUser.length).toBeGreaterThan(0);
    expect(matchedUser).toEqual([email]);

    if (matchedUser) {
      const hrefs = await this.signPage.locator('table a[href]').evaluateAll((links) => links.map((a) => a.getAttribute('href')));
      const loginLink = hrefs.filter((link) => link?.match(email));

      await this.signPage.locator(`a[href="${loginLink}"]`).click();
    }
  }

  async signOut() {
    await this.signPage.locator('a', { hasText: 'Sign out' }).click();
  }

  async expireUser(email: string, regUserId: string) {
    const titleTxt = await this.table.locator('caption').allInnerTexts();
    expect(titleTxt).not.toBeNull();
    expect(titleTxt).toEqual(['Registered users']);

    const cells = await this.table.locator('th').allInnerTexts();
    const matchedUser = cells.filter((item) => item.includes(email));

    expect(matchedUser.length).toBeGreaterThan(0);
    expect(matchedUser).toEqual([email]);

    if (matchedUser) {
      const hrefs = await this.signPage.locator('table a[href]').evaluateAll((links) => links.map((a) => a.getAttribute('href')));

      const expireLink = hrefs.filter((link) => link?.match(regUserId));
      await this.signPage.locator(`a[href="${expireLink}"]`).click();
    }
  }
}
