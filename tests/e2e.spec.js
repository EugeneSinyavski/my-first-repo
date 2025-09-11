// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../PO/pages/login.page';
import { InventoryPage } from '../PO/pages/inventory.page';
import { CartPage } from '../PO/pages/cart.page';
import { CheckoutStepOnePage } from '../PO/pages/checkoutstepone.page';
import { CheckoutStepTwoPage } from '../PO/pages/checkoutsteptwo.page';
import { CheckoutComplitePage } from '../PO/pages/checkoutcomplite.page';

test.describe('Sauce Demo - Purchase Flow', () => {
  test('Login, buy most expensive item, and complete checkout', async ({ page }) => {
    // ==== Login ====
    // Open login page and log in with valid credentials
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(loginPage.components.errorMessageContainer).not.toBeVisible();

    // ==== InventoryPage ====
    // Verify title, add most expensive product, save selected items
    const inventoryPage = new InventoryPage(page);
    const inventoryTitle = await inventoryPage.getPageTitle();
    await expect(inventoryTitle).toBe('Products');

    const mostExpensiveItem = await inventoryPage.findMostExpensiveItem();
    await inventoryPage.addItemToCart(mostExpensiveItem);
    const addedItems = await inventoryPage.getAddedInventoryItems();

    // ==== CartPage ====
    // Verify cart contains same items, go to checkout
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    const cartTitle = await cartPage.getPageTitle();
    await expect(cartTitle).toBe('Your Cart');

    const cartItems = await cartPage.getCartItemsList();
    await expect([...addedItems]).toEqual([...cartItems]);

    await cartPage.clickCheckoutBtn();

    // ==== CheckoutStepOnePage ====
    // Fill user info and continue
    const checkoutStepOnePage = new CheckoutStepOnePage(page);

    const checkoutStepOneTitle = await checkoutStepOnePage.getPageTitle();
    await expect(checkoutStepOneTitle).toBe('Checkout: Your Information');

    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await checkoutStepOnePage.clickContinueBtn();

    // ==== CheckoutStepTwoPage ====
    // Verify title, go to finish step
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutStepTwoTitle = await checkoutStepTwoPage.getPageTitle();
    await expect(checkoutStepTwoTitle).toBe('Checkout: Overview');

    await checkoutStepTwoPage.clickFinishBtn();

    // ==== CheckoutComplitePage ====
    const checkoutComplitePage = new CheckoutComplitePage(page);
    const completionMessage = await checkoutComplitePage.getCompletionMessage();
    await expect(completionMessage).toBe('Thank you for your order!');
  });
});
