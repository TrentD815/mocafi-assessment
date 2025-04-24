import React, { useState } from 'react';
import {Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { checkBalance } from '../services/api';

export const CardBalanceChecker: React.FC = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [balance, setBalance] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setError(null);
        setBalance(null);
    };

    const handleBalanceCheck = async () => {
        setLoading(true);
        setError(null);

        try {
            const cleanCardNumber = cardNumber.replace(/\D/g, '');
            if (cleanCardNumber.length !== 16) {
                throw new Error('Please enter a valid 16-digit card number');
            }

            const response = await checkBalance(cleanCardNumber);
            setBalance(response.balance);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        resetForm();
        handleBalanceCheck();
    };

    return (
        <Box
            component={Paper}
            sx={{ maxWidth: 400, mx: 'auto', p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2,
                backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
        >
            <Typography variant="h5" component="h1" gutterBottom>
                Check Card Balance
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
                    margin="normal" placeholder="Enter 16-digit card number" inputProps={{maxLength: 16, pattern: '[0-9]*'}}
                />

                <Button fullWidth variant="contained" type="submit" disabled={loading} sx={{ mt: 2 }}>
                    Check Balance
                </Button>

                {/* All-purpose error toast handler */}
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* All-purpose success toast handler */}
                {balance !== null && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        Your balance is: ${balance?.toFixed(2)}
                    </Alert>
                )}
            </form>
        </Box>
    );
};