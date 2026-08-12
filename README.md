# OrangeHRM Playwright Automation

## Project Overview

This project is based on the OrangeHRM demo application. It uses Playwright and TypeScript to test different functionalities in the platform.

My main goal was to use a simple framework based on POM that was readable and easy to maintain, while keeping QA Automation best practices like fixtures, reusability, independent tests, and tagged test execution.

The current tests cover login, logout, navigation to PIM, employee creation, employee search, and negative scenarios.

## Technologies

* Playwright
* TypeScript
* Node.js
* npm
* dotenv
* Chromium

## Project Structure

```text
.
├── data/
│   └── users.ts
├── fixtures/
│   └── app.fixture.ts
├── pages/
│   ├── dashboard.page.ts
│   ├── employee-details.page.ts
│   ├── login.page.ts
│   └── pim.page.ts
├── tests/
│   ├── employee.spec.ts
│   └── login.spec.ts
├── utils/
│   └── data-generator.ts
├── .env.example
├── AGENTS.md
├── package.json
└── playwright.config.ts
```

The main folders are separated by responsibility:

* `pages/` contains the Page Objects and reusable actions.
* `fixtures/` creates the Page Objects used by the tests.
* `tests/` contains the scenarios and assertions.
* `data/` contains static test data.
* `utils/` contains reusable utilities like the employee data generator.

## Setup

Install the project dependencies:

```bash
npm install
```

Install Chromium for Playwright:

```bash
npx playwright install chromium
```

Create a `.env` file using `.env.example` as reference:

```env
BASE_URL=https://your-orangehrm-demo-url
ORANGEHRM_USERNAME=your_username
ORANGEHRM_PASSWORD=your_password
```

The real `.env` file is ignored by Git, so credentials are not stored in the repository.

## Running the Tests

I added npm scripts to make running the tests easier for anyone using the project.

Run all tests:

```bash
npm test
```

Run the different groups of scenarios:

```bash
npm run test:smoke
npm run test:regression
npm run test:negative
npm run test:e2e
```

Run the tests with the browser visible:

```bash
npm run test:headed
```

Open Playwright UI Mode:

```bash
npm run test:ui
```

Run in debug mode:

```bash
npm run test:debug
```

Open the HTML report:

```bash
npm run report
```

## Test Scenarios

### Login

* Login with valid credentials.
* Login with invalid credentials.
* Validate required fields when credentials are empty.
* Logout successfully and return to the login page.

### Employee Management

* Navigate from Dashboard to PIM.
* Create a new employee.
* Validate the saved First Name, Last Name, and Employee ID.
* Search for the employee using the generated Employee ID.
* Validate the employee in the results.
* Search for a nonexistent employee and validate `No Records Found`.

The suite currently has 7 automated tests.

## Test Tags

The tests are divided using Playwright tags:

* `@smoke`
* `@regression`
* `@negative`
* `@e2e`

This makes it easier to run only the scenarios needed for a specific execution.

For example:

```bash
npm run test:smoke
```

runs only the smoke scenarios.

## Test Data

OrangeHRM Demo is a shared environment, so depending on employees that already exist could make the tests unstable.

For that reason, employee data is generated during the execution using Node.js `randomUUID()`.

For example:

```text
First Name: Auto
Last Name: Employeea42f18bc
Employee ID: Ea42f18bc
```

The generated data is used in the same test to create the employee, validate the saved information, and search for it afterward.

This also helps keep the scenario independent from other tests.

## Technical Decisions

### Page Object Model

I used POM to keep locators and reusable UI actions outside the test files.

Assertions stay in the tests because I wanted the test itself to clearly show what is being validated.

I did not add a `BasePage` because there was no real shared behavior that required another abstraction layer.

### Fixtures

Custom Playwright fixtures are used to create the different Page Objects:

* `LoginPage`
* `DashboardPage`
* `PimPage`
* `EmployeeDetailsPage`

This avoids creating the same objects manually in every test.

### Locator Strategy

OrangeHRM Demo has some inconsistencies in the way elements can be located, which reflects real applications appropriately.

For that reason, I used different locator strategies, giving preference to user-facing Playwright locators when applicable:

```typescript
page.getByRole(...)
page.getByPlaceholder(...)
page.getByText(...)
```

For some fields, OrangeHRM does not expose a reliable accessible relationship between the visible label and the input.

For example, this locator did not work for Employee ID:

```typescript
page.getByLabel('Employee Id')
```

Instead of using a position-based locator like:

```typescript
page.getByRole('textbox').nth(4)
```

I used a scoped locator:

```typescript
page
  .locator('.oxd-input-group')
  .filter({ has: page.getByText('Employee Id', { exact: true }) })
  .locator('input');
```

I preferred this approach because `nth()` depends on the position of the element in the DOM and could break if another field is added before it.

### No Records Found

During the full regression execution, the negative employee search test found another locator issue.

OrangeHRM displays `No Records Found` twice:

* as a temporary toast message;
* as the persistent result of the search.

A generic locator matched both elements and caused a Playwright strict mode error:

```typescript
page.getByText('No Records Found', { exact: true })
```

The locator was changed to target the persistent message:

```typescript
page
  .locator('span.oxd-text--span')
  .filter({ hasText: /^No Records Found$/ });
```

This was also a good example of why running the complete suite is important. The test had passed individually before the duplicated element was detected during the regression run.

### Waiting Strategy

The project does not use `waitForTimeout()` to solve synchronization problems.

I used Playwright auto-waiting and web-first assertions instead, and when a test failed because of a locator, the locator was corrected instead of increasing the timeout.

## Notes

* OrangeHRM is a shared public demo environment.
* Existing data and response times can change.
* Employee creation modifies data in the shared environment.
* Unique Employee IDs reduce the possibility of collisions between executions.
* The tests are designed not to depend on execution order.
* The project currently runs on Chromium.
* CI/CD has not been added yet.