// components/Carousel.tsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SectionHeader from '@/app/components/SectionHeader';
import { useRouter } from 'next/navigation';
import { fetchGovernorates } from '@/services/api';
const Carousel: React.FC = () => {
    const router = useRouter();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
    };

    const destinationsD = [
        { name: 'Giza', tours: '100+ Tours', imageUrl: '/images/giza.jpeg' },
        { name: 'Alexandria', tours: '600+ Tours', imageUrl: '/images/alexandria.png' },
        { name: 'Sinai', tours: '200+ Tours', imageUrl: '/images/sinai.jpeg' },
    ];
    let [destinations, setDestinations] = useState<any[]>(destinationsD);
    useEffect(() => {
        const getData = async () => {
            const result = await fetchGovernorates();
            if (result.length > 0) {
                setDestinations(result);
            }
        };
        getData();
    }, []);

    return (
        <div style={styles.container}>
            <SectionHeader
                title="المحافظات المتطلبة"
                onSeeAll={() => router.push('/governorate')}
            />
            <Slider {...settings}>
                {destinations.map((destination, index) => (
                    <div key={index} style={styles.slide}>
                        <img src={destination.imageUrl} alt={destination.name} style={styles.image} />
                        <h3 style={styles.destinationName}>{destination.name}</h3>
                        <p style={styles.tours}>{destination.tours}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center' as 'center',
        padding: '40px 40px',
        position: 'relative' as 'relative',
    },
    header: {
        padding: '0px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold' as 'bold',
        color: '#000080',
    },
    seeAll: {
        color: '#000080',
        textDecoration: 'none',
    },
    slide: {
        padding: '10px',
    },
    image: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover' as 'cover',
        margin: '0 auto',
    },
    destinationName: {
        fontSize: '16px',
        fontWeight: 'bold' as 'bold',
        color: '#000080',
    },
    tours: {
        fontSize: '14px',
        color: '#555',
    },
};

export default Carousel;