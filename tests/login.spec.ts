import { expect, test } from '../fixtures/app.fixture';
import { invalidUser } from '../data/users';

test('should login with valid credentials', async ({ loginPage, dashboardPage }) => {
  const username = process.env.ORANGEHRM_USERNAME;
  const password = process.env.ORANGEHRM_PASSWORD;

  if (!username || !password) {
    throw new Error('Please configure credentials in environment variables file.');
  }

  await loginPage.goto();
  await loginPage.login(username, password);

  await expect(loginPage.page).toHaveURL(/\/web\/index\.php\/dashboard/);
  await expect(dashboardPage.dashboardHeading).toBeVisible();
});

test('should show an error with invalid credentials', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(invalidUser.username, invalidUser.password);

  await expect(loginPage.invalidCredentialsMessage).toBeVisible();
  await expect(loginPage.page).toHaveURL(/\/web\/index\.php\/auth\/login/);
});

test('should show required validation when credentials are empty', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.loginButton.click();

  await expect(loginPage.usernameRequiredMessage).toBeVisible();
  await expect(loginPage.passwordRequiredMessage).toBeVisible();
  await expect(loginPage.page).toHaveURL(/\/web\/index\.php\/auth\/login/);
});

test('should logout successfully', async ({ loginPage, dashboardPage }) => {
  const username = process.env.ORANGEHRM_USERNAME;
  const password = process.env.ORANGEHRM_PASSWORD;

  if (!username || !password) {
    throw new Error('Please configure credentials in environment variables file.');
  }

  await loginPage.goto();
  await loginPage.login(username, password);
  await expect(dashboardPage.dashboardHeading).toBeVisible();

  await dashboardPage.logout();

  await expect(loginPage.page).toHaveURL(/\/web\/index\.php\/auth\/login/);
  await expect(loginPage.loginButton).toBeVisible();
});
