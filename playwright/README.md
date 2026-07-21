# Playwright Test Suite — automationexercise.com

This document covers the Playwright-specific implementation details for this suite. For project-wide setup, stack overview, and folder structure, refer to the root `README.md`.

---

## What This Suite Covers

Automated end-to-end tests targeting [automationexercise.com](https://automationexercise.com), based on the 26 official test cases listed at `/test_cases`. Tests are written in TypeScript using Playwright's test runner with a Page Object Model (POM) architecture.

---

## Architecture Overview

### Page Object Model

Each page of the application has a corresponding class in `/pages`, extending `BasePage`. Page objects are responsible for two things only: locators and actions. Assertions live in test files, not page objects.

```
pages/
  base.page.ts          # shared goto(), common methods
  login.page.ts
  registration.page.ts
  products.page.ts
  home.page.ts
  ...
```

### Fixtures

Custom fixtures are defined in `fixtures/test-fixtures.ts`. This file exports a `test` object that replaces Playwright's default — all spec files import `test` and `expect` from here, not from `@playwright/test` directly.

```typescript
// correct
import { test, expect } from '../fixtures/test-fixtures';

// incorrect — custom fixtures won't be available
import { test, expect } from '@playwright/test';
```

This is the most common source of confusion when adding new spec files.

### Fixture Layers

Fixtures follow a deliberate separation of concerns:

- **Page object fixtures** (`loginPage`, `registrationPage` etc.) — construct and hand a page object to the test. Setup only, no assertions.
- **Data fixtures** (`randomUser`) — generate test data. No Playwright dependency, no actions.
- **Orchestration fixtures** (`registeredUser`) — perform actions before the test body runs (e.g. full registration flow). Teardown (account deletion) runs after `use()`.

```typescript
registeredUser: async ({ page, randomUser, registrationPage }, use) => {
    // setup — runs before test
    await page.goto('/login');
    // ... registration actions
    await use(randomUser); // test runs here
    // teardown — runs after test
    await registrationPage.registrationDeleteAccount.click();
}
```

### Utils

`utils/test-users.ts` contains two exports:

- `BaseUser` (class) — generates a random user with name, email, and password on instantiation. Used for registration tests and anywhere a disposable user is needed. No Playwright dependency — can be used outside a test context.
- `existingUser` (const) — static credentials for a known account. Plain object, no class needed. Used for login tests.

The distinction is intentional: `BaseUser` generates data, `existingUser` is just data.

---

## Key Decisions & Reasoning

### Ad Blocking

automationexercise.com runs Google AdSense ads that caused consistent test flakiness by redirecting the page URL mid-test (appending `/#google_vignette` or navigating away entirely). The fix is applied at the network level in the `page` fixture, blocking ad requests before they load:

```typescript
page: async ({ page }, use) => {
    await page.route('**/*doubleclick.net**', route => route.abort());
    await page.route('**/*googlesyndication.com**', route => route.abort());
    await page.route('**/*adtrafficquality.google**', route => route.abort());
    await page.route('**/*admaster.cc**', route => route.abort());
    await use(page);
},
```

Because this overrides the built-in `page` fixture, it applies automatically to every test and every page object without any additional configuration. This is the correct Playwright pattern for blocking third-party scripts that interfere with test execution.

### Base URL

`baseURL` is set in `playwright.config.ts`:

```typescript
use: {
    baseURL: 'https://www.automationexercise.com',
}
```

All `goto()` calls use relative paths (`'/login'`, `'/products'` etc.). Never hardcode the full URL in page objects or tests.

### Account Cleanup

Any test that creates a new user account is responsible for deleting it. This is handled in the `registeredUser` fixture teardown rather than in individual test files, so cleanup happens automatically for any test that uses that fixture.

For tests that register a user manually (not via the fixture), account deletion should be the final step before assertions end.

### Browser Behaviour Differences

The contact form (TC6) fires a browser `confirm()` dialog on submit. This dialog behaves inconsistently across browsers on this site — Chromium is least stable, WebKit most stable. This is a site-side issue, not a test issue. The dialog handler must be registered *before* the submit click, not after:

```typescript
page.once('dialog', async dialog => {
    await dialog.accept();
});
await homePage.contactUsSubmit.click();
```

TC6 also requires a file upload (step 7) — omitting this may affect whether the dialog fires.

### Color Assertions

Browsers normalise CSS colour values to `rgb()` format internally. `toHaveCSS('color', 'red')` will fail even when the element is visually red. Use the computed value:

```typescript
await expect(locator).toHaveCSS('color', 'rgb(255, 0, 0)');
```

To find the exact value Playwright sees, log the computed style:

```typescript
const color = await locator.evaluate(el => getComputedStyle(el).color);
console.log(color);
```

---

## Running Tests

```bash
# run all tests
npx playwright test

# run a specific file
npx playwright test tests/login.spec.ts

# run a specific test by name
npx playwright test -g "invalid login"

# run against a specific browser
npx playwright test --project=chromium

# run headed (visible browser)
npx playwright test --headed

# repeat each test N times (useful for verifying flakiness fixes)
npx playwright test --repeat-each=5

# view trace after a run
npx playwright show-report
```

---

## Debugging Flaky Tests

**Trace viewer** is the primary tool. Enable in `playwright.config.ts`:

```typescript
use: {
    trace: 'on-first-retry', // collect on failure
    // or
    trace: 'on',             // always collect
}
```

Then run and open the report:

```bash
npx playwright test --trace on -g "test name"
npx playwright show-report
```

The trace viewer shows a frame-by-frame timeline of every action, screenshot, and network request.

**For network-related flakiness**, listen to frame navigation:

```typescript
page.on('framenavigated', frame => {
    if (frame.url() !== 'about:blank' && frame !== page.mainFrame()) {
        console.log('frame navigated:', frame.url());
    }
});
```

This was used to diagnose and confirm the ad network domains that required blocking.

---

## Test Case Coverage Status

Based on the 26 official test cases at `/test_cases`:

| TC | Description | Status |
|----|-------------|--------|
| TC1 | Register User | ✅ |
| TC2 | Login with correct credentials | ✅ |
| TC3 | Login with incorrect credentials | ✅ |
| TC4 | Logout User | ✅ |
| TC5 | Register with existing email | ✅ |
| TC6 | Contact Us Form | ☑️ | - Flaky. See notes. 
| TC7 | Verify Test Cases page | ✅ |
| TC8 | View All Products + product detail | ✅ |
| TC9 | Search Product | ✅ | 
| TC10 | Subscription on home page | 🚧 In Progress |
| TC11 | Subscription on Cart page | 🚧 In Progress |
| TC12 | Add Products to Cart | 🚧 In Progress |
| TC13 | Verify Product quantity in Cart | 🚧 In Progress |
| TC14 | Place Order: Register while Checkout | — |
| TC15 | Place Order: Register before Checkout | — |
| TC16 | Place Order: Login before Checkout | — |
| TC17 | Remove Products from Cart | — |
| TC18 | View Category Products | — |
| TC19 | View & Cart Brand Products | — |
| TC20 | Search Products + verify Cart after Login | — |
| TC21 | Add review on product | — |
| TC22 | Add to Cart from Recommended Items | — |
| TC23 | Verify address details at Checkout | — |
| TC24 | Download Invoice after purchase | — |
| TC25 | Scroll Up using Arrow button | — |
| TC26 | Scroll Up without Arrow button | — |

Update this table as coverage grows.

---

## Known Issues & Notes

- **Ad interference** — resolved via `page.route()` blocking in the `page` fixture. If new ad domains cause flakiness in future, use `framenavigated` logging to identify them and add to the block list.
- **TC6 dialog inconsistency** — contact form confirm dialog fires inconsistently across browsers. Site-side behaviour, not a test bug. WebKit is most stable, Chromium least.
- **`BaseUser` string length** — `Math.random().toString(36)` produces a maximum of ~11 characters. `createName(length)` will silently return fewer characters than requested if `length` exceeds that. Not an issue at the default of 8.
- **Password complexity** — generated passwords follow the pattern `Xxxxxxxx1!` (capitalised first letter, alphanumeric body, number and symbol suffix) to satisfy the site's validation rules.