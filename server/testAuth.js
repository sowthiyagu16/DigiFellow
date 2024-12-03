
const { register, login } = require('./auth');

const testRegister = async () => {
    try {
        const user = await register('testuser', 'testpassword');
        console.log('Test register successful:', user);
    } catch (error) {
        console.error('Test register failed:', error);
    }
};

const testLogin = async () => {
    try {
        const token = await login('testuser', 'testpassword');
        console.log('Test login successful:', token);
    } catch (error) {
        console.error('Test login failed:', error);
    }
};

// Run the tests
testRegister().then(() => testLogin());