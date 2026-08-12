import { type Locator, type Page } from '@playwright/test';

export class PimPage {
  readonly page: Page;
  readonly pimHeading: Locator;
  readonly addEmployeeButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimHeading = page.getByRole('heading', { name: 'PIM' });
    this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    //getByLabel('Employee Id') would be preferred, but the label is not present in the DOM.
    //getByRole('textbox').nth(4) would be another option, but it is less reliable.
    this.employeeIdInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Employee Id', { exact: true }) })
      .locator('input');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async openAddEmployeeForm(): Promise<void> {
    await this.addEmployeeButton.click();
  }

  async addEmployee(firstName: string, lastName: string, employeeId: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.clear();
    await this.employeeIdInput.fill(employeeId);
    await this.saveButton.click();
  }
}
