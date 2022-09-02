import { test } from '@playwright/test';
const BASE_URL = 'https://react-vote-eta.vercel.app/';
test('Test happy case scenario, just add question and vote', async ({ page }) => {

    // Go to https://react-vote-eta.vercel.app/
    await page.goto(BASE_URL);

    // Click text=Type your questionType your question >> input[type="text"]
    await page.locator('text=Type your questionType your question >> input[type="text"]').click();

    // Fill text=Type your questionType your question >> input[type="text"]
    await page.locator('text=Type your questionType your question >> input[type="text"]').fill('what is the value of pi ?');

    // Check input[name="radio-buttons-group"] >> nth=0
    await page.locator('input[name="radio-buttons-group"]').first().check();

    // Click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click();

    // Check input[name="radio-buttons-group"] >> nth=1
    await page.locator('input[name="radio-buttons-group"]').nth(1).check();

    // Click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click();

    // Check input[name="radio-buttons-group"] >> nth=0
    await page.locator('input[name="radio-buttons-group"]').first().check();

    // Double click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').dblclick();

    // Check input[name="radio-buttons-group"] >> nth=1
    await page.locator('input[name="radio-buttons-group"]').nth(1).check();

    // Triple click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click({
        clickCount: 3
    });

    // Click text=Reset
    await page.locator('text=Reset').click();

});

test('Test add some answers and delete them', async ({ page }) => {

    // Go to http://localhost:3000/
    await page.goto(BASE_URL);

    // Click input[name="answerItem"]
    await page.locator('input[name="answerItem"]').click();

    // Fill input[name="answerItem"]
    await page.locator('input[name="answerItem"]').fill('14/7');

    // Press Enter
    await page.locator('input[name="answerItem"]').press('Enter');

    // Fill input[name="answerItem"]
    await page.locator('input[name="answerItem"]').fill('3.14');

    // Click button >> nth=4
    await page.locator('button').nth(4).click();

    // Click text=Type your questionType your question >> input[type="text"]
    await page.locator('text=Type your questionType your question >> input[type="text"]').click();

    // Fill text=Type your questionType your question >> input[type="text"]
    await page.locator('text=Type your questionType your question >> input[type="text"]').fill('what is the value of Pi ?');

    // Check input[name="radio-buttons-group"] >> nth=0
    await page.locator('input[name="radio-buttons-group"]').first().check();

    // Click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click();

    // Check input[name="radio-buttons-group"] >> nth=1
    await page.locator('input[name="radio-buttons-group"]').nth(1).check();

    // Click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click();

    // Check input[name="radio-buttons-group"] >> nth=2
    await page.locator('input[name="radio-buttons-group"]').nth(2).check();

    // Click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click();

    // Click label:has-text("3.14")
    await page.locator('label:has-text("3.14")').click();

    // Click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click();

    // Click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click();

    // Click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click();

    // Click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click();

    // Click [aria-label="delete"] >> nth=3
    await page.locator('[aria-label="delete"]').nth(3).click();

    // Click [aria-label="delete"] >> nth=2
    await page.locator('[aria-label="delete"]').nth(2).click();

    // Click text=Reset
    await page.locator('text=Reset').click();

});
