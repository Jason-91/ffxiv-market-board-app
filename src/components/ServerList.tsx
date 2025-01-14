import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Paper,
    Typography,
    CircularProgress,
    styled,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import useServers from '../hooks/useServers';

interface ServerData {
    name: string;
    region: string;
    worlds: string[];
}

const ServerButton = styled(Button)(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }));

  const WorldButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    border: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(0.5),
    '&:hover':{
        backgroundColor: theme.palette.action.hover,
    },
}));

const ServerList: React.FC = () => {
    const { serverList, error, loading } = useServers();
    const [selectedServer, setSelectedServer] = useState<string | null>(null);
    const [currentWorlds, setCurrentWorlds] = useState<string[]>([]);

    useEffect(() => {
        if (serverList && selectedServer) {
            const server = serverList.find((s) => s.name === selectedServer);
            setCurrentWorlds(server ? server.worlds : []);
        } else {
            setCurrentWorlds([]);
        }
    }, [selectedServer, serverList]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!serverList) {
        return <Typography>No server data available.</Typography>;
    }

    const servers: ServerData[] = serverList.filter(
        (server): server is ServerData => server.region === 'North-America'
    );

    const handleServerClick = (server: string) => {
        setSelectedServer(server);
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Server List</Typography>
            <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Typography variant="subtitle1">North America:</Typography>
                    </Grid>
                    {servers.map((server) => (
                         <Grid key={server.name} size='grow' sx={{ display: 'flex', alignItems: 'center' }}>
                            <ServerButton
                                onClick={() => handleServerClick(server.name)}
                                variant={selectedServer === server.name ? 'contained' : 'outlined'}
                            >
                                {server.name}
                            </ServerButton>
                        </Grid>
                    ))}
                </Grid>

                {currentWorlds.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>Worlds</Typography>
                        <ButtonGroup variant="outlined" fullWidth>
                            {currentWorlds.map((world) => (
                                <WorldButton key={world}>{world}</WorldButton>
                            ))}
                        </ButtonGroup>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default ServerList;