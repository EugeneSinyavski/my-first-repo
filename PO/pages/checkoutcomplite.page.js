import { BasePage } from './base.page';
import { CheckoutCompliteComponent } from '../components/checkoutcomplite.component';

export class CheckoutComplitePage extends BasePage {
  constructor(page) {
    super(page);
    this.components = new CheckoutCompliteComponent(page);
  }

  async clickbackToProductsBtn() {
    return await this.components.backToProductsBtn.click();
  }

  async getCompletionMessage() {
    return await this.components.compliteMessage.textContent();
  }
}
