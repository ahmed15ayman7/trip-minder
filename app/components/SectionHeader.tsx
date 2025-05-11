import React from 'react';

interface SectionHeaderProps {
    title: string;
    onSeeAll?: () => void;
    seeAllText?: string;
    isSeeAll?: boolean;
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px',
        marginBottom: '10px',
        marginTop: '10px',
    } as React.CSSProperties,
    title: {
        fontSize: '24px',
        fontWeight: 'bold' as 'bold',
        color: '#ff6600',
        margin: 0,
        direction: 'rtl' as 'rtl',
    },
    seeAll: {
        color: '#ff6600',
        textDecoration: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        marginLeft: '10px',
        direction: 'rtl' as 'rtl',
    },
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onSeeAll, seeAllText = 'عرض الكل', isSeeAll = true }) => (
    <div style={styles.container}>
        <h2 style={styles.title}>{title}</h2>
        {isSeeAll && (
            <span style={styles.seeAll} onClick={onSeeAll}>{seeAllText}</span>
        )}
    </div>
);

export default SectionHeader; 