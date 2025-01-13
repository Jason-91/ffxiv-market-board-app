import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Typography,
  CircularProgress,
  Grid2,
} from '@mui/material';
import useServers from '../hooks/useServers';

interface ServerData {
  name: string;
  region: string;
  worlds: string[];
}

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
      <Typography variant="h6" gutterBottom>
        Server List
      </Typography>

      <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
        <Grid2 container spacing={2} alignItems="center">
          <Grid2 item xs={12} sm="auto">
            <Typography>North America:</Typography>
          </Grid2>
          {servers.map((server: ServerData) => (
            <Grid2 item key={server.name} xs={6} sm={3} md={2}>
              <Button
                onClick={() => handleServerClick(server.name)}
                variant={selectedServer === server.name ? 'contained' : 'outlined'}
                sx={{ width: '100%', boxSizing: 'border-box' }}
              >
                {server.name}
              </Button>
            </Grid2>
          ))}
        </Grid2>

        {currentWorlds.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Worlds
            </Typography>
            <ButtonGroup variant="outlined">
              {currentWorlds.map((world) => (
                <Button key={world} sx={{ whiteSpace: 'nowrap' }}>
                  {world}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ServerList;