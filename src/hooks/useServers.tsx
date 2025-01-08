import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

interface FetchServerListResponse {
    name: string;
    region: string;
    worlds: string[];
};

const useServers = () => {
    const [serverList, setServerList] = useState<FetchServerListResponse[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        apiClient.get('/data-centers', { signal: controller.signal })
            .then(response => {
                setServerList(response.data.serverList);
            })
            .catch(error => {
                if (error instanceof CanceledError) {
                    return;
                }
                console.error('Error fetching data:', error);
                setError(error.message)
            });

        return () => controller.abort();
    }, []);

    return { serverList, error };
};

export default useServers;