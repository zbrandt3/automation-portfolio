# QA Automation Portfolio

A collection of automated test suites across multiple frameworks and target applications,
built to demonstrate test automation engineering practices: Page Object Model architecture,
fixture-based test design, API testing, and CI/CD integration.

## Frameworks

| Framework | Language | Target Site(s) | Focus | Status |
|---|---|---|---|---|
| [Playwright](./playwright-ts) | TypeScript | site: automationexercise.com | UI + API | In progress |
| [Selenium](./selenium-python) | Python | site: saucedemo.com | UI | Planned |
| [Cypress](./cypress) | JavaScript | site: automationexercise.com | UI | Planned |
| [Postman/Newman](./postman) | — | restful-booker | API | Planned |

Each framework folder has its own README covering setup, architecture, and how to run its tests.
To start, I will showcase different sites for each framework, selected to be best suited for each framework. 
It will also prevent a lot of reused data making each feel more from scratch. 

## What this portfolio demonstrates

- **Page Object Model** — locators and page interactions are separated from test logic,
  so UI changes require updates in one place rather than across every test file
- **Fixture-based test architecture** — custom fixtures (Playwright) and shared setup/teardown
  patterns (Selenium/pytest) used to inject dependencies instead of duplicating setup code
- **API testing** alongside UI testing, validating both the interface and the underlying contract
- **CI/CD integration** — test suites run automatically via GitHub Actions on every push
- **Test data management** — credentials and fixtures kept out of test logic, isolated in
  dedicated config/data files

## Why multiple frameworks

Most QA automation portfolios show one tool. I wanted to show I understand the *tradeoffs*
between tools, not just one syntax — e.g., Playwright's native multi-tab and API testing
support vs. Cypress's in-browser execution model, or where a Selenium-based stack still makes
sense in legacy/enterprise environments. Each framework README briefly notes why that tool fits
its use case.

## Setup

Each framework is self-contained with its own dependencies. See the individual README in each
folder for exact setup and run instructions. General prerequisites:

- Node.js (for Playwright, Cypress)
- Python 3.x (for Selenium)
- See each subfolder for framework-specific install steps

## About me

QA Engineer looking to expand my current knowledge of automation frameworks in order to work
within each and understand the pros and cons of each. 