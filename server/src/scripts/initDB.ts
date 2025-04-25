import { connectToDatabase, closeDatabaseConnection } from '../utils/db';
import { AccountDocument } from '../types/account';
import { hashPin } from '../utils/hash';

const initializeAccount = async (account: AccountDocument): Promise<AccountDocument> => {
    return {
        ...account,
        account: {
            ...account.account,
            pin: await hashPin(account.account.pin)
        }
    };
};
// Below sample data below is for transparency of testing only, the same data is present in my connected live MongoDB
const sampleAccounts: AccountDocument[] = [
    {
        user: {
            firstName: "James",
            lastName: "Smith",
            phone: "3129891233",
        },
        account: {
            cardNumber: "5141000000009082",
            expiration: "072028",
            pin: "1234",
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
            expiration: "062025",
            pin: "5678",
            balance: 62.78
        }
    },
    {
        user: {
            firstName: "John",
            lastName: "Doe",
            phone: "5559876543",
        },
        account: {
            cardNumber: "5141000000009999",
            expiration: "012023", // Past date (expired)
            pin: "9999",
            balance: 250.00
        }
    }
];

async function initializeDatabase() {
    try {
        const { db } = await connectToDatabase();
        const collection = process.env.DB_COLLECTION || 'data'
        const accountsCollection = db.collection<AccountDocument>(collection);

        // Drop existing collection if it exists
        await accountsCollection.drop().catch(() => {
            // Ignore error if collection doesn't exist
        });

        // Hash PINs and insert sample data
        const accountsWithHashedPins = await Promise.all(
            sampleAccounts.map(initializeAccount)
        );
        // Insert sample data
        await accountsCollection.insertMany(accountsWithHashedPins);

        console.log('Database initialized with sample data');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await closeDatabaseConnection();
    }
}

// Run the initialization
initializeDatabase();