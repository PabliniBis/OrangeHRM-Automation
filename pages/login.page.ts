import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly usernameRequiredMessage: Locator;
  readonly passwordRequiredMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.invalidCredentialsMessage = page.getByText('Invalid credentials');
    this.usernameRequiredMessage = page
      .locator('.oxd-input-group')
      .filter({ has: this.usernameInput })
      .getByText('Required', { exact: true });
    this.passwordRequiredMessage = page
      .locator('.oxd-input-group')
      .filter({ has: this.passwordInput })
      .getByText('Required', { exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
