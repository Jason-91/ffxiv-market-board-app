import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface Item {
    Icon: {
        id: number;
        path: string;
        path_hr1: string;
    };
    Name: string;
    Singular: string;
}

const SearchInput: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<Item[]>([]);
    const loading = open && options.length === 0;
    const [searchTerm, setSearchTerm] = useState('');
    const backendURL = "http://localhost:8000";

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        const fetchItems = async () => {
            try {
                const response = await axios.get<Item[]>(`${backendURL}/items?item=${searchTerm.trim()}`);
                if (active) {
                    setOptions(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchItems();

        return () => {
            active = false;
        };
    }, [loading, searchTerm]);

    const handleInputChange = (_event: any, newInputValue: string) => {
        setSearchTerm(newInputValue);
        if (newInputValue.trim() === "") {
            setOpen(false);
            setOptions([]); // Clear options when input is empty
        } else {
            setOpen(true);
        }
    };

    return (
        <Autocomplete
            id="search-items"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionLabel={(option) => option.Name}
            isOptionEqualToValue={(option, value) => option.Name === value.Name}
            options={options}
            loading={loading}
            onInputChange={handleInputChange}
            renderInput={(params) => (
                <TextField {...params} label="Search for an item..." />
            )}
        />
    );
};

export default SearchInput;