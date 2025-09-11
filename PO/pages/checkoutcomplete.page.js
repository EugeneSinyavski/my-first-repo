import { BasePage } from './base.page';
import { CheckoutCompleteComponent } from '../components/checkoutcomplete.component';

export class CheckoutCompletePage extends BasePage {
  constructor(page) {
    super(page);
    this.components = new CheckoutCompleteComponent(page);
  }

  async clickbackToProductsBtn() {
    return await this.components.backToProductsBtn.click();
  }

  async getCompletionMessage() {
    return await this.components.completeMessage.textContent();
  }
}
