import React, { useState } from 'react';
import {Box, TextField, Button, Typography, Paper, Alert, Switch, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions,} from '@mui/material';
import { checkBalance } from '../services/api';

export const CardBalanceChecker: React.FC = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [balance, setBalance] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [requirePin, setRequirePin] = useState(false);
    const [pinDialogOpen, setPinDialogOpen] = useState(false);
    const [pin, setPin] = useState('');

    const resetForm = () => {
        setError(null);
        setBalance(null);
        setPin('');
    };

    const handlePinSubmit = () => {
        if (pin.length !== 4 || !/^\d+$/.test(pin)) {
            setError('Please enter a valid 4-digit PIN');
            return;
        }
        setPinDialogOpen(false);
        handleBalanceCheck();
    };

    const handleBalanceCheck = async () => {
        setLoading(true);
        setError(null);

        try {
            const cleanCardNumber = cardNumber.replace(/\D/g, '');
            if (cleanCardNumber.length !== 16) {
                throw new Error('Please enter a valid 16-digit card number');
            }

            const response = await checkBalance(cleanCardNumber, pin);
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

        if (requirePin) {
            setPinDialogOpen(true);
        } else {
            await handleBalanceCheck();
        }
    };

    return (
        <Box
            component={Paper}
            sx={{maxWidth: 400, mx: 'auto', p: 3, border: '1px solid', borderColor: 'black', borderRadius: 2,
                backgroundColor: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', backdropFilter: 'blur(4px)'
            }}
        >
            <Typography variant="h5" component="h1" gutterBottom>
                Check Card Balance
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField fullWidth label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
                    margin="normal" placeholder="Enter 16-digit card number" inputProps={{maxLength: 16, pattern: '[0-9]*'}}
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={requirePin}
                            onChange={(e) => setRequirePin(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Require PIN"
                    sx={{ my: 1 }}
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

            {/* PIN Dialog */}
            <Dialog
                open={pinDialogOpen}
                onClose={() => setPinDialogOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Enter PIN</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="PIN" type="password" fullWidth value={pin}
                        onChange={(e) => setPin(e.target.value)} inputProps={{maxLength: 4, pattern: '[0-9]*',}}
                        placeholder="Enter 4-digit PIN"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPinDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handlePinSubmit} variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};