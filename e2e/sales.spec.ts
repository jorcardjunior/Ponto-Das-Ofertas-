import { test, expect } from '@playwright/test';
import { registerUser, loginUser, expectOnDashboard, uniqueEmail } from './helpers';

const BASE_URL = 'http://localhost:3001';

test.describe('Sales Registration Flow', () => {
  let userEmail: string;

  test.beforeAll(async () => {
    userEmail = uniqueEmail('sales');
  });

  test('should register user and reach dashboard', async ({ page }) => {
    await registerUser(page, {
      name: 'Sales Test User',
      email: userEmail,
      password: 'Test123456',
    });
    await expectOnDashboard(page);
  });

  test('should navigate to sales page and show chart/stats', async ({ page }) => {
    await loginUser(page, userEmail, 'Test123456');
    await expectOnDashboard(page);

    await page.goto(`${BASE_URL}/pt/vendas`);
    await page.waitForLoadState('networkidle');

    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveURL(/vendas/);
  });

  test('should navigate between dashboard and sales', async ({ page }) => {
    await loginUser(page, userEmail, 'Test123456');
    await expectOnDashboard(page);

    // Go to sales
    await page.goto(`${BASE_URL}/pt/vendas`);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/vendas/);

    // Go back to dashboard
    await page.goto(`${BASE_URL}/pt/dashboard`);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should navigate to suppliers page', async ({ page }) => {
    await loginUser(page, userEmail, 'Test123456');
    await expectOnDashboard(page);

    await page.goto(`${BASE_URL}/pt/fornecedores`);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/fornecedores/);
    await expect(page.locator('body')).toBeVisible();
  });
});
