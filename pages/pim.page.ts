import { type Locator, type Page } from '@playwright/test';

export class PimPage {
  readonly page: Page;
  readonly pimHeading: Locator;
  readonly addEmployeeButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;
  readonly employeeIdSearchInput: Locator;
  readonly searchButton: Locator;
  readonly employeeResultsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimHeading = page.getByRole('heading', { name: 'PIM' });
    this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    // getByLabel('Employee Id') would be preferred, but the label is not present in the DOM.
    // getByRole('textbox').nth(4) would be another option, but it is less reliable.
    this.employeeIdInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Employee Id', { exact: true }) })
      .locator('input');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    // getByRole('textbox').nth(2) would be another option, but it is less reliable.
    this.employeeIdSearchInput = page
      .locator('.oxd-input-group')
      .filter({ has: page.getByText('Employee Id', { exact: true }) })
      .locator('input');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.employeeResultsTable = page.locator('.oxd-table');
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

  async searchEmployeeById(employeeId: string): Promise<void> {
    await this.employeeIdSearchInput.fill(employeeId);
    await this.searchButton.click();
  }

  // Locate the row dynamically because employee IDs are generated uniquely for every test execution.
  getEmployeeRowById(employeeId: string): Locator {
    return this.employeeResultsTable
      .locator('.oxd-table-row')
      .filter({ has: this.page.getByText(employeeId, { exact: true }) });
  }
}
