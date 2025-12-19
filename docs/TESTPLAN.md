# School Account Management System - Test Plan

## Document Information

**Project:** School Account Management System  
**Document Version:** 1.0  
**Source Document:** docs/SPECIFICATION.md  
**Purpose:** Validate all system behavior documented in the specification  
**Target Implementation:** Node.js application  

---

## Test Approach

This test plan is derived entirely from the system specification (docs/SPECIFICATION.md) and validates all documented business rules, operations, and user interface flows. Each test case references the specific requirement it validates.

---

## Test Case Summary

| Category | Test Count |
|----------|-----------|
| Business Rules | 8 |
| View Balance Operation | 2 |
| Credit Account Operation | 7 |
| Debit Account Operation | 11 |
| Menu Navigation & UI | 5 |
| **Total** | **33** |

---

## Test Cases

### Category 1: Business Rules

#### Test Case: BR-001

| Field | Value |
|-------|-------|
| **Test Case ID** | BR-001 |
| **Test Case Description** | Verify initial account balance is $1,000.00 (Business Rule 1) |
| **Pre-conditions** | New account is created or system is initialized |
| **Test Steps** | 1. Initialize the system<br>2. View the account balance |
| **Expected Result** | Balance displays as $1,000.00 |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Business Rule 1 - Initial Account Balance |

---

#### Test Case: BR-002

| Field | Value |
|-------|-------|
| **Test Case ID** | BR-002 |
| **Test Case Description** | Verify debit is rejected when amount exceeds balance (Business Rule 2) |
| **Pre-conditions** | Account balance is $50.00 |
| **Test Steps** | 1. Select Debit Account operation<br>2. Enter debit amount: $75.00<br>3. Observe result |
| **Expected Result** | Transaction is rejected<br>Balance remains $50.00<br>Error message: "Insufficient funds for this debit." |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Business Rule 2 - Insufficient Funds Prevention |

---

#### Test Case: BR-003

| Field | Value |
|-------|-------|
| **Test Case ID** | BR-003 |
| **Test Case Description** | Verify debit is rejected on zero balance (Business Rule 2 - Edge Case) |
| **Pre-conditions** | Account balance is $0.00 |
| **Test Steps** | 1. Select Debit Account operation<br>2. Enter debit amount: $10.00<br>3. Observe result |
| **Expected Result** | Transaction is rejected<br>Balance remains $0.00<br>Error message: "Insufficient funds for this debit." |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Business Rule 2 - Edge Case: Zero balance |

---

#### Test Case: BR-004

| Field | Value |
|-------|-------|
| **Test Case ID** | BR-004 |
| **Test Case Description** | Verify exact balance debit is allowed (Business Rule 2 - Edge Case) |
| **Pre-conditions** | Account balance is $500.00 |
| **Test Steps** | 1. Select Debit Account operation<br>2. Enter debit amount: $500.00<br>3. Observe result |
| **Expected Result** | Transaction is accepted<br>New balance is $0.00<br>Success message displayed |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Business Rule 2 - Edge Case: Exact balance debit |

---

#### Test Case: BR-005

| Field | Value |
|-------|-------|
| **Test Case ID** | BR-005 |
| **Test Case Description** | Verify debit just over balance is rejected (Business Rule 2 - Edge Case) |
| **Pre-conditions** | Account balance is $50.00 |
| **Test Steps** | 1. Select Debit Account operation<br>2. Enter debit amount: $50.01<br>3. Observe result |
| **Expected Result** | Transaction is rejected<br>Balance remains $50.00<br>Error message: "Insufficient funds for this debit." |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Business Rule 2 - Edge Case: Just over balance |

---

#### Test Case: BR-006

| Field | Value |
|-------|-------|
| **Test Case ID** | BR-006 |
| **Test Case Description** | Verify credit transactions are accepted (Business Rule 3) |
| **Pre-conditions** | Account has any valid balance |
| **Test Steps** | 1. Note current balance<br>2. Select Credit Account operation<br>3. Enter a credit amount (e.g., $100.00)<br>4. Observe result |
| **Expected Result** | Transaction is accepted<br>New balance = old balance + credit amount<br>Success message displayed |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Business Rule 3 - Unlimited Credit Acceptance |

---

#### Test Case: BR-007

