import Box from '@mui/material/Box';
import SearchInput from './components/SearchInput';
import ThemeToggle from './components/ToggleColorMode';
import ServerList from './components/ServerList';

function App() {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1,
                minHeight: '100vh',
                gridTemplateAreas: `
                    "searchinput . . togglecolormode"
                    "item . . ."
                    "server server server server"
                `,
            }}
        >
            <Box sx={{ gridArea: 'searchinput' }}>
                <SearchInput />
            </Box>
            <Box sx={{ gridArea: 'togglecolormode', display: 'flex', justifyContent: 'flex-end' }}>
                <ThemeToggle />
            </Box>
            <Box sx={{ gridArea: 'item', bgcolor: 'secondary.main', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                Item Image Icon and Description
            </Box>
            <Box sx={{ gridArea: 'server', bgcolor: 'background.paper', p: 2 }}>
                <ServerList />
            </Box>
        </Box>
    );
}

export default App;