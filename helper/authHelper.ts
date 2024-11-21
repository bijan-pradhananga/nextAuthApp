import { hash, compare } from 'bcryptjs';

// Function to hash a password
const hashPassword = async (password: string): Promise<string> => {
    try {
        const saltRounds = 10; // Define salt rounds
        const hashedPass = await hash(password, saltRounds); // Hash the password
        return hashedPass;
    } catch (error) {
        console.error("Error while hashing password:", error);
        throw new Error("Error hashing password");
    }
};

// Function to compare passwords
const comparePass = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await compare(password, hashedPassword); // Compare plain-text and hashed password
    } catch (error) {
        console.error("Error while comparing passwords:", error);
        throw new Error("Error comparing passwords");
    }
};

export { hashPassword, comparePass };