| Field | Value |
|-------|-------|
| **Test Case ID** | BR-007 |
| **Test Case Description** | Verify balance calculations maintain 2 decimal places (Business Rule 4) |
| **Pre-conditions** | Account balance is $100.00 |
| **Test Steps** | 1. Credit account with $25.50<br>2. View balance<br>3. Debit account with $10.25<br>4. View balance |
| **Expected Result** | After credit: $125.50<br>After debit: $115.25<br>All balances show exactly 2 decimal places |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Business Rule 4 - Balance Calculation Accuracy |

---

#### Test Case: BR-008

| Field | Value |
|-------|-------|
| **Test Case ID** | BR-008 |
| **Test Case Description** | Verify no rounding errors accumulate over multiple transactions (Business Rule 4) |
| **Pre-conditions** | Account balance is $1,000.00 |
| **Test Steps** | 1. Debit $33.33<br>2. Debit $33.33<br>3. Debit $33.34<br>4. View balance<br>5. Verify sum equals $100.00 |
| **Expected Result** | Final balance is $900.00<br>No accumulated rounding errors<br>All intermediate balances accurate to 2 decimals |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Business Rule 4 - No rounding error accumulation |

---

### Category 2: View Balance Operation

#### Test Case: OP-VIEW-001

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-VIEW-001 |
| **Test Case Description** | Verify View Balance displays current balance correctly |
| **Pre-conditions** | Account balance is $1,000.00 |
| **Test Steps** | 1. Select option 1 (View Balance) from menu<br>2. Observe displayed balance |
| **Expected Result** | Message displays: "Current balance: 1000.00"<br>Balance shown with 2 decimal places<br>Returns to main menu |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 1 - View Balance |

---

#### Test Case: OP-VIEW-002

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-VIEW-002 |
| **Test Case Description** | Verify View Balance reflects changes after transactions |
| **Pre-conditions** | Account balance is $1,000.00 |
| **Test Steps** | 1. Credit account with $250.00<br>2. View balance<br>3. Debit account with $100.00<br>4. View balance |
| **Expected Result** | After credit: displays $1,250.00<br>After debit: displays $1,150.00<br>Balance accurately reflects all transactions |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates data persistence and Operation 1 |

---

### Category 3: Credit Account Operation

#### Test Case: OP-CREDIT-001

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-CREDIT-001 |
| **Test Case Description** | Verify successful credit transaction adds to balance |
| **Pre-conditions** | Account balance is $1,000.00 |
| **Test Steps** | 1. Select option 2 (Credit Account)<br>2. Enter credit amount: $250.00<br>3. Observe result |
| **Expected Result** | Message displays: "Amount credited. New balance: 1250.00"<br>Balance is updated to $1,250.00<br>Returns to main menu |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 2 - Credit Account (Example Scenario 1) |

---

#### Test Case: OP-CREDIT-002

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-CREDIT-002 |
| **Test Case Description** | Verify credit with decimal amounts |
| **Pre-conditions** | Account balance is $500.50 |
| **Test Steps** | 1. Select Credit Account<br>2. Enter credit amount: $100.25<br>3. Observe result |
| **Expected Result** | Message displays: "Amount credited. New balance: 600.75"<br>Decimal precision maintained |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 2 - Credit Account (Example Scenario 2) |

---

#### Test Case: OP-CREDIT-003

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-CREDIT-003 |
| **Test Case Description** | Verify credit on zero balance |
| **Pre-conditions** | Account balance is $0.00 |
| **Test Steps** | 1. Select Credit Account<br>2. Enter credit amount: $1,000.00<br>3. Observe result |
| **Expected Result** | Message displays: "Amount credited. New balance: 1000.00"<br>Balance updated from $0.00 to $1,000.00 |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 2 - Credit Account (Example Scenario 3) |

---

#### Test Case: OP-CREDIT-004

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-CREDIT-004 |
| **Test Case Description** | Verify credit transaction persistence |
| **Pre-conditions** | Account balance is $1,000.00 |
| **Test Steps** | 1. Credit account with $50.00<br>2. View balance<br>3. Perform another operation (e.g., view balance again)<br>4. Verify balance still reflects credit |
| **Expected Result** | Balance remains $1,050.00 across multiple operations<br>Credit is permanent within session |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 2 - Success Criteria (permanent transaction) |

---

#### Test Case: OP-CREDIT-005

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-CREDIT-005 |
| **Test Case Description** | Verify credit amount prompt is displayed |
| **Pre-conditions** | System is at main menu |
| **Test Steps** | 1. Select option 2 (Credit Account)<br>2. Observe system prompt |
| **Expected Result** | System displays: "Enter credit amount:" |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 2 - System Processing step 1 |

---

