import React from 'react';

const PromoSection = () => {
    return (
        <div style={styles.container} >
            <div style={styles.textContainer}>
                <h1 style={styles.title}>Get 5% off your 1st app booking</h1>
                <p style={styles.subtitle}>
                    Booking's better on the app. Use promo code "TourBooking" to save!
                </p>
                <p style={styles.emailPrompt}>Get a magic link sent to your email</p>
                <div style={styles.emailContainer}>
                    <input type="email" placeholder="Email" style={styles.emailInput} />
                    <button style={styles.sendButton}>Send</button>
                </div>
            </div>
            <div style={styles.imageContainer}>
                <img src="/images/phone.png" alt="Phone 1" style={styles.phoneImage1} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center' as 'center',
        justifyContent: 'space-between',
        backgroundColor: '#4A3AFF',
        padding: '40px',
        borderRadius: '16px',
        color: 'white',
        backgroundImage: 'url(/images/promo-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '514px',
    },
    textContainer: {
        maxWidth: '50%',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold' as 'bold',
        marginBottom: '20px',
    },
    subtitle: {
        fontSize: '16px',
        marginBottom: '20px',
    },
    emailPrompt: {
        fontSize: '16px',
        marginBottom: '10px',
    },
    emailContainer: {
        display: 'flex',
        alignItems: 'center' as 'center',
    },
    emailInput: {
        padding: '10px',
        borderRadius: '8px',
        border: 'none',
        borderBottom: '1px solid #fff',
        marginRight: '10px',
        flex: '1',
    },
    sendButton: {
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#fff',
        color: '#4A3AFF',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    imageContainer: {
        position: 'relative' as 'relative',
        width: '50%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    phoneImage1: {
        width: '100%',
        position: 'absolute' as 'absolute',
        right: '0',
        bottom: '0',
        transform: 'translateY(50%)',
    },
    phoneImage2: {
        width: '75%',
        position: 'absolute' as 'absolute',
        right: '0',
        transform: 'translateX(25%)',
    },
};

export default PromoSection;