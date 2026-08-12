import { expect, test } from '../fixtures/app.fixture';
import { generateEmployeeData } from '../utils/data-generator';

test('should navigate to PIM employee list', async ({ loginPage, dashboardPage, pimPage }) => {
  const username = process.env.ORANGEHRM_USERNAME;
  const password = process.env.ORANGEHRM_PASSWORD;

  if (!username || !password) {
    throw new Error('Please configure credentials in environment variables file.');
  }

  await loginPage.goto();
  await loginPage.login(username, password);
  await dashboardPage.navigateToPim();

  await expect(pimPage.page).toHaveURL(/\/web\/index\.php\/pim\/viewEmployeeList/);
  await expect(pimPage.pimHeading).toBeVisible();
  await expect(pimPage.addEmployeeButton).toBeVisible();
});

test('should create a new employee', async ({
  loginPage,
  dashboardPage,
  pimPage,
  employeeDetailsPage,
}) => {
  const employeeData = generateEmployeeData();
  const username = process.env.ORANGEHRM_USERNAME;
  const password = process.env.ORANGEHRM_PASSWORD;

  if (!username || !password) {
    throw new Error('Please configure credentials in environment variables file.');
  }

  await loginPage.goto();
  await loginPage.login(username, password);
  await dashboardPage.navigateToPim();
  await pimPage.openAddEmployeeForm();
  await pimPage.addEmployee(
    employeeData.firstName,
    employeeData.lastName,
    employeeData.employeeId,
  );

  await expect(pimPage.page).toHaveURL(/\/web\/index\.php\/pim\/viewPersonalDetails/);
  await expect(employeeDetailsPage.personalDetailsHeading).toBeVisible();
  await expect(employeeDetailsPage.firstNameInput).toHaveValue(employeeData.firstName);
  await expect(employeeDetailsPage.lastNameInput).toHaveValue(employeeData.lastName);
  await expect(employeeDetailsPage.employeeIdInput).toHaveValue(employeeData.employeeId);
});
