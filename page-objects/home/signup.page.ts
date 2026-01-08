import { Page, Locator, expect } from '@playwright/test';

export class SignupPage {
  readonly signUpPage: Page;
  readonly signUpPageTitle: Locator;
  readonly email: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly noOfEnrollments: Locator;
  readonly enrolmentRequestCount: Locator;
  readonly submitBtn: Locator;
  readonly newRegistrationLink: Locator;
  readonly regUserId: Locator;

  constructor(page: Page) {
    this.signUpPage = page;

    this.signUpPageTitle = this.signUpPage.locator('span[data-testid="app-heading-caption"]');
    this.email = this.signUpPage.locator('input[id="email"]');
    this.regUserId = this.signUpPage.locator('input[id="userId"]');
    this.firstName = this.signUpPage.locator('input[id="firstName"]');
    this.lastName = this.signUpPage.locator('input[id="lastName"]');
    this.noOfEnrollments = this.signUpPage.locator('input[id="enrolmentCount"]');
    this.enrolmentRequestCount = this.signUpPage.locator('input[id="enrolmentRequestCount"]');
    this.newRegistrationLink = this.signUpPage.locator('input[id="newRegistrationLink"]');
    this.newRegistrationLink = this.signUpPage.locator('a[href="/cdp-defra-id-stub/register"]');
    this.submitBtn = this.signUpPage.locator('button[type="submit"]');
  }

  async signUpUser(email: string, firstName: string, lastName: string): Promise<void> {
    const pageTitle = await this.signUpPageTitle.innerText();
    expect(pageTitle).toEqual('DEFRA ID Stub User Set Up');

    // fill user details
    await this.email.fill(email);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.noOfEnrollments.fill('1');
    await this.enrolmentRequestCount.fill('1');
    await this.submitBtn.click();
  }

  newRegistration() {
    // return this.signUpPage.locator('a', { hasText: 'New registration' });
    return this.signUpPage.locator('a', { hasText: 'New registration' });
  }
}
