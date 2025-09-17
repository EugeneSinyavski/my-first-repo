// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../PO/pages/login.page';

test.describe('Sauce Demo Login', () => {
  test('User should successfully log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test("Locked out user shouldn't successfully log in", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Verify that the error message contains the correct text
    await expect(page.getByTestId('error')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});
