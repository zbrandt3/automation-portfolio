import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page';
import { ProductsPage } from './products.page';

export class CartPage extends BasePage {
    //TODO: change to Promise<number> when getProductTotalPrice() is finished
    public cartProductTotalPrice: number;
    protected cartId = 1;

    readonly cartSubscriptionHeader: Locator;
    readonly cartSubscriptionForm: Locator;
    readonly cartSubscriptionSubmitButton: Locator;
    readonly cartSubscriptionSuccessMessage: Locator;
    readonly cartProductTableRows: Locator;
    readonly cartProduct: Locator;
    readonly cartProductPrice: Locator;
    readonly cartProductQuanity: Locator;
    readonly cartProductTotalPriceText: Locator;

    constructor(page: Page) {
        super(page);
        this.cartSubscriptionHeader = page.getByRole('heading', { name: 'Subscription' });
        this.cartSubscriptionForm = page.locator('#susbscribe_email');
        this.cartSubscriptionSubmitButton = page.locator('#subscribe');
        this.cartSubscriptionSuccessMessage = page.locator('#success-subscribe');
        this.cartProductTableRows = page.locator('#cart_info_table tbody tr');
        this.cartProduct = page.locator('.class_product').nth(this.cartId - 1);
        this.cartProductQuanity = page.locator('.cart_quantity').nth(this.cartId - 1);
        this.cartProductPrice = page.locator('.cart_price').nth(this.cartId - 1);
        this.cartProductTotalPriceText = page.locator('.cart_total_price').nth(this.cartId - 1);
        this.cartProductTotalPrice = 0;
    }

    async setCartID(id: number) {
        this.cartId = id;
    }

    //placeholder code to get full price of multiple of an item on cart
    async getProductTotalPrice(): Promise<number> {
        const priceText = this.cartProductPrice.innerText();
        return parseFloat((await priceText).replace('Rs. ', ''));
    }
}