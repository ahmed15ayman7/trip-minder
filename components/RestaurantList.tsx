// components/RestaurantList.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Rating, Chip, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import SectionHeader from '../app/components/SectionHeader';

interface Restaurant {
    id: number;
    name: string;
    foodCategoryId: number;
    placeTypeId: number;
    classId: number;
    zoneId: number;
    averagePricePerAdult: number;
    hasKidsArea: boolean;
    tripSuggestionId: number;
    address: string;
    contactLink: string;
    description: string;
    imageSource: string | null;
    mapLink: string;
    rating: number;
    score: number;
}

const defaultImage = '/images/default.png';
const staticData: Restaurant[] = [
    {
        id: 1,
        name: 'مطعم أبو السيد',
        foodCategoryId: 1,
        placeTypeId: 1,
        classId: 1,
        zoneId: 1,
        averagePricePerAdult: 120,
        hasKidsArea: true,
        tripSuggestionId: 1,
        address: 'شارع النيل، الزمالك، القاهرة',
        contactLink: '',
        description: 'أشهر الأكلات المصرية في أجواء تراثية.',
        imageSource: defaultImage,
        mapLink: '',
        rating: 4.7,
        score: 250,
    },
    {
        id: 2,
        name: 'مطعم الدوار',
        foodCategoryId: 2,
        placeTypeId: 1,
        classId: 1,
        zoneId: 2,
        averagePricePerAdult: 200,
        hasKidsArea: false,
        tripSuggestionId: 2,
        address: 'برج القاهرة، الجزيرة، القاهرة',
        contactLink: '',
        description: 'إطلالة بانورامية على القاهرة مع أطباق عالمية.',
        imageSource: defaultImage,
        mapLink: '',
        rating: 4.8,
        score: 180,
    },
    {
        id: 3,
        name: 'مطعم أسماك البحر',
        foodCategoryId: 3,
        placeTypeId: 1,
        classId: 1,
        zoneId: 3,
        averagePricePerAdult: 170,
        hasKidsArea: true,
        tripSuggestionId: 3,
        address: 'كورنيش الإسكندرية، الإسكندرية',
        contactLink: '',
        description: 'أفضل المأكولات البحرية الطازجة.',
        imageSource: defaultImage,
        mapLink: '',
        rating: 4.6,
        score: 140,
    },
    // ... أضف حتى 5 مطاعم افتراضية
];

const RestaurantList: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            try {
                // const result = await fetchRestaurants();
                // if (result.data && result.data.length > 0) {
                //     setRestaurants(result.data);
                // } else {
                //     setRestaurants(staticData);
                // }
                setRestaurants(staticData);
            } catch (error) {
                setRestaurants(staticData);
            }
        };
        getData();
    }, []);

    const handleCardClick = (id: number) => {
        router.push(`/restaurants/${id}`);
    };

    return (
        <div style={styles.container}>
            <SectionHeader
                title="المطاعم الشهيرة"
                onSeeAll={() => router.push('/restaurants')}
            />
            <div style={styles.grid}>
                {restaurants.slice(0, 5).map((restaurant) => (
                    <div key={restaurant.id} style={styles.card} onClick={() => handleCardClick(restaurant.id)}>
                        <div style={styles.imageContainer}>
                            <img
                                src={restaurant.imageSource || defaultImage}
                                alt={restaurant.name}
                                style={styles.image}
                            />
                            {restaurant.hasKidsArea && (
                                <Chip
                                    label="منطقة أطفال"
                                    color="primary"
                                    size="small"
                                    style={styles.kidsAreaChip}
                                />
                            )}
                        </div>
                        <div style={styles.info}>
                            <h3 style={styles.name}>{restaurant.name}</h3>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Rating value={restaurant.rating} readOnly size="small" />
                                <span style={styles.score}>({restaurant.score})</span>
                            </Box>
                            <p style={styles.description}>{restaurant.description}</p>
                            <div style={styles.details}>
                                <div style={styles.detailItem}>
                                    <LocationOnIcon fontSize="small" />
                                    <span>{restaurant.address}</span>
                                </div>
                                {restaurant.contactLink && (
                                    <div style={styles.detailItem}>
                                        <PhoneIcon fontSize="small" />
                                        <a href={restaurant.contactLink} target="_blank" rel="noopener noreferrer" style={styles.link}>
                                            اتصل بنا
                                        </a>
                                    </div>
                                )}
                                {restaurant.mapLink && (
                                    <div style={styles.detailItem}>
                                        <MapIcon fontSize="small" />
                                        <a href={restaurant.mapLink} target="_blank" rel="noopener noreferrer" style={styles.link}>
                                            عرض على الخريطة
                                        </a>
                                    </div>
                                )}
                            </div>
                            <p style={styles.price}>من {restaurant.averagePricePerAdult} جنيه</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px 20px',
        position: 'relative' as 'relative',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold' as 'bold',
        color: '#ff6600',
    },
    seeAll: {
        position: 'absolute' as 'absolute',
        right: '20px',
        top: '20px',
        color: '#ff6600',
        textDecoration: 'none',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
    },
    imageContainer: {
        position: 'relative' as 'relative',
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover' as 'cover',
    },
    kidsAreaChip: {
        position: 'absolute' as 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: '#ff6600',
    },
    info: {
        padding: '15px',
    },
    name: {
        fontSize: '18px',
        fontWeight: 'bold' as 'bold',
        color: '#333',
        marginBottom: '8px',
    },
    description: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '12px',
        display: '-webkit-box',
        overflow: 'hidden',
    },
    details: {
        marginBottom: '12px',
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        marginBottom: '5px',
        fontSize: '14px',
        color: '#666',
    },
    link: {
        color: '#ff6600',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    price: {
        fontSize: '16px',
        textAlign: 'right' as 'right',
        color: '#ff6600',
        fontWeight: 'bold' as 'bold',
    },
    score: {
        marginLeft: '5px',
        color: '#666',
        fontSize: '14px',
    },
};

export default RestaurantList;