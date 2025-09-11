export class CheckoutCompleteComponent {
  constructor(page) {
    this.page = page;
    this.backToProductsBtn = page.getByTestId('back-to-products');
    this.completeMessage = page.getByTestId('complete-header');
  }
}
