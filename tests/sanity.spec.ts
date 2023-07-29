import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ApplicationURL from '../helpers/ApplicationURL';
import ProductsPage from '../pages/ProductsPage';
import YourCartPage from '../pages/YourCartPage';

test('sanity test', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const yourCartPage = new YourCartPage(page);
    await loginPage.loginToApplication();

    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)    
    await productsPage.validateTitle("Products")


    await productsPage.chooseProductByTitle('Sauce Labs Backpack');
    await productsPage.chooseProductByTitle('Sauce Labs Fleece Jacket');
    await productsPage.chooseProductByTitle('Sauce Labs Onesie');

    await productsPage.validateNumberOfItems("3");
    await productsPage.goToCart();

    await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
    await yourCartPage.validateTitle("Your Cart");
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
    const productsPage = new ProductsPage(page);
    await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)    
    await productsPage.validateTitle("Products")
    

    

});