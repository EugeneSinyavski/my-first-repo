import { BasePage } from './base.page';
import { CheckoutStepTwoComponent } from '../components/checkoutsteptwo.component';

export class CheckoutStepTwoPage extends BasePage {
  constructor(page) {
    super(page);
    this.components = new CheckoutStepTwoComponent(page);
  }

  async clickFinishBtn() {
    return await this.components.finishBtn.click();
  }
}
