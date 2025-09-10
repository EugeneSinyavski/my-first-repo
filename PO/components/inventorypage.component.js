export class InventoryPageComponent {
  constructor(page) {
    this.page = page;
    this.itemDescription = page.getByTestId('inventory-item-description');
    this.inventoryItems = page.getByTestId('inventory-item-name');
    this.priceItemList = page.getByTestId('inventory-item-price');
    this.addToCartBtn = page.getByRole('button', { name: 'Add to cart' });
    this.removeItemBtn = page.getByRole('button', { name: 'Remove' });
  }
}
