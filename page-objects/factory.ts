import { Page } from '@playwright/test';
import { HomePage } from './home/home.page';
import { SignupPage } from './home/signup.page';
import { SigninPage } from './home/signin.page';
import { DashboardPage } from './home/dashboard.page';

export function createPageObjects(page: Page) {
  return {
    page,
    homePage: new HomePage(page),
    signUpPage: new SignupPage(page),
    signinPage: new SigninPage(page),
    dashboardPage: new DashboardPage(page),
  };
}

export type PageObjects = ReturnType<typeof createPageObjects>;
