import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
// import { fetchAccommodations } from '../services/api';
import { useRouter } from 'next/navigation';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SectionHeader from '../app/components/SectionHeader';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { fetchAccommodations } from '@/services/api';

interface Accommodation {
    id: number;
    name: string;
    accomodationType: string;
    averagePricePerAdult: number;
    description: string;
    address: string;
    imageUrl: string | null;
}

const defaultImage = '/images/default.png';
const staticData: Accommodation[] = [
    {
        id: 1,
        name: "فندق النيل الفاخر",
        accomodationType: "فندق",
        averagePricePerAdult: 350,
        description: "إقامة فاخرة وإطلالة رائعة على النيل.",
        address: "كورنيش النيل، القاهرة",
        imageUrl: defaultImage,
    },
    {
        id: 2,
        name: "شاليه البحر الأحمر",
        accomodationType: "شاليه",
        averagePricePerAdult: 250,
        description: "شاليه بإطلالة مباشرة على البحر.",
        address: "الغردقة، البحر الأحمر",
        imageUrl: defaultImage,
    },
    {
        id: 3,
        name: "فندق النيل الفاخر",
        accomodationType: "فندق",
        averagePricePerAdult: 350,
        description: "إقامة فاخرة وإطلالة رائعة على النيل.",
        address: "كورنيش النيل، القاهرة",
        imageUrl: defaultImage,
    },
    // ... أضف حتى 12 عنصر افتراضي
];

const AccommodationListCarousel: React.FC = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchAccommodations();
                if (result.data && result.data.length > 0) {
                    setAccommodations(result.data);
                } else {
                    setAccommodations(staticData);
                }
                setAccommodations(staticData);
            } catch (error) {
                setAccommodations(staticData);
            }
        };
        getData();
    }, []);

    const handleCardClick = (id: number) => {
        router.push(`/accommodation/${id}`);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow style={{ background: '#ff6600' }} />,
        prevArrow: <PrevArrow style={{ background: '#ff6600' }} />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    spaceBetween: 10,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    spaceBetween: 10,
                },
            },
        ],
    };

    return (
        <Box sx={{ py: 4, px: 5 }}>
            <SectionHeader
                title="أماكن الإقامة الأكثر رواجاً"
                onSeeAll={() => router.push('/accommodation')}
            />
            <Slider {...settings}>
                {accommodations.slice(0, 12).map((accommodation) => (
                    <Box key={accommodation.id} px={1}>
                        <Card
                            sx={{
                                border: '1px solid #eee',
                                borderRadius: 2,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                cursor: 'pointer',
                                background: '#fff',
                                transition: 'transform 0.2s',
                                height: '100%',
                                '&:hover': { transform: 'scale(1.03)' },
                            }}
                            onClick={() => handleCardClick(accommodation.id)}
                        >
                            <div style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover' as 'cover', backgroundImage: `url(${accommodation.imageUrl || defaultImage})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                            }} />
                            <CardContent>
                                <Typography variant="h6" sx={{ color: '#ff6600', fontWeight: 'bold' }} gutterBottom noWrap>
                                    {accommodation.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {accommodation.address}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                                    {accommodation.description}
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#ff6600', fontWeight: 'bold', mt: 1, textAlign: 'right' }}>
                                    من {accommodation.averagePricePerAdult} جنيه
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: '#ff6600', borderRadius: '50%' }}
            onClick={onClick}
        />
    );
};

const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: '#ff6600', borderRadius: '50%' }}
            onClick={onClick}
        />
    );
};

export default AccommodationListCarousel;