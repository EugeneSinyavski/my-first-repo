// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Login', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page
    await page.goto('https://www.saucedemo.com/');
  });

  test('User should successfully log in', async ({ page }) => {
    // Enter username
    await page
      .getByPlaceholder('Username')
      .fill('standard_user');

    // Enter password
    await page
      .getByPlaceholder('Password')
      .fill('secret_sauce');

    // Click the login button
    await page
      .getByRole('button', { name: 'Login' })
      .click();

    // Verify that the URL has changed and contains the expected part
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test("Locked out user shouldn't successfully log in", async ({ page }) => {
    // Enter username
    await page
      .getByPlaceholder('Username')
      .fill('locked_out_user');
    // Enter password
    await page
      .getByPlaceholder('Password')
      .fill('secret_sauce');

    // Click the login button
    await page
      .getByRole('button', { name: 'Login' })
      .click();

    // Verify that the error message contains the correct text
    await expect(page.getByTestId('error')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });
});
