# Playwright Automation Framework with Cucumber BDD

This project is a Playwright-based automation framework integrated with Cucumber BDD. It supports modular design, environment switching, responsive views, tag-based execution, parallel execution, and cloud execution (e.g., Sauce Labs).

---

## Project Structure

```
/Users/divyasai/Desktop/latestPlaywright
├── config
│   └── playwright.config.ts       # Playwright configuration file
├── features
│   └── sample.feature             # Cucumber feature files
├── step-definitions
│   ├── sample.steps.ts            # Step definitions for feature files
│   └── hooks.ts                   # Cucumber hooks for setup and teardown
├── utils
│   ├── EnvironmentConfig.ts       # Centralized environment URL management
│   ├── BrowserFactory.ts          # Centralized browser launching logic
│   └── pageFixture.ts             # Shared page and context management
├── reports
│   └── (Generated reports)        # HTML reports generated after test execution
├── cucumber.js                    # Cucumber configuration file (control center)
└── control.js                     # (Deprecated) Control logic moved to cucumber.js
```

---

## Key Features

1. **Playwright Integration**:
   - Supports Chromium, Firefox, and WebKit browsers.
   - Configurable via `playwright.config.ts`.

2. **Cucumber BDD**:
   - Write tests in Gherkin syntax.
   - Step definitions implemented in TypeScript.

3. **Environment Switching**:
   - Centralized in `EnvironmentConfig.ts`.
   - Supports `sit`, `qa`, and `uat` environments.

4. **Responsive Views**:
   - Controlled via the `RESPONSIVE` environment variable.

5. **Tag-Based Execution**:
   - Filter scenarios by tags using the `TAGS` environment variable.

6. **Parallel Execution**:
   - Controlled via the `PARALLEL` environment variable.

7. **Cloud Execution**:
   - Supports Sauce Labs integration via the `EXECUTION=cloud` environment variable.

8. **Reports**:
   - HTML reports generated in the `/reports` folder.

---

## Configuration

### `playwright.config.ts`

- **Purpose**:
  - Configures Playwright settings such as retries, timeouts, and browser projects.
- **Key Features**:
  - Supports multiple browsers (`chromium`, `firefox`, `webkit`).
  - Generates HTML reports in the `/reports/playwright-html` folder.

---

### `cucumber.js`

- **Purpose**:
  - Acts as the control center for the framework.
- **Key Features**:
  - Controls browser selection (`BROWSER` environment variable).
  - Filters scenarios by tags (`TAGS` environment variable).
  - Specifies feature file paths (`FEATURE` environment variable).
  - Enables parallel execution (`PARALLEL` environment variable).
  - Supports responsive views (`RESPONSIVE` environment variable).
  - Enables cloud execution (e.g., Sauce Labs) via `EXECUTION=cloud`.

---

## Usage

### Install Dependencies

Run the following command to install all required dependencies:
```bash
npm install
```

### Run Tests

1. **Run All Tests**:
   ```bash
   npx cucumber-js
   ```

2. **Run a Specific Feature File**:
   ```bash
   FEATURE=./features/sample.feature npx cucumber-js
   ```

3. **Run Scenarios with Specific Tags**:
   ```bash
   TAGS=@smoke npx cucumber-js
   ```

4. **Enable Parallel Execution**:
   ```bash
   PARALLEL=2 npx cucumber-js
   ```

5. **Run Tests in Responsive Mode**:
   ```bash
   RESPONSIVE=true npx cucumber-js
   ```

6. **Run Tests on Cloud (Sauce Labs)**:
   ```bash
   EXECUTION=cloud SAUCE_USERNAME=<username> SAUCE_ACCESS_KEY=<access_key> npx cucumber-js
   ```

---

## Writing Tests

1. **Feature File**:
   Write Gherkin scenarios in `.feature` files under the `/features` folder. Example:
   ```gherkin
   @smoke @env:qa
   Feature: Sample Feature

     Scenario Outline: Open a webpage in a specific environment
       Given I navigate to "<path>" in "<env>" environment

       Examples:
         | path      | env  |
         | /home     | qa   |
         | /about    | prod |
         | /contact  | sit  |
   ```

2. **Step Definitions**:
   Implement step definitions in `.ts` files under the `/step-definitions` folder. Example:
   ```typescript
   import { Given } from '@cucumber/cucumber';
   import { BasePage } from '../page-objects/BasePage';
   import { EnvironmentConfig } from '../utils/EnvironmentConfig';

   Given('I navigate to {string} in {string} environment', async function (path: string, env: string) {
     const baseURL = EnvironmentConfig.getBaseURL(env);
     const fullURL = `${baseURL}${path}`;
     const basePage = new BasePage(this.page);
     await basePage.navigateTo(fullURL);
   });
   ```

---

## Debugging Common Issues

1. **Undefined Steps**:
   - Ensure the step text in the `.feature` file matches the step definition exactly.
   - Verify the `cucumber.js` file is correctly configured to load step definitions.

2. **Browser Not Launching**:
   - Check the `BROWSER` environment variable.
   - Ensure the `projects` array in `playwright.config.ts` is correctly configured.

3. **Network Issues**:
   - Verify internet connectivity.
   - Configure proxy settings if required.

---

## Reports

After running tests, HTML reports are generated in the `/reports` folder. Open the report in a browser to view detailed results.

---

## Dependencies

- [Playwright](https://playwright.dev/)
- [Cucumber](https://cucumber.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sauce Labs](https://saucelabs.com/) (Optional for cloud execution)

---

## Contributing

Feel free to submit issues or pull requests to improve this framework.

---

