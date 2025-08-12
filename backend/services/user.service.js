import usermodel from '../models/user.model.js';

export const registerUser = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        // Check if user already exists
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        // Hash the password
        const hashedPassword = await usermodel.hashPassword(password);
        // Create a new user
        const user = await usermodel.create({
            email,
            password: hashedPassword
        });
        return user;
    } catch (error) {
        console.error('Error registering user:', error);
        // Handle specific error messages
        if (error.message === 'User with this email already exists') {
            throw error;
        }
        if (error.message === 'Email and password are required') {
            throw error;
        }
        throw new Error('Internal server error');
    }
};

export const findUserByEmail = async (email) => {
    try {
        if (!email) {
            throw new Error('Email is required');
        }

        // Find user by email and include password field
        const user = await usermodel.findOne({ email }).select('+password');
        return user;
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Internal server error');
    }
};