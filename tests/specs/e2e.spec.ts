import { test, expect } from '../fixtures';

test.describe('TradeDemoFrontend Journey Test', () => {
  test('Should run the "e2e" test', async ({ pages }, testInfo) => {
    console.log(`Running test: ${testInfo.titlePath.join(' > ')}`);
    await pages.homePage.openHomePage('/');
    await pages.homePage.clickDashboardBtn();

    // signup
    const newRegistrationLink = pages.signUpPage.newRegistration();
    if (newRegistrationLink != null) {
      await newRegistrationLink.click();
    }

    const email = getEmail();
    await pages.signUpPage.signUpUser(email, 'testFN', 'testLN');

    // signin
    await pages.homePage.signInPage();
    await pages.signinPage.signIn(email);

    // dashboard
    const dashboardPageTitle = await pages.dashboardPage.pageTitle.innerText();
    expect(dashboardPageTitle).toEqual('Trade Imports Dashboard');
  });
});

function getEmail() {
  return `user_${Math.random().toString(36).substring(2, 10)}@example.com`;
}
