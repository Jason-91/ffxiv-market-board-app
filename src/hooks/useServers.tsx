import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

interface ServerData {
  name: string;
  region: string;
  worlds: string[];
}

const useServers = () => {
  const [serverList, setServerList] = useState<ServerData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<{
        status: 'success' | 'error';
        message: string | null;
        data: { serverList: ServerData[] };
      }>('/data-centers', { signal: controller.signal })
      .then((response) => {
        if (response.data.status === 'success') {
          setServerList(response.data.data.serverList);
        } else {
          setError(response.data.message || 'Failed to fetch data centers');
        }
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError('Failed to fetch data centers');
    })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { serverList, error, loading };
};

export default useServers;