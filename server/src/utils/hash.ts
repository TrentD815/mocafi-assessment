import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashPin = async (pin: string): Promise<string> => {
    return bcrypt.hash(pin, SALT_ROUNDS);
};

export const comparePin = async (plainPin: string, hashedPin: string): Promise<boolean> => {
    return bcrypt.compare(plainPin, hashedPin);
};