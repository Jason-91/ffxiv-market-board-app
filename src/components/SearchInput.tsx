import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Item[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const backendURL = "http://localhost:8000"; // Important: Make sure this is correct!
    const dropdownRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        let isMounted = true;

        const fetchItems = async () => {
            if (searchTerm.trim() === '') {
                setSearchResults(null);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const response = await axios.get<Item[]>(`${backendURL}/items?item=${searchTerm.trim()}`);
                if (isMounted) {
                    setSearchResults(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                if (isMounted) {
                    setSearchResults(null);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (searchTerm.trim() !== '') {
            timer = setTimeout(() => {
                fetchItems();
            }, 300);
        } else {
            setSearchResults(null);
            setIsDropdownOpen(false);
        }

        return () => {
            clearTimeout(timer);
            isMounted = false;
        };
    }, [searchTerm, backendURL]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleItemClick = (itemName: string) => {
        setSearchTerm(itemName);
        setSearchResults(null);
        setIsDropdownOpen(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setIsDropdownOpen(true);
    };

    return (
        <div style={{ position: 'relative', width: '300px' }}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search for an item..."
                style={{ width: '100%' }}
                ref={inputRef}
            />

            {isLoading && <div>Loading...</div>}

            {searchResults && searchResults.length > 0 && isDropdownOpen && (
                <ul
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        zIndex: 1,
                        listStyleType: 'none',
                        padding: 0,
                        margin: 0,
                    }}
                    ref={dropdownRef}
                >
                    {searchResults.map((item) => (
                        <li
                            key={item.Name}
                            onClick={() => handleItemClick(item.Name)}
                            style={{ padding: '5px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                        >
                            {item.Name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;