import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

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
            <span>React frontend skeleton</span>
        </ThemeProvider>
    );
}

export default App;