import { expect, test as base } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';
import { EmployeeDetailsPage } from '../pages/employee-details.page';
import { LoginPage } from '../pages/login.page';
import { PimPage } from '../pages/pim.page';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PimPage;
  employeeDetailsPage: EmployeeDetailsPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  pimPage: async ({ page }, use) => {
    await use(new PimPage(page));
  },
  employeeDetailsPage: async ({ page }, use) => {
    await use(new EmployeeDetailsPage(page));
  },
});

export { expect };
