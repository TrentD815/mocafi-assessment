import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './utils/db';
import accountRoutes from './routes/accountRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.options('*', cors())
app.use(express.json());

app.use(async function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

// Routes
app.use('/api', accountRoutes);

// Initialize database connection and start server
async function startServer() {
    try {
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