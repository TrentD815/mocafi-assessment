import { Request, Response } from 'express';
import { connectToDatabase } from '../utils/db';
import { AccountDocument } from '../types/account';
import { isCardExpired } from "../utils/cardValidation";
import { comparePin } from "../utils/hash";

export const getBalance = async (req: Request, res: Response) => {
    try {
        const { cardNumber } = req.params;
        const { pin } = req.query || '';

        // Validate card number format
        if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
            return res.status(400).json({
                error: 'Invalid card number. Please provide a valid card number.'
            });
        }

        const { db } = await connectToDatabase();
        const collection = process.env.DB_COLLECTION || 'data'
        const accountsCollection = db.collection<AccountDocument>(collection);
        const account = await accountsCollection.findOne({
            'account.cardNumber': cardNumber
        })
        if (!account) {
            return res.status(404).json({
                error: 'Account with provided card number not found'
            });
        }

        // If PIN is provided, validate it
        if (pin) {
            //Compare computed hashed value to what's stored in the DB
            const isPinValid = await comparePin(pin.toString(), account.account.pin);
            if (!isPinValid) {
                return res.status(400).json({
                    error: 'Incorrect PIN'
                });
            }
        }
        // Check if card is expired
        if (isCardExpired(account.account.expiration)) {
            return res.status(400).json({
                error: 'Your card has expired, please request a new card in the app.'
            });
        }
        return res.json({
            balance: account.account.balance
        });
    } catch (error) {
        console.error('Error fetching balance:', error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};