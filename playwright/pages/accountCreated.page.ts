import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountCreatedPage extends BasePage {
    readonly accountCreatedContinueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.accountCreatedContinueButton = page.locator('[data-qa="continue-button"]');
    }
}