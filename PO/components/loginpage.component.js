export class LoginPageComponent {
  constructor(page) {
    this.page = page;
    this.errorMessageContainer = page.locator('div.error-message-container');
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }
}
