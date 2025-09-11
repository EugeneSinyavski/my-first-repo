// @ts-check
import { test, expect } from '@playwright/test';
import { pages } from '../PO/pages/factory.page';

test.describe('Sauce Demo - Purchase Flow', () => {
  test('Login, buy most expensive item, and complete checkout', async ({ page }) => {
    // ==== Login ====
    // Open login page and log in with valid credentials
    const loginPage = pages('login', page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(loginPage.components.errorMessageContainer).not.toBeVisible();

    // ==== InventoryPage ====
    // Verify title, add most expensive product, save selected items
    const inventoryPage = pages('inventory', page);
    const inventoryTitle = await inventoryPage.getPageTitle();
    await expect(inventoryTitle).toBe('Products');

    const mostExpensiveItem = await inventoryPage.findMostExpensiveItem();
    await inventoryPage.addItemToCart(mostExpensiveItem);
    const addedItems = await inventoryPage.getAddedInventoryItems();

    // ==== CartPage ====
    // Verify cart contains same items, go to checkout
    await inventoryPage.openCart();
    const cartPage = pages('cart', page);
    const cartTitle = await cartPage.getPageTitle();
    await expect(cartTitle).toBe('Your Cart');

    const cartItems = await cartPage.getCartItemsList();
    await expect([...addedItems]).toEqual([...cartItems]);

    await cartPage.clickCheckoutBtn();

    // ==== CheckoutStepOnePage ====
    // Fill user info and continue
    const checkoutStepOnePage = pages('checkoutstepone', page);

    const checkoutStepOneTitle = await checkoutStepOnePage.getPageTitle();
    await expect(checkoutStepOneTitle).toBe('Checkout: Your Information');

    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await checkoutStepOnePage.clickContinueBtn();

    // ==== CheckoutStepTwoPage ====
    // Verify title, go to finish step
    const checkoutStepTwoPage = pages('checkoutsteptwo', page);
    const checkoutStepTwoTitle = await checkoutStepTwoPage.getPageTitle();
    await expect(checkoutStepTwoTitle).toBe('Checkout: Overview');

    await checkoutStepTwoPage.clickFinishBtn();

    // ==== CheckoutComplitePage ====
    const checkoutCompletePage = pages('checkoutcomplete', page);
    const completionMessage = await checkoutCompletePage.getCompletionMessage();
    await expect(completionMessage).toBe('Thank you for your order!');
  });
});
