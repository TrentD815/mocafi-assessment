import { MongoClient } from 'mongodb';

let client: MongoClient;

export async function connectToDatabase() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const dbName = process.env.DB_NAME
    try {
        if (!client) {
            client = new MongoClient(uri);
            await client.connect();
            console.log('Connected to MongoDB');
        }
        return {
            db: client.db(dbName),
            client
        };
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export async function closeDatabaseConnection() {
    try {
        if (client) {
            await client.close();
            console.log('Disconnected from MongoDB');
        }
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        throw error;
    }
}

// Handle application shutdown gracefully
process.on('SIGINT', async () => {
    await closeDatabaseConnection();
    process.exit();
});

process.on('SIGTERM', async () => {
    await closeDatabaseConnection();
    process.exit();
});