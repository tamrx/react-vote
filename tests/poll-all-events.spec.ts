import { test, expect } from '@playwright/test';

test('Test CURD answers and vote', async ({ page }) => {

    // Go to http://localhost:3000/
    await page.goto('http://localhost:3000/');

    // Click text=Type your questionType your question >> input[type="text"]
    await page.locator('text=Type your questionType your question >> input[type="text"]').click();

    // Fill text=Type your questionType your question >> input[type="text"]
    await page.locator('text=Type your questionType your question >> input[type="text"]').fill('What is the value of pi ?');

    // Click input[name="answerItem"]
    await page.locator('input[name="answerItem"]').click();

    // Fill input[name="answerItem"]
    await page.locator('input[name="answerItem"]').fill('13.14');

    // Click text=No options, You can add the options answers bellowType an AnswerType an Answer >> button
    await page.locator('text=No options, You can add the options answers bellowType an AnswerType an Answer >> button').click();

    // Click input[name="answerItem"]
    await page.locator('input[name="answerItem"]').click();

    // Fill input[name="answerItem"]
    await page.locator('input[name="answerItem"]').fill('7/4');

    // Press Enter
    await page.locator('input[name="answerItem"]').press('Enter');

    // Check input[name="radio-buttons-group"] >> nth=0
    await page.locator('input[name="radio-buttons-group"]').first().check();

    // Click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click();

    // Check input[name="radio-buttons-group"] >> nth=1
    await page.locator('input[name="radio-buttons-group"]').nth(1).check();

    // Click button:has-text("Vote")
    await page.locator('button:has-text("Vote")').click();

    // Click [aria-label="delete"] >> nth=1
    await page.locator('[aria-label="delete"]').nth(1).click();

    // Click text=Reset
    await page.locator('text=Reset').click();

});