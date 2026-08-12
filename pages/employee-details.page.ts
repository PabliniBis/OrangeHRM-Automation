import { type Locator, type Page } from '@playwright/test';

export class EmployeeDetailsPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly personalDetailsHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    //this.firstNameInput = page.locator('.oxd-input-group').filter({ has: page.getByText('First Name', { exact: true }) }).locator('input');
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    //this.lastNameInput = page.locator('.oxd-input-group').filter({ has: page.getByText('Last Name', { exact: true }) }).locator('input');
    this.employeeIdInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Employee Id', { exact: true }) })
      .locator('input');
    this.personalDetailsHeading = page.getByRole('heading', { name: 'Personal Details' });
  }
}
