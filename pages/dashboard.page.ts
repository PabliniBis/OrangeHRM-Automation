import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;
  readonly pimMenu: Locator;
  readonly userDropdown: Locator;
  readonly logoutOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutOption = page.getByText('Logout', { exact: true });
  }

  async navigateToPim(): Promise<void> {
    await this.pimMenu.click();
  }

  async logout(): Promise<void> {
    await this.userDropdown.click();
    await this.logoutOption.click();
  }
}
