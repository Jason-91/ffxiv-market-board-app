import React from 'react';
import useServers from "../hooks/useServers";

const ServerList: React.FC = () => {
    const { serverList, error } = useServers();

    return (
        <>
            {error && <p>{error}</p>}
            <h2>Server List</h2>
            <ul>
                {serverList.map((server) => (
                    <li key={server.name}>
                        <strong>{server.name}</strong>
                        <p>Region: {server.region}</p>
                        <p>Worlds:</p>
                        <ul>
                            {server.worlds.map((world: string, index: number) => (
                                <li key={index}>{world}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ServerList;