import { InventoryPageComponent } from '../components/inventorypage.component';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.components = new InventoryPageComponent(page);
  }

  async findMostExpensiveItem() {
    const priceList = await this.components.priceItemList.allTextContents();
    const numPrices = priceList.map(x => parseFloat(x.slice(1)));
    const maxPrice = Math.max(...numPrices);

    const neededItem = await this.components.itemDescription.filter({ hasText: `${maxPrice}` });
    return await neededItem.getByTestId('inventory-item-name').textContent();
  }

  async addItemToCart(itemName) {
    await this.components.itemDescription.filter({ hasText: itemName }).getByRole('button', { name: 'Add to cart' }).click();
  }
}
