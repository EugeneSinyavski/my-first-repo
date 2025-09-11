import { BasePage } from './base.page';
import { CheckoutStepOneComponent } from '../components/checkoutstepone.component';

export class CheckoutStepOnePage extends BasePage {
  constructor(page) {
    super(page);
    this.components = new CheckoutStepOneComponent(page);
  }

  async fillUserInfo(firstName, lastName, postalCode) {
    await this.components.firstNameInput.fill(firstName);
    await this.components.lastNameInput.fill(lastName);
    await this.components.postalCode.fill(postalCode);
  }

  async clickContinueBtn() {
    return await this.components.continueBtn.click();
  }
}
