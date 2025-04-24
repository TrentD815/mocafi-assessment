import { Request, Response } from 'express';
import { connectToDatabase } from '../utils/db';
import { AccountDocument } from '../types/account';

export const getBalance = async (req: Request, res: Response) => {
    try {
        const { cardNumber } = req.params;
        const { db } = await connectToDatabase();
        const collection = process.env.DB_COLLECTION
        const accountsCollection = db.collection<AccountDocument>(collection);

        const account = await accountsCollection.findOne({
            'account.cardNumber': cardNumber
        })

        return res.json({
            balance: account?.account?.balance
        });
    } catch (error) {
        console.error('Error fetching balance:', error);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};