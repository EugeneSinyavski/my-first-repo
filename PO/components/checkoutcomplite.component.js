export class CheckoutCompliteComponent {
  constructor(page) {
    this.page = page;
    this.backToProductsBtn = page.getByTestId('back-to-products');
    this.compliteMessage = page.getByTestId('complete-header');
  }
}
