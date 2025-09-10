import { BasePage } from './base.page';
import { CartPageComponent } from '../components/cartpage.component';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.components = new CartPageComponent(page);
  }

  async getCartItemsList() {
    return await this.components.cartItems.allTextContents();
  }

  async clickCheckoutBtn() {
    return await this.components.checkoutBtn.click();
  }

  async clickContinueBtn() {
    return await this.components.continueBtn.click();
  }
}
