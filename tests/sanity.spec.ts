import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ApplicationURL from '../helpers/ApplicationURL';
import ProductsPage from '../pages/ProductsPage';
import YourCartPage from '../pages/YourCartPage';
import PageTitles from '../helpers/PageTitles';
import CheckoutYourInformationPage from '../pages/CheckoutYourInformationPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';

test.describe('Sanity Tests Block', () => {
                          // products[0]        products[1]                    products[2]
    const products = ['Sauce Labs Backpack', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie'];

    test('Validate doing simple transaction', async ({ page }) => {
    
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const yourCartPage = new YourCartPage(page);
        const checkOutYourInfoPage = new CheckoutYourInformationPage(page);
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await loginPage.loginToApplication();
    
        await productsPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL)    
        await productsPage.validateTitle("Products")
    
        await productsPage.chooseProductByTitle(products[0]);
        await productsPage.chooseProductByTitle(products[1]);
        await productsPage.chooseProductByTitle(products[2]);
    
        await productsPage.validateNumberOfItems(products.length.toString());
        await productsPage.goToCart();
    
        await yourCartPage.validatePageUrl(ApplicationURL.YOUR_CART_PAGE_URL);
        await yourCartPage.validateTitle(PageTitles.YOUR_CART_PAGE);
        await yourCartPage.validateNumberOfItems(products.length);
  
        await yourCartPage.validateItemExistsinCart(products[0]);
        await yourCartPage.validateItemExistsinCart(products[1]);
        await yourCartPage.validateItemExistsinCart(products[2]);
        await yourCartPage.goToCheckout();

        await checkOutYourInfoPage.validatePageUrl(ApplicationURL.CHECKOUT_YOUR_INFO_PAGE_URL);
        await checkOutYourInfoPage.validateTitle(PageTitles.CHECKOUT_YOUR_INFO_PAGE);
        await checkOutYourInfoPage.fillInformation("Alex", "Komanov", "20100");
        await checkOutYourInfoPage.goTocheckoutOverview();
   
        await checkoutOverviewPage.validatePageUrl(ApplicationURL.CHECKOUT_OVERVIEW_PAGE_URL);
        await checkoutOverviewPage.validateTitle(PageTitles.CHECKOUT_OVERVIEW_PAGE);
        await checkoutOverviewPage.clickFinishButton();

        await checkoutCompletePage.validatePageUrl(ApplicationURL.CHECKOUT_COMPLETE_PAGE_URL);
        await checkoutCompletePage.validateTitle(PageTitles.CHECKOUT_COMPLETE_PAGE);
        await checkoutCompletePage.validateFinalMessage('Thank you for your order!');

    
    });
    
})
