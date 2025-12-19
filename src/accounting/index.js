/**
 * School Account Management System
 * 
 * Implementation based on: docs/SPECIFICATION.md
 * 
 * This system manages student account balances with operations for:
 * - Viewing balance
 * - Crediting accounts (adding money)
 * - Debiting accounts (subtracting money)
 * 
 * Business Rules (from specification):
 * 1. Initial account balance: $1,000.00
 * 2. Insufficient funds prevention: No negative balances allowed
 * 3. Unlimited credit acceptance (up to maximum balance)
 * 4. Balance calculation accuracy: 2 decimal places
 */

import * as readline from 'readline';

/**
 * Data Structure: Account Balance
 * Type: Monetary amount (dollars and cents)
 * Format: Up to 6 digits before decimal, 2 after (e.g., 123456.78)
 * Default Value: $1,000.00
 * Valid Range: $0.00 - $999,999.99
 * Constraints: Non-negative, max 2 decimal places
 */
class AccountManager {
    constructor() {
        // Business Rule 1: Initial Account Balance
        // Requirement: Each student account SHALL begin with a default balance of $1,000.00
        this.balance = 1000.00;
        
        // Constants from specification
        this.MIN_BALANCE = 0.00;
        this.MAX_BALANCE = 999999.99;
        this.DECIMAL_PLACES = 2;
    }

    /**
     * Operation 1: View Balance
     * Purpose: Display the current balance of a student account to the user
     * Expected Output: "Current balance: [amount]"
     */
    viewBalance() {
        // Display Formatting Requirement: exactly 2 decimal places
        const formattedBalance = this.balance.toFixed(this.DECIMAL_PLACES);
        console.log(`Current balance: ${formattedBalance}`);
    }

    /**
     * Operation 2: Credit Account
     * Purpose: Add money to a student account
     * 
     * System Processing:
     * 1. User enters the amount to credit
     * 2. System retrieves current balance
     * 3. System calculates new balance: current balance + credit amount
     * 4. System stores new balance
     * 5. System displays result
     * 
     * Success Criteria:
     * - New balance equals old balance plus credit amount
     * - Transaction is permanent (stored for future operations)
     * - User receives confirmation of new balance
     */
    creditAccount(amount) {
        // Business Rule 3: Unlimited Credit Acceptance
        // Validate amount is positive
        if (amount <= 0) {
            console.log("Error: Credit amount must be positive.");
            return false;
        }

        // Validate decimal places (Business Rule 4: Balance Calculation Accuracy)
        if (!this.hasValidDecimalPlaces(amount)) {
            console.log("Error: Amount must have at most 2 decimal places.");
            return false;
        }

        // Retrieve current balance
        const oldBalance = this.balance;

        // Calculate new balance
        const newBalance = oldBalance + amount;

        // Check maximum balance constraint
        if (newBalance > this.MAX_BALANCE) {
            console.log("Error: Credit would exceed maximum balance of $999,999.99.");
            return false;
        }

        // Store new balance
        this.balance = newBalance;

        // Display result with exactly 2 decimal places
        const formattedBalance = this.balance.toFixed(this.DECIMAL_PLACES);
        console.log(`Amount credited. New balance: ${formattedBalance}`);
        
        return true;
    }

    /**
     * Operation 3: Debit Account
     * Purpose: Subtract money from a student account
     * 
     * System Processing:
     * 1. User enters the amount to debit
     * 2. System retrieves current balance
     * 3. System checks if balance is sufficient (balance >= debit amount)
     * 4. If sufficient funds:
     *    - Calculate new balance: current balance - debit amount
     *    - Store new balance
     *    - Display success message
     * 5. If insufficient funds:
     *    - Do NOT modify balance
     *    - Display error message
     * 
     * Business Rule 2: Insufficient Funds Prevention
     * The system SHALL NOT allow a debit transaction that would result in a negative balance
     */
    debitAccount(amount) {
        // Validate amount is positive
        if (amount <= 0) {
            console.log("Error: Debit amount must be positive.");
            return false;
        }

        // Validate decimal places (Business Rule 4: Balance Calculation Accuracy)
        if (!this.hasValidDecimalPlaces(amount)) {
            console.log("Error: Amount must have at most 2 decimal places.");
            return false;
        }

        // Retrieve current balance
        const currentBalance = this.balance;

        // Check if balance is sufficient (Business Rule 2)
        if (currentBalance >= amount) {
            // Sufficient funds: calculate new balance
            const newBalance = currentBalance - amount;
            
            // Store new balance
            this.balance = newBalance;
            
            // Display success message with exactly 2 decimal places
            const formattedBalance = this.balance.toFixed(this.DECIMAL_PLACES);
            console.log(`Amount debited. New balance: ${formattedBalance}`);
            
            return true;
        } else {
            // Insufficient funds: do NOT modify balance
            // Expected Output: "Insufficient funds for this debit."
            console.log("Insufficient funds for this debit.");
            return false;
        }
    }

