import { expect, test } from "@playwright/test";

test("game opens and paints the dome canvas", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Dome Keeper/);
  const startButton = page.getByRole("button", { name: /start day 1|restart dome/i });
  await expect(startButton).toBeVisible();

  await startButton.click();
  await expect(page.locator("#overlay")).toBeHidden();
  await expect(page.locator("#world")).toBeVisible();

  const paintedPixels = await page.locator("#world").evaluate((canvas) => {
    const ctx = canvas.getContext("2d");
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let nonTransparent = 0;

    for (let index = 3; index < data.length; index += 4) {
      if (data[index] > 0) {
        nonTransparent += 1;
      }
    }

    return nonTransparent;
  });

  expect(paintedPixels).toBeGreaterThan(1000);
});
