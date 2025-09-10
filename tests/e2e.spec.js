// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../PO/pages/login.page';
import { InventoryPage } from '../PO/pages/inventory.page';
import { CartPage } from '../PO/pages/cart.page';

test.describe('Sauce Demo - Purchase Flow', () => {
  test('Login, buy most expensive item, and complete checkout', async ({ page }) => {
    // ==== Login ====
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(loginPage.components.errorMessageContainer).not.toBeVisible();

    // ==== InventoryPage ====
    const inventoryPage = new InventoryPage(page);
    const inventoryTitle = await inventoryPage.getPageTitle();
    await expect(inventoryTitle).toBe('Products');

    const mostExpensiveItem = await inventoryPage.findMostExpensiveItem();
    await inventoryPage.addItemToCart(mostExpensiveItem);
    const addedItems = await inventoryPage.getAddedInventoryItems();

    // ==== CartPage ====
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    const cartTitle = await cartPage.getPageTitle();
    await expect(cartTitle).toBe('Your Cart');

    const cartItems = await cartPage.getCartItemsList();
    await expect([...addedItems]).toEqual([...cartItems]);

    await cartPage.clickCheckoutBtn();
  });
});
