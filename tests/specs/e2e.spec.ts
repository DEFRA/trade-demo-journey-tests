import { test, expect } from '../fixtures';

test.describe('TradeDemoFrontend Journey Test Suite', () => {
  test('Start Journey Test execution', async ({ pages }, testInfo) => {
    console.log(`Running test: ${testInfo.titlePath.join(' > ')}`);

    await test.step('Open the CDP Trade Demo Frontend Dashboard Page', async (testInfo) => {
      console.log(`Running step: ${testInfo.titlePath.join(' > ')}`);
      await pages.homePage.openHomePage('/');
      await pages.homePage.clickDashboardBtn();
    });

    // signup
    let tmpRegUserId: string;
    const tmpNewUser = getEmail();
    await test.step('Signup test user for Journey test execution', async (testInfo) => {
      console.log(`Running step: ${testInfo.titlePath.join(' > ')}`);
      const newRegistrationLink = pages.signUpPage.newRegistration();
      if (newRegistrationLink != null) {
        await newRegistrationLink.click();
      }

      tmpRegUserId = await pages.signUpPage.regUserId.inputValue();
      await pages.signUpPage.signUpUser(tmpNewUser, 'testFN', 'testLN');
    });

    // signin
    await test.step('Sign as test user and execute Journey test', async (testInfo) => {
      console.log(`Running step: ${testInfo.titlePath.join(' > ')}`);
      //const newTestUser = getEmail();
      await pages.homePage.signInPage();
      await pages.signinPage.signIn(tmpNewUser);
    });

    // dashboard
    await test.step('Create new CDP Imports notification', async (testInfo) => {
      console.log(`Running step: ${testInfo.titlePath.join(' > ')}`);
      const dashboardPageTitle = await pages.dashboardPage.pageTitle.innerText();
      expect(dashboardPageTitle).toEqual('Trade Imports Dashboard');

      await pages.dashboardPage.startNewImport();
    });

    // select consignment origin
    await test.step('Select the consignment origin from', async (testInfo) => {
      console.log(`Running step: ${testInfo.titlePath.join(' > ')}`);
      const consignmentPageTitle = await pages.consignmentOriginPage.pageTitle.innerText();
      expect(consignmentPageTitle).toContain('Select the country where the animal originates from');
      await pages.consignmentOriginPage.selectCountryOfOrigin('Austria');
      await pages.consignmentOriginPage.submit();
    });

    // search and enter commodity
    await test.step('Select the commodity details', async (testInfo) => {
      console.log(`Running step: ${testInfo.titlePath.join(' > ')}`);
      const commodityPageTitle = await pages.commodityPage.pageTitle.innerText();
      expect(commodityPageTitle).toEqual('Commodity');
      await pages.commodityPage.searchCommodity('0101');
      await pages.commodityPage.verifyCommodity('0101', 'Live horses, asses, mules and hinnies');
      await pages.commodityPage.selectSpecies();
      await pages.commodityPage.enterQuantities();
    });

    // select consignment purpose
    await test.step('Select the consignment import purpose', async (testInfo) => {
      console.log(`Running step: ${testInfo.titlePath.join(' > ')}`);
      const consignmentPurposeTitle = await pages.consignmentPurposePage.pageTitle.innerText();
      expect(consignmentPurposeTitle).toEqual('What is the main reason for importing the animals?');
      await pages.consignmentPurposePage.selectReasonOfImport('Commercial Sale');
    });

    // Transport details
    await test.step('Select the consignment transport details', async (testInfo) => {
      console.log(`Running step: ${testInfo.titlePath.join(' > ')}`);
      const transportDetailsPage = await pages.transportDetailsPage.pageTitle.innerText();
      expect(transportDetailsPage).toEqual('Transport to the BCP or Port of Entry');
      await pages.transportDetailsPage.enterTransportDetails();
    });

    // Review and Submit
    await test.step('Review and Submit the CDP Imports Notification', async (testInfo) => {
      console.log(`Running step: ${testInfo.titlePath.join(' > ')}`);
      const reviewPageTitle = await pages.reviewPage.pageTitle.innerText();
      expect(reviewPageTitle).toEqual('Check your answers before submitting');
      // await pages.reviewPage.reviewAndSubmit(); // Imports-proxy dependency
    });

    await test.step('Sign out and tear down the test user', async (testInfo) => {
      console.log(`Running step: ${testInfo.titlePath.join(' > ')}`);
      // signOut the user
      await pages.signinPage.signOut();

      // Expire created user
      await pages.homePage.homePage.goto('/');
      await pages.homePage.clickDashboardBtn();
      await pages.signinPage.expireUser(tmpNewUser, tmpRegUserId);
    });
  });
});

function getEmail() {
  return `user_${Math.random().toString(36).substring(2, 10)}@example.com`;
}
