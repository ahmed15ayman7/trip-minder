import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Rating, Chip } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import SectionHeader from './SectionHeader';
import { useRouter } from 'next/navigation';

export interface TourismArea {
    id: number;
    name: string;
    description: string | null;
    classType: string;
    zone: string;
    zoneId: number;
    governorate: string;
    governorateId: number;
    rating: number;
    averagePricePerAdult: number;
    tourismType: string;
    hasKidsArea: boolean;
    address: string;
    mapLink: string | null;
    contactLink: string | null;
    imageUrl: string | null;
    placeType: "Tourism Area";
    score: number;
}

const defaultImage = '/images/default.png';
const staticData: TourismArea[] = [
    {
        id: 1,
        name: 'منطقة الأهرامات',
        description: 'زيارة لأعظم عجائب الدنيا.',
        classType: 'A',
        zone: 'الجيزة',
        zoneId: 1,
        governorate: 'الجيزة',
        governorateId: 1,
        rating: 4.9,
        averagePricePerAdult: 200,
        tourismType: 'تاريخية',
        hasKidsArea: false,
        address: 'الجيزة',
        mapLink: null,
        contactLink: null,
        imageUrl: defaultImage,
        placeType: 'Tourism Area',
        score: 300,
    },
    {
        id: 2,
        name: 'واحة سيوة',
        description: 'جمال الطبيعة والهدوء.',
        classType: 'B',
        zone: 'مطروح',
        zoneId: 2,
        governorate: 'مطروح',
        governorateId: 2,
        rating: 4.7,
        averagePricePerAdult: 180,
        tourismType: 'طبيعية',
        hasKidsArea: true,
        address: 'سيوة',
        mapLink: null,
        contactLink: null,
        imageUrl: defaultImage,
        placeType: 'Tourism Area',
        score: 120,
    },
    {
        id: 3,
        name: 'منطقة الأهرامات',
        description: 'زيارة لأعظم عجائب الدنيا.',
        classType: 'A',
        zone: 'الجيزة',
        zoneId: 1,
        governorate: 'الجيزة',
        governorateId: 1,
        rating: 4.9,
        averagePricePerAdult: 200,
        tourismType: 'تاريخية',
        hasKidsArea: false,
        address: 'الجيزة',
        mapLink: null,
        contactLink: null,
        imageUrl: defaultImage,
        placeType: 'Tourism Area',
        score: 300,
    },
    {
        id: 4,
        name: 'منطقة الأهرامات',
        description: 'زيارة لأعظم عجائب الدنيا.',
        classType: 'A',
        zone: 'الجيزة',
        zoneId: 1,
        governorate: 'الجيزة',
        governorateId: 1,
        rating: 4.9,
        averagePricePerAdult: 200,
        tourismType: 'تاريخية',
        hasKidsArea: false,
        address: 'الجيزة',
        mapLink: null,
        contactLink: null,
        imageUrl: defaultImage,
        placeType: 'Tourism Area',
        score: 300,
    },
    // ... أضف حتى 20 عنصر افتراضي
];

const TourismAreaCarousel = () => {
    const [tourismAreas, setTourismAreas] = useState<TourismArea[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchTourismAreas = async () => {
            try {
                const response = await axios.get('/api/tourism-area/list');
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setTourismAreas(response.data.data.slice(0, 20));
                } else {
                    setTourismAreas(staticData);
                }
            } catch (error) {
                setTourismAreas(staticData);
            }
        };
        fetchTourismAreas();
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
                title="المناطق السياحية المميزة"
                onSeeAll={() => router.push('/tourism-area')}
            />
            <Carousel responsive={responsive}>
                {tourismAreas.map((area) => (
                    <Box key={area.id} sx={{ px: 1 }}>
                        <Card sx={{ height: '100%', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', border: '1px solid #eee' }} onClick={() => router.push(`/tourism-area/${area.id}`)}>
                            <div style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover' as 'cover', backgroundImage: `url(${area.imageUrl || defaultImage})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                            }} />
                            <CardContent>
                                <Typography variant="h6" gutterBottom noWrap sx={{ color: '#ff6600', fontWeight: 'bold' }}>
                                    {area.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating value={area.rating} readOnly size="small" />
                                    <Typography variant="body2" sx={{ ml: 1, color: '#666' }}>
                                        ({area.score})
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {area.address}
                                </Typography>
                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                    <Chip
                                        label={area.tourismType}
                                        size="small"
                                        sx={{ background: '#ff6600', color: '#fff' }}
                                    />
                                    {area.hasKidsArea && (
                                        <Chip
                                            label="منطقة أطفال"
                                            size="small"
                                            color="primary"
                                        />
                                    )}
                                </Box>
                                <Typography variant="h6" sx={{ mt: 1, color: '#ff6600', fontWeight: 'bold' }}>
                                    {area.averagePricePerAdult} جنيه
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default TourismAreaCarousel; 