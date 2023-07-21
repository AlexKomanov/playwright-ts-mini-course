import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import UserCredetials from '../helpers/UserCredentials';
import ApplicationURL from '../helpers/ApplicationURL';

test('sanity test', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('a').filter({ hasText: '3' }).click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('alex');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('komanov');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('20100');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
    await page.locator('[data-test="back-to-products"]').click();
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Reset App State' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();

});


test('demo test_2', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication();
    

});