#### Test Case: OP-CREDIT-006

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-CREDIT-006 |
| **Test Case Description** | Verify large credit amount within maximum limit |
| **Pre-conditions** | Account balance is $0.00 |
| **Test Steps** | 1. Select Credit Account<br>2. Enter credit amount: $999,999.99<br>3. Observe result |
| **Expected Result** | Transaction accepted<br>Balance updated to $999,999.99<br>Success message displayed |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates maximum balance storage capacity |

---

#### Test Case: OP-CREDIT-007

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-CREDIT-007 |
| **Test Case Description** | Verify credit returns to menu after completion |
| **Pre-conditions** | System is ready for credit operation |
| **Test Steps** | 1. Complete a credit transaction<br>2. Observe what happens after success message |
| **Expected Result** | System returns to main menu<br>Menu options are displayed again |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 2 & UI Flow - Menu Navigation Rules |

---

### Category 4: Debit Account Operation

#### Test Case: OP-DEBIT-001

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-DEBIT-001 |
| **Test Case Description** | Verify successful debit with sufficient funds |
| **Pre-conditions** | Account balance is $1,000.00 |
| **Test Steps** | 1. Select option 3 (Debit Account)<br>2. Enter debit amount: $250.00<br>3. Observe result |
| **Expected Result** | Message displays: "Amount debited. New balance: 750.00"<br>Balance updated to $750.00<br>Returns to main menu |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 3 - Example Scenario (Sufficient funds) |

---

#### Test Case: OP-DEBIT-002

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-DEBIT-002 |
| **Test Case Description** | Verify exact balance debit results in zero balance |
| **Pre-conditions** | Account balance is $500.00 |
| **Test Steps** | 1. Select Debit Account<br>2. Enter debit amount: $500.00<br>3. Observe result |
| **Expected Result** | Message displays: "Amount debited. New balance: 0.00"<br>Balance updated to $0.00 |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 3 - Example Scenario (Exact balance debit) |

---

#### Test Case: OP-DEBIT-003

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-DEBIT-003 |
| **Test Case Description** | Verify debit rejected with insufficient funds |
| **Pre-conditions** | Account balance is $50.00 |
| **Test Steps** | 1. Select Debit Account<br>2. Enter debit amount: $75.00<br>3. Observe result |
| **Expected Result** | Message displays: "Insufficient funds for this debit."<br>Balance remains $50.00<br>Returns to main menu |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 3 - Example Scenario (Insufficient funds) |

---

#### Test Case: OP-DEBIT-004

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-DEBIT-004 |
| **Test Case Description** | Verify debit rejected on zero balance |
| **Pre-conditions** | Account balance is $0.00 |
| **Test Steps** | 1. Select Debit Account<br>2. Enter debit amount: $10.00<br>3. Observe result |
| **Expected Result** | Message displays: "Insufficient funds for this debit."<br>Balance remains $0.00 |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 3 - Example Scenario (Zero balance debit) |

---

#### Test Case: OP-DEBIT-005

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-DEBIT-005 |
| **Test Case Description** | Verify debit with decimal amounts maintains accuracy |
| **Pre-conditions** | Account balance is $100.00 |
| **Test Steps** | 1. Select Debit Account<br>2. Enter debit amount: $25.50<br>3. Observe result |
| **Expected Result** | Message displays: "Amount debited. New balance: 74.50"<br>Decimal precision maintained |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 3 - Example Scenario (Decimal accuracy) |

---

#### Test Case: OP-DEBIT-006

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-DEBIT-006 |
| **Test Case Description** | Verify debit amount prompt is displayed |
| **Pre-conditions** | System is at main menu |
| **Test Steps** | 1. Select option 3 (Debit Account)<br>2. Observe system prompt |
| **Expected Result** | System displays: "Enter debit amount:" |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 3 - System Processing step 1 |

---

#### Test Case: OP-DEBIT-007

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-DEBIT-007 |
| **Test Case Description** | Verify balance unchanged after insufficient funds rejection |
| **Pre-conditions** | Account balance is $50.00 |
| **Test Steps** | 1. Attempt debit of $75.00 (should fail)<br>2. View balance<br>3. Verify balance unchanged |
| **Expected Result** | Balance remains exactly $50.00<br>No partial debit occurred |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 3 - System Processing step 6 (balance NOT modified) |

---

