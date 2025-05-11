// components/PopularActivities.tsx
import SectionHeader from '@/app/components/SectionHeader';
import React from 'react';
import { useRouter } from 'next/navigation';
interface Activity {
    name: string;
    image: string;
}

const activities: Activity[] = [
    { name: 'Cruises', image: '/images/cruises.png' },
    { name: 'City Tours', image: '/images/city-tours.png' },
    { name: 'Museum Tour', image: '/images/museum-tour.png' },
    { name: 'Beach Tours', image: '/images/beach-tours.png' },
    { name: 'Food', image: '/images/food.png' },
    { name: 'Hiking', image: '/images/hiking.png' },
];

const PopularActivities: React.FC = () => {
    const router = useRouter();
    return (
        <div style={styles.container}>
            <SectionHeader
                title="الأنشطة الشعبية"
                onSeeAll={() => router.push('/tourism-area')}
            />
            <div style={styles.grid}>
                {activities.map((activity, index) => (
                    <div key={index} style={styles.card}>
                        <img src={activity.image} alt={activity.name} style={styles.image} />
                        <div style={styles.overlay}>
                            <span style={styles.text}>{activity.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '40px 20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#000080',
    },
    seeAll: {
        color: '#000080',
        textDecoration: 'none',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
    },
    card: {
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    overlay: {
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        textAlign: 'center',
    },
    text: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default PopularActivities;