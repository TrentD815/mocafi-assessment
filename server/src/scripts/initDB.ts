import { connectToDatabase, closeDatabaseConnection } from '../utils/db';
import { AccountDocument } from '../types/account';

const sampleAccounts: Omit<AccountDocument, '_id'>[] = [
    {
        user: {
            firstName: "James",
            lastName: "Smith",
            phone: "3129891233",
        },
        account: {
            cardNumber: "5141000000009082",
            expiration: "062023",
            pin: "****",
            balance: 112.38
        }
    },
    {
        user: {
            firstName: "Paula",
            lastName: "Bean",
            phone: "3176541213",
        },
        account: {
            cardNumber: "5141000000009844",
            expiration: "062022",
            pin: "****",
            balance: 62.78
        }
    }
];

async function initializeDatabase() {
    try {
        const { db } = await connectToDatabase();
        const collection = process.env.DB_COLLECTION
        const accountsCollection = db.collection<AccountDocument>(collection);

        // Drop existing collection if it exists
        await accountsCollection.drop().catch(() => {
            // Ignore error if collection doesn't exist
        });

        // Insert sample data
        await accountsCollection.insertMany(sampleAccounts);

        console.log('Database initialized with sample data');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await closeDatabaseConnection();
    }
}

// Run the initialization
initializeDatabase();