#### Test Case: OP-DEBIT-008

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-DEBIT-008 |
| **Test Case Description** | Verify successful debit transaction persistence |
| **Pre-conditions** | Account balance is $1,000.00 |
| **Test Steps** | 1. Debit account with $100.00<br>2. View balance<br>3. Perform another operation<br>4. View balance again |
| **Expected Result** | Balance remains $900.00 across multiple operations<br>Debit is permanent within session |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 3 - Success Criteria (permanent transaction) |

---

#### Test Case: OP-DEBIT-009

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-DEBIT-009 |
| **Test Case Description** | Verify debit validation occurs before balance modification |
| **Pre-conditions** | Account balance is $50.00 |
| **Test Steps** | 1. Select Debit Account<br>2. Enter debit amount: $60.00<br>3. Observe system behavior |
| **Expected Result** | System checks balance >= amount BEFORE modifying balance<br>Transaction rejected<br>Balance never changes from $50.00 |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Operation 3 - System Processing steps 4-6 (validation order) |

---

#### Test Case: OP-DEBIT-010

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-DEBIT-010 |
| **Test Case Description** | Verify debit returns to menu after successful transaction |
| **Pre-conditions** | Account balance is $1,000.00 |
| **Test Steps** | 1. Complete a successful debit transaction<br>2. Observe what happens after success message |
| **Expected Result** | System returns to main menu<br>Menu options are displayed again |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: UI Flow - Option 3 step 5 |

---

#### Test Case: OP-DEBIT-011

| Field | Value |
|-------|-------|
| **Test Case ID** | OP-DEBIT-011 |
| **Test Case Description** | Verify debit returns to menu after insufficient funds rejection |
| **Pre-conditions** | Account balance is $50.00 |
| **Test Steps** | 1. Attempt a debit of $75.00 (insufficient funds)<br>2. Observe what happens after error message |
| **Expected Result** | System returns to main menu<br>Menu options are displayed again |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: UI Flow - Option 3 step 5 (error case) |

---

### Category 5: Menu Navigation & User Interface

#### Test Case: UI-MENU-001

| Field | Value |
|-------|-------|
| **Test Case ID** | UI-MENU-001 |
| **Test Case Description** | Verify main menu displays all required options |
| **Pre-conditions** | System is running |
| **Test Steps** | 1. Start the system or return to menu<br>2. Observe menu display |
| **Expected Result** | Menu displays with format:<br>- Header line: "--------------------------------"<br>- "Account Management System"<br>- "1. View Balance"<br>- "2. Credit Account"<br>- "3. Debit Account"<br>- "4. Exit"<br>- Footer line: "--------------------------------"<br>- Prompt: "Enter your choice (1-4):" |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: User Interface Flow - Main Menu Display Format |

---

#### Test Case: UI-MENU-002

| Field | Value |
|-------|-------|
| **Test Case ID** | UI-MENU-002 |
| **Test Case Description** | Verify menu loop continues until user exits |
| **Pre-conditions** | System is at main menu |
| **Test Steps** | 1. Select option 1 (View Balance)<br>2. Verify return to menu<br>3. Select option 2 (Credit)<br>4. Complete credit operation<br>5. Verify return to menu<br>6. Select option 3 (Debit)<br>7. Complete debit operation<br>8. Verify return to menu |
| **Expected Result** | After each operation, system returns to main menu<br>Menu continues to loop until exit selected |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: UI Flow - Menu Navigation Rules |

---

#### Test Case: UI-MENU-003

| Field | Value |
|-------|-------|
| **Test Case ID** | UI-MENU-003 |
| **Test Case Description** | Verify invalid menu choice handling |
| **Pre-conditions** | System displays main menu |
| **Test Steps** | 1. Enter an invalid choice (e.g., 5, 0, 99)<br>2. Observe system response |
| **Expected Result** | System displays: "Invalid choice, please select 1-4."<br>System returns to main menu (remains in loop)<br>System does NOT exit or crash |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: UI Flow - Invalid Option Handling |

---

#### Test Case: UI-MENU-004

| Field | Value |
|-------|-------|
| **Test Case ID** | UI-MENU-004 |
| **Test Case Description** | Verify exit functionality (Option 4) |
| **Pre-conditions** | System is at main menu |
| **Test Steps** | 1. Select option 4 (Exit)<br>2. Observe system behavior |
| **Expected Result** | System displays: "Exiting the program. Goodbye!"<br>System terminates/session ends |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: UI Flow - Option 4: Exit |

---

#### Test Case: UI-MENU-005

