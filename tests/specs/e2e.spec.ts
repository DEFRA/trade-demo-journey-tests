import { test, expect } from '../fixtures';

test.describe('TradeDemoFrontend Journey Test Suite', () => {
  test('Should run the "e2e" test', async ({ pages }, testInfo) => {
    console.log(`Running test: ${testInfo.titlePath.join(' > ')}`);
    await pages.homePage.openHomePage('/');
    await pages.homePage.clickDashboardBtn();

    // signup
    const newRegistrationLink = pages.signUpPage.newRegistration();
    if (newRegistrationLink != null) {
      await newRegistrationLink.click();
    }
    const regUserId = await pages.signUpPage.regUserId.inputValue();

    const email = getEmail();
    await pages.signUpPage.signUpUser(email, 'testFN', 'testLN');

    // signin
    await pages.homePage.signInPage();
    await pages.signinPage.signIn(email);

    // dashboard
    const dashboardPageTitle = await pages.dashboardPage.pageTitle.innerText();
    expect(dashboardPageTitle).toEqual('Trade Imports Dashboard');

    await pages.dashboardPage.startNewImport();

    // select consignment origin
    const consignmentPageTitle = await pages.consignmentOriginPage.pageTitle.innerText();
    expect(consignmentPageTitle).toContain('Select the country where the animal originates from');
    await pages.consignmentOriginPage.selectCountryOfOrigin('Austria');
    await pages.consignmentOriginPage.submit();

    // search and enter commodity
    const commodityPageTitle = await pages.commodityPage.pageTitle.innerText();
    expect(commodityPageTitle).toEqual('Commodity');
    await pages.commodityPage.searchCommodity('0101');
    await pages.commodityPage.verifyCommodity('0101', 'Live horses, asses, mules and hinnies');
    await pages.commodityPage.selectSpecies();
    await pages.commodityPage.enterQuantities();

    // select consignment purpose
    const consignmentPurposeTitle = await pages.consignmentPurposePage.pageTitle.innerText();
    expect(consignmentPurposeTitle).toEqual('What is the main reason for importing the animals?');
    await pages.consignmentPurposePage.selectReasonOfImport('Commercial');

    // Transport details
    const transportDetailsPage = await pages.transportDetailsPage.pageTitle.innerText();
    expect(transportDetailsPage).toEqual('Transport to the BCP or Port of Entry');
    await pages.transportDetailsPage.enterTransportDetails();

    // Review and Submit
    const reviewPageTitle = await pages.reviewPage.pageTitle.innerText();
    expect(reviewPageTitle).toEqual('Check your answers before submitting');
    // await pages.reviewPage.reviewAndSubmit(); // Imports-proxy dependency

    // signOut the user
    await pages.signinPage.signOut();

    // Expire created user
    await pages.homePage.homePage.goto('/');
    await pages.homePage.clickDashboardBtn();
    await pages.signinPage.expireUser(email, regUserId);
  });
});

function getEmail() {
  return `user_${Math.random().toString(36).substring(2, 10)}@example.com`;
}
