import { test, expect } from '@playwright/test';
import { registerUser, loginUser, expectOnDashboard, expectOnLogin, uniqueEmail } from './helpers';

test.describe('Login Flow', () => {
  test('should show login form with email and password fields', async ({ page }) => {
    await page.goto('/pt/login');

    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Senha')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/pt/login');

    await page.fill('#email', 'nonexistent@test.com');
    await page.fill('#password', 'WrongPassword123');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Email ou senha inválidos')).toBeVisible();
  });

  test('should register a new user and redirect to dashboard', async ({ page }) => {
    const email = uniqueEmail('login');

    await registerUser(page, { name: 'E2E Test User', email, password: 'Test123456' });
    await expectOnDashboard(page);
  });

  test('should login with registered user and reach dashboard', async ({ page }) => {
    const email = uniqueEmail('loginflow');

    // First register
    await registerUser(page, { name: 'Login Flow User', email, password: 'Test123456' });
    await expectOnDashboard(page);

    // Logout by clearing cookies and navigating to login
    await page.context().clearCookies();
    await page.goto('/pt/login');

    // Login again
    await loginUser(page, email, 'Test123456');
    await expectOnDashboard(page);
  });

  test('should navigate from login to register page', async ({ page }) => {
    await page.goto('/pt/login');

    await page.click('a[href="/pt/register"]');
    await expect(page).toHaveURL(/register/);
    await expect(page.getByRole('heading', { name: 'Criar conta' })).toBeVisible();
  });

  test('should show login form elements on the landing page', async ({ page }) => {
    await page.goto('/pt/login');

    // Check brand
    await expect(page.getByText('Ponto das Ofertas')).toBeVisible();
    await expect(page.getByText('Controle de Estoque')).toBeVisible();

    // Check feature badges
    await expect(page.getByText('Gestão de estoque')).toBeVisible();
    await expect(page.getByText('Multi-canal')).toBeVisible();
    await expect(page.getByText('Segurança')).toBeVisible();
  });
});
