import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { CardBalanceChecker } from './components/CardBalanceChecker';

const theme = createTheme({
    palette: {
        background: {
            default: '#f0f2f5',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'radial-gradient(#387989, #6dd5ed)',
                    py: 4,
                }}
            >
                <Container maxWidth="sm">
                    <CardBalanceChecker />
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;