const bcrypt = require('bcrypt');

async function run() {
    const plainPassword = 'Lecturer@123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log('Hashed password:', hashedPassword);
}




run();
