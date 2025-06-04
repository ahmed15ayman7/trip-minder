import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Rating, Chip } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import SectionHeader from './SectionHeader';
import { useRouter } from 'next/navigation';

interface Entertainment {
    id: number;
    name: string;
    description: string | null;
    rating: number;
    score: number;
    address: string;
    entertainmentType: string;
    hasKidsArea: boolean;
    imageUrl: string | null;
    averagePricePerAdult: number;
}

const defaultImage = '/images/default.png';
const staticData: Entertainment[] = [
    {
        id: 1,
        name: 'مدينة الملاهي السعيدة',
        description: 'أفضل مدينة ملاهي للعائلات والأطفال.',
        rating: 4.7,
        score: 120,
        address: 'شارع المرح، القاهرة',
        entertainmentType: 'ملاهي',
        hasKidsArea: true,
        imageUrl: defaultImage,
        averagePricePerAdult: 150,
    },
    {
        id: 2,
        name: 'مركز الألعاب الإلكترونية',
        description: 'أحدث ألعاب الفيديو والواقع الافتراضي.',
        rating: 4.3,
        score: 80,
        address: 'مول سيتي ستارز، القاهرة',
        entertainmentType: 'ألعاب إلكترونية',
        hasKidsArea: false,
        imageUrl: defaultImage,
        averagePricePerAdult: 100,
    },
    {
        id: 3,
        name: 'حديقة الحيوان',
        description: 'تجربة ممتعة مع الحيوانات.',
        rating: 4.0,
        score: 200,
        address: 'الجيزة',
        entertainmentType: 'حديقة',
        hasKidsArea: true,
        imageUrl: defaultImage,
        averagePricePerAdult: 50,
    },
    {
        id: 4,
        name: 'مدينة الملاهي السعيدة',
        description: 'أفضل مدينة ملاهي للعائلات والأطفال.',
        rating: 4.7,
        score: 120,
        address: 'شارع المرح، القاهرة',
        entertainmentType: 'ملاهي',
        hasKidsArea: true,
        imageUrl: defaultImage,
        averagePricePerAdult: 150,
    },
    {
        id: 5,
        name: 'مركز الألعاب الإلكترونية',
        description: 'أحدث ألعاب الفيديو والواقع الافتراضي.',
        rating: 4.3,
        score: 80,
        address: 'مول سيتي ستارز، القاهرة',
        entertainmentType: 'ألعاب إلكترونية',
        hasKidsArea: false,
        imageUrl: defaultImage,
        averagePricePerAdult: 100,
    },
    // ... أضف حتى 20 عنصر افتراضي
];

const EntertainmentCarousel = () => {
    const [entertainments, setEntertainments] = useState<Entertainment[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchEntertainments = async () => {
            try {
                const response = await axios.get('/api/entertainment/list');
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setEntertainments(response.data.data.slice(0, 20));
                } else {
                    setEntertainments(staticData);
                }
            } catch (error) {
                setEntertainments(staticData);
            }
        };
        fetchEntertainments();
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <Box sx={{ py: 4 }}>
            <SectionHeader
                title="أماكن الترفيه المميزة"
                onSeeAll={() => router.push('/entertainment')}
            />
            <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
                {entertainments.map((entertainment) => (
                    <Box key={entertainment.id} sx={{ px: 1 }}>
                        <Card sx={{ height: '100%', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', border: '1px solid #eee' }} onClick={() => router.push(`/entertainment/${entertainment.id}`)}>
                            <div style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover' as 'cover', backgroundImage: `url(${entertainment.imageUrl || defaultImage})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                            }} />
                            <CardContent>
                                <Typography variant="h6" gutterBottom noWrap sx={{ color: '#ff6600', fontWeight: 'bold' }}>
                                    {entertainment.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating value={entertainment.rating} readOnly size="small" />
                                    <Typography variant="body2" sx={{ ml: 1, color: '#666' }}>
                                        ({entertainment.score})
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {entertainment.address}
                                </Typography>
                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                    <Chip
                                        label={entertainment.entertainmentType}
                                        size="small"
                                        sx={{ background: '#ff6600', color: '#fff' }}
                                    />
                                    {entertainment.hasKidsArea && (
                                        <Chip
                                            label="منطقة أطفال"
                                            size="small"
                                            color="primary"
                                        />
                                    )}
                                </Box>
                                <Typography variant="h6" sx={{ mt: 1, color: '#ff6600', fontWeight: 'bold' }}>
                                    {entertainment.averagePricePerAdult} جنيه
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default EntertainmentCarousel; 