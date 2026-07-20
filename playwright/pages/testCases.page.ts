import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class TestCasesPage extends BasePage {
    readonly testCaseNavButton: Locator;


    constructor(page: Page) {
        super(page)
        this.testCaseNavButton = page.locator('li a[href="/test_cases"]');
    }
}