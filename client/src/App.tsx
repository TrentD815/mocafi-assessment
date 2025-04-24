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
                    py: 4,
                    backgroundColor: theme.palette.background.default,
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