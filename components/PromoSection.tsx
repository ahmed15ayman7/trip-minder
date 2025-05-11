// components/PromoSection.tsx
import React from 'react';

const PromoSection: React.FC = () => {
    return (
        <div style={styles.container}>
            <div style={styles.textSection}>
                <h1 style={styles.title}>
                    Grab up to <span style={styles.discount}>35% off</span> on your favorite Destination
                </h1>
                <p style={styles.subtitle}>
                    Limited time offer, don't miss the opportunity
                </p>
                <button style={styles.button}>Book Now</button>
            </div>
            <div style={styles.imageSection}>
                <svg
                    style={styles.wave}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                >
                    <path
                        fill="#f9f9f9"
                        fillOpacity="1"
                        d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,245.3C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
                <img src="/images/promo.png" alt="Promo" style={styles.image} />
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        position: 'relative',
    },
    textSection: {
        flex: 1,
        padding: '40px',
        background: '#f9f9f9',
        position: 'relative',
        zIndex: 1,
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#000080',
        marginBottom: '20px',
    },
    discount: {
        color: '#f60',
    },
    subtitle: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '20px',
    },
    button: {
        backgroundColor: '#f60',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        cursor: 'pointer',
    },
    imageSection: {
        flex: 1,
        position: 'relative',
    },
    wave: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'relative',
        zIndex: 1,
    },
};

export default PromoSection;