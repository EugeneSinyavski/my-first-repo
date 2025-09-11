import { HeaderComponent } from '../components/header.component';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.header = new HeaderComponent(page);
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com');
  }

  async getPageTitle() {
    return await this.header.pageTitle.textContent();
  }

  async openCart() {
    await this.header.shoppingCartIcon.click();
  }
}
