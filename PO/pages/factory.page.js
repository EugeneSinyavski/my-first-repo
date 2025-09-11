import { LoginPage } from './login.page';
import { InventoryPage } from './inventory.page';
import { CartPage } from './cart.page';
import { CheckoutStepOnePage } from './checkoutstepone.page';
import { CheckoutStepTwoPage } from './checkoutsteptwo.page';
import { CheckoutCompletePage } from './checkoutcomplete.page';

export function pages(name, page) {
  const items = {
    login: new LoginPage(page),
    inventory: new InventoryPage(page),
    cart: new CartPage(page),
    checkoutstepone: new CheckoutStepOnePage(page),
    checkoutsteptwo: new CheckoutStepTwoPage(page),
    checkoutcomplete: new CheckoutCompletePage(page),
  };
  return items[name.toLowerCase()];
}
