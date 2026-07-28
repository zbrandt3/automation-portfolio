import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    protected homeId: number = 1;

    readonly logo: Locator;
    readonly productsPageNavButton: Locator;
    readonly contactUsPageNavButton: Locator;
    readonly testCasesPageNavButton: Locator;
    readonly deleteAccountButton: Locator;
    readonly deletionConfirmation: Locator;
    readonly subscriptionHeader: Locator;
    readonly subscriptionForm: Locator;
    readonly subscriptionSubmitButton: Locator;
    readonly subscriptionSuccessMessage: Locator;
    readonly cartPageNavButton: Locator;
    readonly homeViewProduct: Locator;

    readonly logoutButton: Locator;
    readonly displayName: Locator;

    constructor(page: Page) {
        super(page);
        this.productsPageNavButton = page.locator('li a[href="/products"]');
        this.contactUsPageNavButton = page.locator('a[href="/contact_us"]')
        this.testCasesPageNavButton = page.locator('li a[href="/test_cases"]');

        this.displayName = page.locator('b');
        this.deleteAccountButton = page.locator('a[href="/delete_account"]');
        this.logoutButton = page.locator('a[href="/logout"]');
        this.logo = page.locator('.logo');
        this.deletionConfirmation = page.locator('[data-qa="account-deleted"]');
        this.subscriptionHeader = page.getByRole('heading', { name: 'Subscription' });
        this.subscriptionForm = page.locator('#susbscribe_email');
        this.subscriptionSubmitButton = page.locator('#subscribe');
        this.subscriptionSuccessMessage = page.locator('#success-subscribe');
        this.cartPageNavButton = page.locator('header a[href="/view_cart"]')
        this.homeViewProduct = page.locator('.single-products .choose').nth(this.homeId - 1);
    }

    async setHomeID(id: number) {
        this.homeId = id;
    }

}