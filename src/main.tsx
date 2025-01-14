import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App.tsx';
import { store } from './store';
import createCustomTheme from './theme';
import { RootState } from './store';

const RootApp = () => {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const theme = createCustomTheme(mode);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    );
};

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <StrictMode>
            <RootApp />
        </StrictMode>
    </Provider>,
);