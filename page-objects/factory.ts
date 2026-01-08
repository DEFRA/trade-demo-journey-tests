import { Page } from '@playwright/test';
import { HomePage } from './home/home.page';
import { SignupPage } from './home/signup.page';
import { SigninPage } from './home/signin.page';
import { DashboardPage } from './home/dashboard.page';
import { ConsignmentOriginPage } from './home/consignmentOrigin.page';
import { CommodityPage } from './home/commodity.page';
import { ConsignmentPurposePage } from './home/consignmentPurpose.page';
import { TransportDetailsPage } from './home/transportDetails.page';
import { ReviewPage } from './home/review.page';

export function createPageObjects(page: Page) {
  return {
    page,
    homePage: new HomePage(page),
    signUpPage: new SignupPage(page),
    signinPage: new SigninPage(page),
    dashboardPage: new DashboardPage(page),
    consignmentOriginPage: new ConsignmentOriginPage(page),
    commodityPage: new CommodityPage(page),
    consignmentPurposePage: new ConsignmentPurposePage(page),
    transportDetailsPage: new TransportDetailsPage(page),
    reviewPage: new ReviewPage(page),
  };
}

export type PageObjects = ReturnType<typeof createPageObjects>;
