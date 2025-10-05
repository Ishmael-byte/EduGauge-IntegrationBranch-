// generateHash.js

const bcrypt = require('bcrypt');

const plainTextPassword = 'Admin@123'; // REPLACE 


async function generateHash() {
    try {
        console.log(`Hashing password: "${plainTextPassword}"`);
        
        // Generate the hash
        const hash = await bcrypt.hash(plainTextPassword, 10);
        
        console.log('\n----------------------------------------');
        console.log('  GENERATED BCrypt HASH (Copy This):');
        console.log(`  ${hash}`);
        console.log('----------------------------------------\n');
        
    } catch (err) {
        console.error('Error generating hash:', err);
    }
}

generateHash();