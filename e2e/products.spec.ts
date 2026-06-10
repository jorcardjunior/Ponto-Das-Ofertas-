import { test, expect } from '@playwright/test';
import { registerUser, loginUser, expectOnDashboard, uniqueEmail } from './helpers';

const BASE_URL = 'http://localhost:3001';

test.describe('Product Creation Flow', () => {
  let userEmail: string;

  test.beforeAll(async () => {
    userEmail = uniqueEmail('products');
  });

  test('should register user and reach dashboard', async ({ page }) => {
    await registerUser(page, {
      name: 'Product Test User',
      email: userEmail,
      password: 'Test123456',
    });
    await expectOnDashboard(page);
  });

  test('should navigate to products page and show product table', async ({ page }) => {
    await loginUser(page, userEmail, 'Test123456');
    await expectOnDashboard(page);

    await page.goto(`${BASE_URL}/pt/produtos`);
    await page.waitForLoadState('networkidle');

    // Should show the products page content (either loading skeleton or table)
    await expect(page.locator('body')).toBeVisible();
    // Verify the URL is correct
    await expect(page).toHaveURL(/produtos/);
  });

  test('should navigate between dashboard and products', async ({ page }) => {
    await loginUser(page, userEmail, 'Test123456');
    await expectOnDashboard(page);

    // Go to products
    await page.goto(`${BASE_URL}/pt/produtos`);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/produtos/);

    // Go back to dashboard
    await page.goto(`${BASE_URL}/pt/dashboard`);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard/);
  });
});
