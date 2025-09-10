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
