import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;
  readonly pimMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
  }

  async navigateToPim(): Promise<void> {
    await this.pimMenu.click();
  }
}
