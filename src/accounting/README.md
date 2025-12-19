# School Account Management System - Node.js Implementation

This is a Node.js implementation of the School Account Management System, built entirely from the specification documented in [`docs/SPECIFICATION.md`](../../docs/SPECIFICATION.md).

## Implementation Approach

This implementation follows the **SpecOps methodology**:
- ✅ Built purely from the specification (not from COBOL code)
- ✅ Implements all business rules as documented
- ✅ Follows all data structure constraints
- ✅ Reproduces the exact user interface flow
- ✅ Handles all error conditions as specified

## Features Implemented

### Business Rules (from Specification)
1. **Initial Account Balance**: Each account starts with $1,000.00
2. **Insufficient Funds Prevention**: Debits cannot exceed current balance
3. **Unlimited Credit Acceptance**: Credits accepted up to maximum balance
4. **Balance Calculation Accuracy**: All amounts maintain 2 decimal places

### Operations (from Specification)
1. **View Balance**: Display current account balance
2. **Credit Account**: Add money to the account
3. **Debit Account**: Subtract money from the account (with validation)

### User Interface (from Specification)
- Menu-driven interface with 4 options
- Continuous session loop until explicit exit
- Invalid input handling
- Exact message formats as specified

## Running the Application

### Method 1: Command Line
```bash
cd src/accounting
node index.js
```

### Method 2: VS Code Debugger
1. Open the project in VS Code
2. Press `F5` or select "Run > Start Debugging"
3. Choose "Launch School Account Management System"

### Method 3: npm script
```bash
cd src/accounting
npm start
```

## Usage Examples

### View Balance
```
Enter your choice (1-4): 1
Current balance: 1000.00
```

### Credit Account
```
Enter your choice (1-4): 2
Enter credit amount: 250.00
Amount credited. New balance: 1250.00
```

### Debit Account (Sufficient Funds)
```
Enter your choice (1-4): 3
Enter debit amount: 100.00
Amount debited. New balance: 1150.00
```

### Debit Account (Insufficient Funds)
```
Enter your choice (1-4): 3
Enter debit amount: 2000.00
Insufficient funds for this debit.
```

### Exit
```
Enter your choice (1-4): 4
Exiting the program. Goodbye!
```

## Code Structure

### `AccountManager` Class
Manages the account balance and implements all business logic:
- `viewBalance()`: Operation 1 from specification
- `creditAccount(amount)`: Operation 2 from specification
- `debitAccount(amount)`: Operation 3 from specification

### `MenuInterface` Class
Manages user interaction and implements the UI flow:
- `displayMenu()`: Shows menu as specified
- `promptMenuChoice()`: Gets user input
- `handleChoice(choice)`: Routes to appropriate operation
- `run()`: Main event loop (session management)

## Validation

All test cases from [`docs/TESTPLAN.md`](../../docs/TESTPLAN.md) can be executed manually:
- ✅ BR-001: Initial balance is $1,000.00
- ✅ BR-002: Debit rejection when amount exceeds balance
- ✅ BR-003: Debit rejection on zero balance
- ✅ BR-004: Exact balance debit allowed
- ✅ BR-005: Debit just over balance rejected
- ✅ BR-006: Credit transactions accepted
- ✅ BR-007: Balance calculations maintain 2 decimal places
- ✅ All operation and UI test cases

## Comparison with Legacy System

The Node.js implementation produces **identical behavior** to the COBOL system documented in the specification:

| Feature | COBOL (Legacy) | Node.js (Modern) | Status |
|---------|----------------|------------------|--------|
| Initial Balance | $1,000.00 | $1,000.00 | ✅ Match |
| View Balance | Displays balance | Displays balance | ✅ Match |
| Credit Account | Adds to balance | Adds to balance | ✅ Match |
| Debit Account | Subtracts with validation | Subtracts with validation | ✅ Match |
| Insufficient Funds | Rejects transaction | Rejects transaction | ✅ Match |
| Menu Interface | 4 options, loops | 4 options, loops | ✅ Match |
| Error Messages | Exact text | Exact text | ✅ Match |
| Decimal Precision | 2 places | 2 places | ✅ Match |

## Requirements

- Node.js 14.x or higher
- No external dependencies (uses built-in `readline` module)
- Jest for testing (dev dependency)

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Results

✅ **35 tests, all passing**
✅ **100% code coverage** (statements, branches, functions, lines)

The test suite implements all test cases from `docs/TESTPLAN.md`:
- 8 Business Rules tests
- 2 View Balance operation tests
- 7 Credit Account operation tests
- 11 Debit Account operation tests
- 7 Additional edge case tests

See [TEST-SUMMARY.md](TEST-SUMMARY.md) for detailed test results and coverage report.

## Next Steps

To add automated testing based on the test plan:
```bash
npm install --save-dev jest
```

Then create test files implementing each test case from `docs/TESTPLAN.md`.

## References

- **Specification**: [`docs/SPECIFICATION.md`](../../docs/SPECIFICATION.md)
- **Test Plan**: [`docs/TESTPLAN.md`](../../docs/TESTPLAN.md)
- **SpecOps Methodology**: [`AGENTS.md`](../../AGENTS.md)