    /**
     * Helper: Validate decimal places
     * Business Rule 4: All calculations maintain accuracy to 2 decimal places
     */
    hasValidDecimalPlaces(amount) {
        const decimalPart = amount.toString().split('.')[1];
        return !decimalPart || decimalPart.length <= this.DECIMAL_PLACES;
    }

    /**
     * Get current balance (for testing and validation)
     */
    getBalance() {
        return this.balance;
    }
}

/**
 * User Interface Flow
 * 
 * Main Menu Display Format (from specification):
 * --------------------------------
 * Account Management System
 * 1. View Balance
 * 2. Credit Account
 * 3. Debit Account
 * 4. Exit
 * --------------------------------
 * Enter your choice (1-4):
 * 
 * Menu Navigation Rules:
 * - After any operation completes, system returns to main menu
 * - Menu is displayed repeatedly until user chooses to exit
 * - System only exits when user explicitly chooses option 4
 */
class MenuInterface {
    constructor() {
        this.accountManager = new AccountManager();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.running = true;
    }

    /**
     * Display the main menu
     */
    displayMenu() {
        console.log("--------------------------------");
        console.log("Account Management System");
        console.log("1. View Balance");
        console.log("2. Credit Account");
        console.log("3. Debit Account");
        console.log("4. Exit");
        console.log("--------------------------------");
    }

    /**
     * Prompt user for menu choice
     */
    promptMenuChoice() {
        return new Promise((resolve) => {
            this.rl.question("Enter your choice (1-4): ", (answer) => {
                resolve(answer.trim());
            });
        });
    }

    /**
     * Prompt user for amount (credit or debit)
     */
    promptAmount(operation) {
        return new Promise((resolve) => {
            this.rl.question(`Enter ${operation} amount: `, (answer) => {
                resolve(answer.trim());
            });
        });
    }

    /**
     * Handle user choice
     */
    async handleChoice(choice) {
        switch (choice) {
            case '1':
                // Option 1: View Balance
                // Flow: Display balance and return to menu
                this.accountManager.viewBalance();
                break;

            case '2':
                // Option 2: Credit Account
                // Flow: Prompt for amount, process credit, return to menu
                const creditAmountStr = await this.promptAmount('credit');
                const creditAmount = parseFloat(creditAmountStr);
                
                if (isNaN(creditAmount)) {
                    console.log("Error: Invalid amount. Please enter a numeric value.");
                } else {
                    this.accountManager.creditAccount(creditAmount);
                }
                break;

            case '3':
                // Option 3: Debit Account
                // Flow: Prompt for amount, validate, process debit, return to menu
                const debitAmountStr = await this.promptAmount('debit');
                const debitAmount = parseFloat(debitAmountStr);
                
                if (isNaN(debitAmount)) {
                    console.log("Error: Invalid amount. Please enter a numeric value.");
                } else {
                    this.accountManager.debitAccount(debitAmount);
                }
                break;

            case '4':
                // Option 4: Exit
                // Flow: Display goodbye message and terminate
                console.log("Exiting the program. Goodbye!");
                this.running = false;
                break;

            default:
                // Invalid Option Handling
                // Flow: Display error and return to menu
                console.log("Invalid choice, please select 1-4.");
                break;
        }
    }

    /**
     * Main program loop
     * Session Management: Maintain continuous session until user explicitly chooses to exit
     */
    async run() {
        while (this.running) {
            this.displayMenu();
            const choice = await this.promptMenuChoice();
            await this.handleChoice(choice);
        }
        
        this.rl.close();
    }
}

/**
 * Application entry point
 * Initialize and start the menu interface
 */
const app = new MenuInterface();
app.run().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});
