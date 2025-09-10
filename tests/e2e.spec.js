// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../PO/pages/login.page';
import { InventoryPage } from '../PO/pages/inventory.page';

test.describe('Sauce Demo Login', () => {
  test('User should successfully log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(loginPage.components.errorMessageContainer).not.toBeVisible();

    const inventoryPage = new InventoryPage(page);
    const inventoryTitle = await inventoryPage.getPageTitle();
    await expect(inventoryTitle).toBe('Products');

    const mostExpensiveItem = await inventoryPage.findMostExpensiveItem();
    await inventoryPage.addItemToCart(mostExpensiveItem);
    await inventoryPage.openCart();
  });
});
