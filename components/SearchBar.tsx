// components/SearchBar.tsx
import React, { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar: React.FC = () => {
    const router = useRouter();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.push('/search-results');
    };

    return (
        <form onSubmit={handleSearch} style={styles.searchBar}>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Where</label>
                <input type="text" placeholder="Search destinations" style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>When</label>
                <input type="text" placeholder="February 05 ~ March 14" style={styles.input} />
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.label}>Tour Type</label>
                <input type="text" placeholder="All tour" style={styles.input} />
            </div>
            <button type="submit" style={styles.button}>Search</button>
        </form>
    );
};

const styles = {
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'flex-start',
        margin: '0 5px',
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold' as 'bold',
        color: '#000080',
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        width: '150px',
    },
    button: {
        backgroundColor: '#f60',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
};

export default SearchBar;