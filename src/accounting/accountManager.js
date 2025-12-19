/**
 * Account Manager Module
 * Exported for testing purposes
 * 
 * Implementation based on: docs/SPECIFICATION.md
 */

/**
 * Data Structure: Account Balance
 * Type: Monetary amount (dollars and cents)
 * Format: Up to 6 digits before decimal, 2 after (e.g., 123456.78)
 * Default Value: $1,000.00
 * Valid Range: $0.00 - $999,999.99
 * Constraints: Non-negative, max 2 decimal places
 */
export class AccountManager {
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
        return `Current balance: ${formattedBalance}`;
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
            return { success: false, message: "Error: Credit amount must be positive." };
        }

        // Validate decimal places (Business Rule 4: Balance Calculation Accuracy)
        if (!this.hasValidDecimalPlaces(amount)) {
            return { success: false, message: "Error: Amount must have at most 2 decimal places." };
        }

        // Retrieve current balance
        const oldBalance = this.balance;

        // Calculate new balance
        const newBalance = oldBalance + amount;

        // Check maximum balance constraint
        if (newBalance > this.MAX_BALANCE) {
            return { success: false, message: "Error: Credit would exceed maximum balance of $999,999.99." };
        }

        // Store new balance
        this.balance = newBalance;

        // Display result with exactly 2 decimal places
        const formattedBalance = this.balance.toFixed(this.DECIMAL_PLACES);
        return { success: true, message: `Amount credited. New balance: ${formattedBalance}` };
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
            return { success: false, message: "Error: Debit amount must be positive." };
        }

        // Validate decimal places (Business Rule 4: Balance Calculation Accuracy)
        if (!this.hasValidDecimalPlaces(amount)) {
            return { success: false, message: "Error: Amount must have at most 2 decimal places." };
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
            return { success: true, message: `Amount debited. New balance: ${formattedBalance}` };
        } else {
            // Insufficient funds: do NOT modify balance
            // Expected Output: "Insufficient funds for this debit."
            return { success: false, message: "Insufficient funds for this debit." };
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

    /**
     * Set balance (for testing purposes - to set up pre-conditions)
     */
    setBalance(amount) {
        this.balance = amount;
    }
}
