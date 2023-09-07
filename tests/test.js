import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('https://banfts.com/');

  // Click the Auth with signature link.
  await page.getByText('Auth with signature').click();

  // Expects page to have 'Authenticate to Banfts!' text.
  await expect(page.getByText('Authenticate to Banfts!')).toBeVisible();
});
