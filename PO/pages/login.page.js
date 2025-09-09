import { BasePage } from './base.page';
import { LoginPageComponent } from '../components/loginpage.component';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.components = new LoginPageComponent(page);
  }

  async login(username, password) {
    await this.components.usernameInput.fill(username);
    await this.components.passwordInput.fill(password);
    await this.components.loginButton.click();
  }
}

// test('User should successfully log in', async ({ page }) => {
//     // Enter username
//     await page.getByPlaceholder('Username').fill('standard_user');

//     // Enter password
//     await page.getByPlaceholder('Password').fill('secret_sauce');

//     // Click the login button
//     await page.getByRole('button', { name: 'Login' }).click();

//     // Verify that the URL has changed and contains the expected part
//     await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
//   });
