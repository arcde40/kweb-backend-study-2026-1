/**
 * Example usage of password hashing utilities
 *
 * This file demonstrates how to use the bcrypt helper functions.
 * You can run this file with: node utils/password.example.js
 */

const { hashPassword, comparePassword } = require('./password');

async function exampleUsage() {
    console.log('=== Password Hashing Example ===\n');

    // Example 1: Hash a password
    const plainPassword = 'mySecurePassword123';
    console.log('1. Original password:', plainPassword);

    const hashedPassword = await hashPassword(plainPassword);
    console.log('2. Hashed password:', hashedPassword);
    console.log('   (This is what gets stored in the database)\n');

    // Example 2: Verify correct password
    const isValidCorrect = await comparePassword(plainPassword, hashedPassword);
    console.log('3. Comparing correct password:', isValidCorrect); // true

    // Example 3: Verify incorrect password
    const wrongPassword = 'wrongPassword';
    const isValidWrong = await comparePassword(wrongPassword, hashedPassword);
    console.log('4. Comparing wrong password:', isValidWrong); // false

    console.log('\n=== Usage in Routes ===');
    console.log(`
    // In register route:
    const hashedPassword = await hashPassword(password);
    // Store hashedPassword in database

    // In login route:
    const user = // ... fetch user from database
    const isValid = await comparePassword(password, user.password);
    if (isValid) {
        // Login successful
    }
    `);
}

// Run the example
exampleUsage().catch(console.error);
