import type { Page } from '@playwright/test';

export async function prepareMockSession(page: Page): Promise<void> {
  const token = process.env.E2E_TOKEN ?? 'test_user';

  await page.addInitScript((t: string) => {
    localStorage.setItem('token', t);
  }, token);
}
