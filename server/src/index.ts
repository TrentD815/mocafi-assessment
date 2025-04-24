import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './utils/db';
import accountRoutes from './routes/accountRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', accountRoutes);

// Initialize database connection and start server
async function startServer() {
    try {
        // Test database connection
        await connectToDatabase();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();