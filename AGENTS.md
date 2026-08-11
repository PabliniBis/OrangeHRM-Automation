# OrangeHRM Playwright Automation

## Project Purpose

This project is an automated UI testing framework for the OrangeHRM demo application.

The main goal is to demonstrate maintainable test automation practices using Playwright, TypeScript, and Page Object Model.

The framework should remain simple, readable, scalable, and easy to debug.

## Technology Stack

* Playwright
* TypeScript
* Playwright Test
* Node.js
* npm
* Visual Studio Code

## Architecture

Use the following project structure:

* `tests/` — Test scenarios and assertions.
* `pages/` — Page Object Model classes.
* `fixtures/` — Custom Playwright fixtures.
* `data/` — Static test data.
* `utils/` — Reusable utilities such as dynamic test data generation.

Do not create additional architectural layers unless there is a clear need.

## Page Object Model Rules

Page Objects must:

* Encapsulate page locators.
* Encapsulate reusable UI interactions.
* Represent application pages or significant application areas.
* Receive Playwright `Page` through their constructor.
* Keep methods small and focused.
* Use descriptive method and locator names.

Page Objects should describe how to interact with the application.

Tests should describe what behavior is being validated.

## Assertions

Keep business and test assertions inside test files whenever possible.

Prefer:

```typescript
await loginPage.login(username, password);

await expect(dashboardPage.dashboardTitle).toBeVisible();
```

Avoid hiding important validations inside Page Object methods such as:

```typescript
await loginPage.validateSuccessfulLogin();
```

unless there is a specific reason for doing so.

## Locator Strategy

Prefer Playwright user-facing locators in this order when appropriate:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. Stable CSS locators

Use XPath only when a reliable Playwright locator cannot reasonably be used.

Avoid selectors that depend on fragile DOM structure.

## Waiting Strategy

Do not use arbitrary static waits such as:

```typescript
page.waitForTimeout()
```

Use Playwright auto-waiting, assertions, locators, or explicit state-based waits instead.

## Test Independence

Tests must be independent whenever possible.

A test should not depend on another test having executed successfully before it.

Do not rely on execution order.

## Test Data

Static reusable test data belongs in:

```text
data/
```

Dynamic or unique test data generation belongs in:

```text
utils/
```

Avoid hardcoding test data repeatedly inside tests.

## Credentials and Configuration

Do not hardcode credentials or environment-specific values inside tests or Page Objects.

Sensitive values must be loaded from environment variables.

Do not commit `.env` files containing credentials.

## Framework Simplicity

Do not introduce unnecessary abstractions.

Specifically:

* Do not create a `BasePage` unless real duplicated behavior justifies it.
* Do not create generic wrappers around Playwright methods such as `click()`, `fill()`, or `locator()` without a clear benefit.
* Do not create unnecessary interfaces, managers, factories, or helper layers.
* Do not add third-party dependencies unless they solve a specific project requirement.

Prefer native Playwright functionality when available.

## Coding Style

Use:

* Clear and descriptive names.
* Small focused methods.
* TypeScript types when useful.
* `async/await`.
* Consistent formatting.
* Simple readable implementations.

Avoid:

* Overengineering.
* Large methods.
* Duplicate code.
* Unnecessary comments explaining obvious code.
* Complex abstractions without demonstrated need.

## Test Naming

Test names should describe expected behavior.

Prefer:

```typescript
test('should login with valid credentials', ...)
```

instead of:

```typescript
test('TC01', ...)
```

Test case IDs may be included when useful, but should not replace descriptive names.

## Debugging

When fixing a failing test:

1. Identify the actual cause of failure.
2. Do not immediately increase timeouts.
3. Verify locator stability.
4. Verify application state.
5. Verify test data.
6. Use Playwright trace, screenshots, video, or debug mode when necessary.
7. Apply the smallest maintainable correction.

Do not hide flaky behavior with arbitrary waits or excessive retries.

## Changes Made by Codex

Before making significant architectural changes:

* Inspect the existing project structure.
* Follow existing conventions.
* Explain why a new abstraction or dependency is necessary.
* Prefer modifying existing components over creating unnecessary new ones.

Do not restructure the framework unless explicitly requested or clearly justified.

## Definition of Done

A test automation change is complete when:

* The code follows the current architecture.
* Tests are readable.
* Tests are independent where possible.
* Locators are stable.
* No arbitrary waits were introduced.
* No credentials were hardcoded.
* Relevant tests execute successfully.
* Existing tests remain functional.
