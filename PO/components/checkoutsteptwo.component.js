export class CheckoutStepTwoComponent {
  constructor(page) {
    this.page = page;
    this.finishBtn = page.getByTestId('finish');
    this.totalPrice = page.getByTestId('total-label');
    this.orderSummary = page.getByTestId('checkout_summary_container');
  }
}
