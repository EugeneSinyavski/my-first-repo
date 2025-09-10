export class CartPageComponent {
  constructor(page) {
    this.page = page;
    this.cartItems = page.getByTestId('inventory-item-name');
    this.continueBtn = page.getByTestId('continue-shopping');
    this.checkoutBtn = page.getByTestId('checkout');
  }
}
