import { expect, test } from '@playwright/test';

test('sample', async ({ page }) => {
    await page.goto('/');
    await expect(
        page.getByRole('banner'),
        // .getByRole('heading', { name: 'blog.ykyki.net' }),
    ).toBeVisible();
});
