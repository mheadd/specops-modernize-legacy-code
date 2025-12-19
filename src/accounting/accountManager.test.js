/**
 * School Account Management System - Unit Tests
 * 
 * Test Plan Source: docs/TESTPLAN.md
 * Specification Source: docs/SPECIFICATION.md
 * 
 * These tests implement all test cases from the test plan to validate
 * that the Node.js implementation correctly follows the specification.
 */

import { AccountManager } from './accountManager.js';

describe('School Account Management System - Test Suite', () => {
    
    // ========================================
    // Category 1: Business Rules Tests
    // ========================================
    
    describe('Category 1: Business Rules', () => {
        
        /**
         * Test Case: BR-001
         * Validates: Business Rule 1 - Initial Account Balance
         */
        test('BR-001: Verify initial account balance is $1,000.00', () => {
            // Pre-conditions: New account is created
            const account = new AccountManager();
            
            // Test Steps: View the account balance
            const balance = account.getBalance();
            
            // Expected Result: Balance is $1,000.00
            expect(balance).toBe(1000.00);
        });
        
        /**
         * Test Case: BR-002
         * Validates: Business Rule 2 - Insufficient Funds Prevention
         */
        test('BR-002: Verify debit is rejected when amount exceeds balance', () => {
            // Pre-conditions: Account balance is $50.00
            const account = new AccountManager();
            account.setBalance(50.00);
            
            // Test Steps: Attempt debit of $75.00
            const result = account.debitAccount(75.00);
            
            // Expected Result: 
            // - Transaction is rejected
            // - Balance remains $50.00
            // - Error message: "Insufficient funds for this debit."
            expect(result.success).toBe(false);
            expect(result.message).toBe("Insufficient funds for this debit.");
            expect(account.getBalance()).toBe(50.00);
        });
        
        /**
         * Test Case: BR-003
         * Validates: Business Rule 2 - Edge Case: Zero balance
         */
        test('BR-003: Verify debit is rejected on zero balance', () => {
            // Pre-conditions: Account balance is $0.00
            const account = new AccountManager();
            account.setBalance(0.00);
            
            // Test Steps: Attempt debit of $10.00
            const result = account.debitAccount(10.00);
            
            // Expected Result:
            // - Transaction is rejected
            // - Balance remains $0.00
            // - Error message displayed
            expect(result.success).toBe(false);
            expect(result.message).toBe("Insufficient funds for this debit.");
            expect(account.getBalance()).toBe(0.00);
        });
        
        /**
         * Test Case: BR-004
         * Validates: Business Rule 2 - Edge Case: Exact balance debit
         */
        test('BR-004: Verify exact balance debit is allowed', () => {
            // Pre-conditions: Account balance is $500.00
            const account = new AccountManager();
            account.setBalance(500.00);
            
            // Test Steps: Debit exactly $500.00
            const result = account.debitAccount(500.00);
            
            // Expected Result:
            // - Transaction is accepted
            // - New balance is $0.00
            // - Success message displayed
            expect(result.success).toBe(true);
            expect(account.getBalance()).toBe(0.00);
            expect(result.message).toContain("Amount debited. New balance: 0.00");
        });
        
        /**
         * Test Case: BR-005
         * Validates: Business Rule 2 - Edge Case: Just over balance
         */
        test('BR-005: Verify debit just over balance is rejected', () => {
            // Pre-conditions: Account balance is $50.00
            const account = new AccountManager();
            account.setBalance(50.00);
            
            // Test Steps: Attempt debit of $50.01
            const result = account.debitAccount(50.01);
            
            // Expected Result:
            // - Transaction is rejected
            // - Balance remains $50.00
            // - Error message displayed
            expect(result.success).toBe(false);
            expect(result.message).toBe("Insufficient funds for this debit.");
            expect(account.getBalance()).toBe(50.00);
        });
        
        /**
         * Test Case: BR-006
         * Validates: Business Rule 3 - Unlimited Credit Acceptance
         */
        test('BR-006: Verify credit transactions are accepted', () => {
            // Pre-conditions: Account has any valid balance
            const account = new AccountManager();
            const initialBalance = account.getBalance();
            
            // Test Steps: Credit $100.00
            const result = account.creditAccount(100.00);
            
            // Expected Result:
            // - Transaction is accepted
            // - New balance = old balance + credit amount
            // - Success message displayed
            expect(result.success).toBe(true);
            expect(account.getBalance()).toBe(initialBalance + 100.00);
            expect(result.message).toContain("Amount credited");
        });
        
        /**
         * Test Case: BR-007
         * Validates: Business Rule 4 - Balance Calculation Accuracy
         */
        test('BR-007: Verify balance calculations maintain 2 decimal places', () => {
            // Pre-conditions: Account balance is $100.00
            const account = new AccountManager();
            account.setBalance(100.00);
            
            // Test Steps: Credit $25.50, then Debit $10.25
            const creditResult = account.creditAccount(25.50);
            expect(account.getBalance()).toBe(125.50);
            expect(creditResult.message).toBe("Amount credited. New balance: 125.50");
            
            const debitResult = account.debitAccount(10.25);
            expect(account.getBalance()).toBe(115.25);
            expect(debitResult.message).toBe("Amount debited. New balance: 115.25");
            
            // Expected Result: All balances show exactly 2 decimal places
            expect(account.getBalance().toFixed(2)).toBe("115.25");
        });
        
        /**
         * Test Case: BR-008
         * Validates: Business Rule 4 - No rounding error accumulation
         */
        test('BR-008: Verify no rounding errors accumulate over multiple transactions', () => {
            // Pre-conditions: Account balance is $1,000.00
            const account = new AccountManager();
            account.setBalance(1000.00);
            
            // Test Steps: Debit $33.33, $33.33, $33.34
            account.debitAccount(33.33);
            account.debitAccount(33.33);
            account.debitAccount(33.34);
            
            // Expected Result: Final balance is $900.00
            // Note: Due to JavaScript floating-point arithmetic, we check within 0.01 precision
            expect(account.getBalance()).toBeCloseTo(900.00, 2);
        });
    });
    
    // ========================================
    // Category 2: View Balance Operation Tests
    // ========================================
    
    describe('Category 2: View Balance Operation', () => {
        
        /**
         * Test Case: OP-VIEW-001
         * Validates: Operation 1 - View Balance
         */
        test('OP-VIEW-001: Verify View Balance displays current balance correctly', () => {
            // Pre-conditions: Account balance is $1,000.00
            const account = new AccountManager();
            
            // Test Steps: View balance
            const message = account.viewBalance();
            
            // Expected Result: Message displays "Current balance: 1000.00"
            expect(message).toBe("Current balance: 1000.00");
        });
        
        /**
         * Test Case: OP-VIEW-002
         * Validates: View Balance reflects changes after transactions
         */
        test('OP-VIEW-002: Verify View Balance reflects changes after transactions', () => {
            // Pre-conditions: Account balance is $1,000.00
            const account = new AccountManager();
            
            // Test Steps: Credit $250.00, view balance, debit $100.00, view balance
            account.creditAccount(250.00);
            let message = account.viewBalance();
            expect(message).toBe("Current balance: 1250.00");
            
            account.debitAccount(100.00);
            message = account.viewBalance();
            expect(message).toBe("Current balance: 1150.00");
        });
    });
    
    // ========================================
    // Category 3: Credit Account Operation Tests
    // ========================================
    
    describe('Category 3: Credit Account Operation', () => {
        
        /**
         * Test Case: OP-CREDIT-001
         * Validates: Operation 2 - Credit Account (Example Scenario 1)
         */
        test('OP-CREDIT-001: Verify successful credit transaction adds to balance', () => {
            // Pre-conditions: Account balance is $1,000.00
            const account = new AccountManager();
            
            // Test Steps: Credit $250.00
            const result = account.creditAccount(250.00);
            
            // Expected Result: 
            // - Message: "Amount credited. New balance: 1250.00"
            // - Balance updated to $1,250.00
            expect(result.success).toBe(true);
            expect(result.message).toBe("Amount credited. New balance: 1250.00");
            expect(account.getBalance()).toBe(1250.00);
        });
        
        /**
         * Test Case: OP-CREDIT-002
         * Validates: Operation 2 - Credit with decimal amounts
         */
        test('OP-CREDIT-002: Verify credit with decimal amounts', () => {
            // Pre-conditions: Account balance is $500.50
            const account = new AccountManager();
            account.setBalance(500.50);
            
            // Test Steps: Credit $100.25
            const result = account.creditAccount(100.25);
            
            // Expected Result: Balance is $600.75, decimal precision maintained
            expect(result.success).toBe(true);
            expect(result.message).toBe("Amount credited. New balance: 600.75");
            expect(account.getBalance()).toBe(600.75);
        });
        
        /**
         * Test Case: OP-CREDIT-003
         * Validates: Operation 2 - Credit on zero balance
         */
        test('OP-CREDIT-003: Verify credit on zero balance', () => {
            // Pre-conditions: Account balance is $0.00
            const account = new AccountManager();
            account.setBalance(0.00);
            
            // Test Steps: Credit $1,000.00
            const result = account.creditAccount(1000.00);
            
            // Expected Result: Balance updated from $0.00 to $1,000.00
            expect(result.success).toBe(true);
            expect(result.message).toBe("Amount credited. New balance: 1000.00");
            expect(account.getBalance()).toBe(1000.00);
        });
        
        /**
         * Test Case: OP-CREDIT-004
         * Validates: Credit transaction persistence
         */
        test('OP-CREDIT-004: Verify credit transaction persistence', () => {
            // Pre-conditions: Account balance is $1,000.00
            const account = new AccountManager();
            
            // Test Steps: Credit $50.00, view balance multiple times
            account.creditAccount(50.00);
            expect(account.getBalance()).toBe(1050.00);
            expect(account.viewBalance()).toBe("Current balance: 1050.00");
            
            // Perform another operation
            expect(account.viewBalance()).toBe("Current balance: 1050.00");
            
            // Expected Result: Balance remains $1,050.00
            expect(account.getBalance()).toBe(1050.00);
        });
        
        /**
         * Test Case: OP-CREDIT-005
         * Validates: Credit amount prompt behavior (tested via return values)
         */
        test('OP-CREDIT-005: Verify credit operation provides appropriate feedback', () => {
            // Pre-conditions: Account ready
            const account = new AccountManager();
            
            // Test Steps: Execute credit operation
            const result = account.creditAccount(100.00);
            
            // Expected Result: Returns success message
            expect(result).toHaveProperty('success');
            expect(result).toHaveProperty('message');
            expect(result.success).toBe(true);
        });
        
        /**
         * Test Case: OP-CREDIT-006
         * Validates: Large credit amount within maximum limit
         */
        test('OP-CREDIT-006: Verify large credit amount within maximum limit', () => {
            // Pre-conditions: Account balance is $0.00
            const account = new AccountManager();
            account.setBalance(0.00);
            
            // Test Steps: Credit $999,999.99
            const result = account.creditAccount(999999.99);
            
            // Expected Result: Transaction accepted, balance is $999,999.99
            expect(result.success).toBe(true);
            expect(account.getBalance()).toBe(999999.99);
            expect(result.message).toBe("Amount credited. New balance: 999999.99");
        });
        
        /**
         * Test Case: OP-CREDIT-007
         * Validates: Credit operation returns for continued session
         */
        test('OP-CREDIT-007: Verify credit completes and system ready for next operation', () => {
            // Pre-conditions: System ready
            const account = new AccountManager();
            
            // Test Steps: Complete a credit transaction
            const result = account.creditAccount(50.00);
            
            // Expected Result: System ready for next operation (balance accessible)
            expect(result.success).toBe(true);
            expect(account.getBalance()).toBe(1050.00);
            
            // Can perform another operation immediately
            const nextResult = account.viewBalance();
            expect(nextResult).toBe("Current balance: 1050.00");
        });
    });
    
    // ========================================
    // Category 4: Debit Account Operation Tests
    // ========================================
    
    describe('Category 4: Debit Account Operation', () => {
        
        /**
         * Test Case: OP-DEBIT-001
         * Validates: Operation 3 - Debit with sufficient funds
         */
        test('OP-DEBIT-001: Verify successful debit with sufficient funds', () => {
            // Pre-conditions: Account balance is $1,000.00
            const account = new AccountManager();
            
            // Test Steps: Debit $250.00
            const result = account.debitAccount(250.00);
            
            // Expected Result: Balance updated to $750.00
            expect(result.success).toBe(true);
            expect(result.message).toBe("Amount debited. New balance: 750.00");
            expect(account.getBalance()).toBe(750.00);
        });
        
        /**
         * Test Case: OP-DEBIT-002
         * Validates: Exact balance debit results in zero
         */
        test('OP-DEBIT-002: Verify exact balance debit results in zero balance', () => {
            // Pre-conditions: Account balance is $500.00
            const account = new AccountManager();
            account.setBalance(500.00);
            
            // Test Steps: Debit $500.00
            const result = account.debitAccount(500.00);
            
            // Expected Result: Balance is $0.00
            expect(result.success).toBe(true);
            expect(result.message).toBe("Amount debited. New balance: 0.00");
            expect(account.getBalance()).toBe(0.00);
        });
        
        /**
         * Test Case: OP-DEBIT-003
         * Validates: Debit rejected with insufficient funds
         */
        test('OP-DEBIT-003: Verify debit rejected with insufficient funds', () => {
            // Pre-conditions: Account balance is $50.00
            const account = new AccountManager();
            account.setBalance(50.00);
            
            // Test Steps: Attempt debit of $75.00
            const result = account.debitAccount(75.00);
            
            // Expected Result: Rejected, balance remains $50.00
            expect(result.success).toBe(false);
            expect(result.message).toBe("Insufficient funds for this debit.");
            expect(account.getBalance()).toBe(50.00);
        });
        
        /**
         * Test Case: OP-DEBIT-004
         * Validates: Debit rejected on zero balance
         */
        test('OP-DEBIT-004: Verify debit rejected on zero balance', () => {
            // Pre-conditions: Account balance is $0.00
            const account = new AccountManager();
            account.setBalance(0.00);
            
            // Test Steps: Attempt debit of $10.00
            const result = account.debitAccount(10.00);
            
            // Expected Result: Rejected, balance remains $0.00
            expect(result.success).toBe(false);
            expect(result.message).toBe("Insufficient funds for this debit.");
            expect(account.getBalance()).toBe(0.00);
        });
        
        /**
         * Test Case: OP-DEBIT-005
         * Validates: Debit with decimal amounts maintains accuracy
         */
        test('OP-DEBIT-005: Verify debit with decimal amounts maintains accuracy', () => {
            // Pre-conditions: Account balance is $100.00
            const account = new AccountManager();
            account.setBalance(100.00);
            
            // Test Steps: Debit $25.50
            const result = account.debitAccount(25.50);
            
            // Expected Result: Balance is $74.50
            expect(result.success).toBe(true);
            expect(result.message).toBe("Amount debited. New balance: 74.50");
            expect(account.getBalance()).toBe(74.50);
        });
        
        /**
         * Test Case: OP-DEBIT-006
         * Validates: Debit operation provides appropriate feedback
         */
        test('OP-DEBIT-006: Verify debit operation provides appropriate feedback', () => {
            // Pre-conditions: System ready
            const account = new AccountManager();
            
            // Test Steps: Execute debit operation
            const result = account.debitAccount(50.00);
            
            // Expected Result: Returns success/failure with message
            expect(result).toHaveProperty('success');
            expect(result).toHaveProperty('message');
        });
        
        /**
         * Test Case: OP-DEBIT-007
         * Validates: Balance unchanged after insufficient funds rejection
         */
        test('OP-DEBIT-007: Verify balance unchanged after insufficient funds rejection', () => {
            // Pre-conditions: Account balance is $50.00
            const account = new AccountManager();
            account.setBalance(50.00);
            
            // Test Steps: Attempt debit of $75.00, then view balance
            const result = account.debitAccount(75.00);
            expect(result.success).toBe(false);
            
            const balance = account.getBalance();
            
            // Expected Result: Balance remains exactly $50.00
            expect(balance).toBe(50.00);
        });
        
        /**
         * Test Case: OP-DEBIT-008
         * Validates: Successful debit transaction persistence
         */
        test('OP-DEBIT-008: Verify successful debit transaction persistence', () => {
            // Pre-conditions: Account balance is $1,000.00
            const account = new AccountManager();
            
            // Test Steps: Debit $100.00, view balance multiple times
            account.debitAccount(100.00);
            expect(account.getBalance()).toBe(900.00);
            
            // Perform another operation
            expect(account.viewBalance()).toBe("Current balance: 900.00");
            
            // Expected Result: Balance remains $900.00
            expect(account.getBalance()).toBe(900.00);
        });
        
        /**
         * Test Case: OP-DEBIT-009
         * Validates: Debit validation occurs before balance modification
         */
        test('OP-DEBIT-009: Verify debit validation occurs before balance modification', () => {
            // Pre-conditions: Account balance is $50.00
            const account = new AccountManager();
            account.setBalance(50.00);
            
            // Test Steps: Attempt debit of $60.00
            const balanceBefore = account.getBalance();
            const result = account.debitAccount(60.00);
            const balanceAfter = account.getBalance();
            
            // Expected Result: Balance never changes from $50.00
            expect(balanceBefore).toBe(50.00);
            expect(result.success).toBe(false);
            expect(balanceAfter).toBe(50.00);
        });
        
        /**
         * Test Case: OP-DEBIT-010
         * Validates: System ready for next operation after successful debit
         */
        test('OP-DEBIT-010: Verify debit completes and system ready for next operation', () => {
            // Pre-conditions: Account balance is $1,000.00
            const account = new AccountManager();
            
            // Test Steps: Complete successful debit transaction
            const result = account.debitAccount(100.00);
            expect(result.success).toBe(true);
            
            // Expected Result: Can immediately perform another operation
            const nextResult = account.viewBalance();
            expect(nextResult).toBe("Current balance: 900.00");
        });
        
        /**
         * Test Case: OP-DEBIT-011
         * Validates: System ready for next operation after failed debit
         */
        test('OP-DEBIT-011: Verify system ready after insufficient funds rejection', () => {
            // Pre-conditions: Account balance is $50.00
            const account = new AccountManager();
            account.setBalance(50.00);
            
            // Test Steps: Attempt debit of $75.00 (insufficient funds)
            const result = account.debitAccount(75.00);
            expect(result.success).toBe(false);
            
            // Expected Result: Can immediately perform another operation
            const nextResult = account.viewBalance();
            expect(nextResult).toBe("Current balance: 50.00");
        });
    });
    
    // ========================================
    // Additional Edge Case Tests
    // ========================================
    
    describe('Additional Edge Cases and Validation', () => {
        
        test('Verify credit exceeding maximum balance is rejected', () => {
            const account = new AccountManager();
            account.setBalance(999990.00);
            
            const result = account.creditAccount(20.00);
            
            expect(result.success).toBe(false);
            expect(result.message).toContain("exceed maximum balance");
            expect(account.getBalance()).toBe(999990.00);
        });
        
        test('Verify negative credit amount is rejected', () => {
            const account = new AccountManager();
            
            const result = account.creditAccount(-50.00);
            
            expect(result.success).toBe(false);
            expect(result.message).toContain("must be positive");
        });
        
        test('Verify negative debit amount is rejected', () => {
            const account = new AccountManager();
            
            const result = account.debitAccount(-50.00);
            
            expect(result.success).toBe(false);
            expect(result.message).toContain("must be positive");
        });
        
        test('Verify zero credit amount is rejected', () => {
            const account = new AccountManager();
            
            const result = account.creditAccount(0);
            
            expect(result.success).toBe(false);
            expect(result.message).toContain("must be positive");
        });
        
        test('Verify zero debit amount is rejected', () => {
            const account = new AccountManager();
            
            const result = account.debitAccount(0);
            
            expect(result.success).toBe(false);
            expect(result.message).toContain("must be positive");
        });
        
        test('Verify amounts with more than 2 decimal places are rejected for credit', () => {
            const account = new AccountManager();
            
            const result = account.creditAccount(100.123);
            
            expect(result.success).toBe(false);
            expect(result.message).toContain("at most 2 decimal places");
        });
        
        test('Verify amounts with more than 2 decimal places are rejected for debit', () => {
            const account = new AccountManager();
            
            const result = account.debitAccount(50.999);
            
            expect(result.success).toBe(false);
            expect(result.message).toContain("at most 2 decimal places");
        });
    });
});
