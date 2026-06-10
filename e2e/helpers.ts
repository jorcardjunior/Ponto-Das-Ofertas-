import { type Page, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3001';

/** Generate a unique email for test isolation */
export function uniqueEmail(prefix = 'test') {
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${ts}_${rand}@e2e.test`;
}

/** Register a new user via the UI and wait for redirect to dashboard */
export async function registerUser(
  page: Page,
  opts: { name?: string; email: string; password: string } = {
    name: 'E2E Test User',
    email: uniqueEmail(),
    password: 'Test123456',
  },
) {
  await page.goto(`${BASE_URL}/pt/register`);

  await page.fill('#name', opts.name ?? 'E2E Test User');
  await page.fill('#email', opts.email);
  await page.fill('#password', opts.password);

  await page.click('button[type="submit"]');

  // Wait for navigation to dashboard (or login if auto-login fails)
  await page.waitForURL(/\/(pt\/dashboard|login)/, { timeout: 15_000 });
  await page.waitForLoadState('networkidle');
  return opts.email;
}

/** Login an existing user via the UI */
export async function loginUser(
  page: Page,
  email: string,
  password: string = 'Test123456',
) {
  await page.goto(`${BASE_URL}/pt/login`);

  await page.fill('#email', email);
  await page.fill('#password', password);

  await page.click('button[type="submit"]');

  // Wait for navigation to dashboard
  await page.waitForURL(/\/(pt\/dashboard|login)/, { timeout: 15_000 });
  await page.waitForLoadState('networkidle');
}

/** Check if user is on the dashboard page */
export async function expectOnDashboard(page: Page) {
  await expect(page).toHaveURL(/dashboard/);
}

/** Check if user is on the login page */
export async function expectOnLogin(page: Page) {
  await expect(page).toHaveURL(/login/);
}
