export class HeaderComponent {
  constructor(page) {
    this.page = page;
    this.shoppingCartIcon = page.getByTestId('shopping-cart-link');
    this.pageTitle = page.getByTestId('title');
  }
}