| Field | Value |
|-------|-------|
| **Test Case ID** | UI-MENU-005 |
| **Test Case Description** | Verify exit is only triggered by explicit selection |
| **Pre-conditions** | System is running |
| **Test Steps** | 1. Perform multiple operations (view, credit, debit)<br>2. Verify system continues running<br>3. Only exit when option 4 is selected |
| **Expected Result** | System continues to run and display menu after every operation<br>System only terminates when user explicitly selects option 4 |
| **Actual Result** | _(To be filled during test execution)_ |
| **Status** | _(Pass/Fail)_ |
| **Comments** | Validates Specification: Session Management - continuous session until explicit exit |

---

## Test Execution Instructions

### For Manual Testing:
1. Execute each test case in order within each category
2. Fill in the "Actual Result" column with observed behavior
3. Mark "Status" as Pass if actual result matches expected result, otherwise Fail
4. Record any deviations or additional observations in "Comments"

### For Automated Testing (Node.js):
1. Each test case should be implemented as a unit or integration test
2. Test Case ID should be used as the test name/identifier
3. Pre-conditions should be set up in test setup/beforeEach blocks
4. Test Steps should be implemented as the test body
5. Expected Results should be asserted using appropriate assertion library
6. All tests should be independent and repeatable

---

## Test Data Requirements

| Data Element | Values Needed |
|--------------|---------------|
| Valid balances | $0.00, $50.00, $100.00, $500.00, $500.50, $1000.00, $999,999.99 |
| Valid credit amounts | $10.00, $50.00, $100.00, $100.25, $250.00, $666.00, $1000.00, $999,999.99 |
| Valid debit amounts | $10.00, $25.50, $33.33, $33.34, $50.00, $50.01, $75.00, $100.00, $250.00, $500.00 |
| Invalid menu choices | 0, 5, 99, letters, special characters |
| Edge case amounts | $0.00, $0.01, exact balance, balance + $0.01, $999,999.99 |

---

## Traceability Matrix

| Specification Section | Related Test Cases |
|-----------------------|-------------------|
| Business Rule 1: Initial Balance | BR-001 |
| Business Rule 2: Insufficient Funds | BR-002, BR-003, BR-004, BR-005, OP-DEBIT-003, OP-DEBIT-004, OP-DEBIT-007, OP-DEBIT-009, OP-DEBIT-011 |
| Business Rule 3: Unlimited Credit | BR-006, OP-CREDIT-001 through OP-CREDIT-007 |
| Business Rule 4: Calculation Accuracy | BR-007, BR-008, OP-CREDIT-002, OP-DEBIT-005 |
| Operation 1: View Balance | OP-VIEW-001, OP-VIEW-002 |
| Operation 2: Credit Account | OP-CREDIT-001 through OP-CREDIT-007 |
| Operation 3: Debit Account | OP-DEBIT-001 through OP-DEBIT-011 |
| UI Flow: Main Menu | UI-MENU-001, UI-MENU-002 |
| UI Flow: Invalid Handling | UI-MENU-003 |
| UI Flow: Exit | UI-MENU-004, UI-MENU-005 |
| Session Management | UI-MENU-002, UI-MENU-005, OP-VIEW-002, OP-CREDIT-004, OP-DEBIT-008 |
| Data Persistence | OP-VIEW-002, OP-CREDIT-004, OP-DEBIT-008 |

---

## Test Environment Requirements

### Node.js Implementation
- Node.js version: 14.x or higher
- Testing framework: Jest, Mocha, or similar
- Assertion library: Chai, Jest assertions, or similar
- Test structure: Unit tests for individual operations, integration tests for user flows

### Expected Test Coverage
- All business rules: 100%
- All operations: 100%
- All UI flows: 100%
- Edge cases documented in specification: 100%

---

## Success Criteria

Testing is considered successful when:
- All 33 test cases pass
- No deviations from specification behavior
- All edge cases handle correctly
- Data persistence works across operations
- Menu navigation follows specification
- Error messages match specification exactly

---

## Out of Scope

The following are noted in the specification as requiring clarification and are NOT covered by this test plan:
- Multiple account support with unique identifiers
- Maximum balance handling when credit would exceed $999,999.99
- Transaction history and audit logging
- Invalid input format handling (non-numeric, negative amounts)
- Authentication and authorization
- Currency symbols and localization

These items should be addressed in a future specification revision and subsequent test plan update.

---

## References

- **Source Specification:** docs/SPECIFICATION.md
- **Legacy Implementation:** src/cobol/ (for reference only, not for test derivation)

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-19 | AI Agent | Initial test plan derived from specification v1.0 |
