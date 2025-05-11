"use client";
import React, { use, useEffect, useState } from "react";
import { Box, Container, Typography, CircularProgress, Divider } from "@mui/material";
import SectionHeader from "../../components/SectionHeader";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
interface Governorate {
    id: number;
    name: string;
    description?: string;
}

interface Accommodation {
    id: number;
    name: string;
    imageSource: string | null;
    averagePricePerAdult: number;
    description: string;
}
interface Restaurant {
    id: number;
    name: string;
    imageSource: string | null;
    averagePricePerAdult: number;
    description: string;
}
interface Entertainment {
    id: number;
    name: string;
    imageSource: string | null;
    averagePricePerAdult: number;
    description: string;
}
interface TourismArea {
    id: number;
    name: string;
    imageSource: string | null;
    averagePricePerAdult: number;
    description: string;
}

const defaultImage = '/images/default.png';

const SectionCarousel = ({ title, items, onSeeAll, type }: { title: string, items: any[], onSeeAll: () => void, type: string }) => {
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
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
        ],
    };
    return (
        <Box sx={{ py: 3 }}>
            <SectionHeader title={title} onSeeAll={onSeeAll} />
            <Slider {...settings}>
                {items.map((item, idx) => (
                    <Box key={item.id} px={1}>
                        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }}>
                            <Box
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
                                onClick={() => window.location.href = `/${type}/${item.id}`}
                            >
                                <img
                                    src={item.imageSource || defaultImage}
                                    alt={item.name}
                                    style={{ width: '100%', height: 150, objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                                />
                                <Box sx={{ p: 2 }}>
                                    <Typography variant="h6" sx={{ color: '#ff6600', fontWeight: 'bold' }} gutterBottom noWrap>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#555', mb: 1 }} noWrap>
                                        {item.description}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: '#ff6600', fontWeight: 'bold', textAlign: 'right' }}>
                                        من {item.averagePricePerAdult} جنيه
                                    </Typography>
                                </Box>
                            </Box>
                        </motion.div>
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

const GovernorateDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [loading, setLoading] = useState(true);
    const [governorate, setGovernorate] = useState<Governorate | null>(null);
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [entertainments, setEntertainments] = useState<Entertainment[]>([]);
    const [tourismAreas, setTourismAreas] = useState<TourismArea[]>([]);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                // Governorate info
                const govRes = await fetch(`/api/governorate/${id}`);
                const govData = await govRes.json();
                setGovernorate(govData.data || { id, name: 'محافظة افتراضية', description: 'وصف افتراضي للمحافظة.' });
                // Accommodations
                const accRes = await fetch(`/api/accommodation/governorate/${id}`);
                const accData = await accRes.json();
                setAccommodations(accData.data && accData.data.length > 0 ? accData.data : [
                    { id: 1, name: 'فندق النيل', imageSource: defaultImage, averagePricePerAdult: 350, description: 'فندق فاخر على النيل.' },
                    { id: 2, name: 'شاليه البحر', imageSource: defaultImage, averagePricePerAdult: 250, description: 'شاليه بإطلالة بحرية.' },
                ]);
                // Restaurants
                const restRes = await fetch(`/api/restaurant/governorate/${id}`);
                const restData = await restRes.json();
                setRestaurants(restData.data && restData.data.length > 0 ? restData.data : [
                    { id: 1, name: 'مطعم أبو السيد', imageSource: defaultImage, averagePricePerAdult: 120, description: 'أشهر الأكلات المصرية.' },
                    { id: 2, name: 'مطعم الدوار', imageSource: defaultImage, averagePricePerAdult: 200, description: 'إطلالة بانورامية.' },
                ]);
                // Entertainments
                const entRes = await fetch(`/api/entertainment/governorate/${id}`);
                const entData = await entRes.json();
                setEntertainments(entData.data && entData.data.length > 0 ? entData.data : [
                    { id: 1, name: 'مدينة الملاهي', imageSource: defaultImage, averagePricePerAdult: 100, description: 'أفضل مدينة ملاهي.' },
                    { id: 2, name: 'مركز الألعاب', imageSource: defaultImage, averagePricePerAdult: 80, description: 'ألعاب إلكترونية.' },
                ]);
                // Tourism Areas
                const tourRes = await fetch(`/api/tourism-area/governorate/${id}`);
                const tourData = await tourRes.json();
                setTourismAreas(tourData.data && tourData.data.length > 0 ? tourData.data : [
                    { id: 1, name: 'منطقة الأهرامات', imageSource: defaultImage, averagePricePerAdult: 200, description: 'زيارة الأهرامات.' },
                    { id: 2, name: 'واحة سيوة', imageSource: defaultImage, averagePricePerAdult: 180, description: 'جمال الطبيعة.' },
                ]);
            } catch (error) {
                setGovernorate({ id: 0, name: 'محافظة افتراضية', description: 'وصف افتراضي للمحافظة.' });
                setAccommodations([
                    { id: 1, name: 'فندق النيل', imageSource: defaultImage, averagePricePerAdult: 350, description: 'فندق فاخر على النيل.' },
                    { id: 2, name: 'شاليه البحر', imageSource: defaultImage, averagePricePerAdult: 250, description: 'شاليه بإطلالة بحرية.' },
                ]);
                setRestaurants([
                    { id: 1, name: 'مطعم أبو السيد', imageSource: defaultImage, averagePricePerAdult: 120, description: 'أشهر الأكلات المصرية.' },
                    { id: 2, name: 'مطعم الدوار', imageSource: defaultImage, averagePricePerAdult: 200, description: 'إطلالة بانورامية.' },
                ]);
                setEntertainments([
                    { id: 1, name: 'مدينة الملاهي', imageSource: defaultImage, averagePricePerAdult: 100, description: 'أفضل مدينة ملاهي.' },
                    { id: 2, name: 'مركز الألعاب', imageSource: defaultImage, averagePricePerAdult: 80, description: 'ألعاب إلكترونية.' },
                ]);
                setTourismAreas([
                    { id: 1, name: 'منطقة الأهرامات', imageSource: defaultImage, averagePricePerAdult: 200, description: 'زيارة الأهرامات.' },
                    { id: 2, name: 'واحة سيوة', imageSource: defaultImage, averagePricePerAdult: 180, description: 'جمال الطبيعة.' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchAll();
    }, [id]);
    let router = useRouter();

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ color: '#ff6600', fontWeight: 'bold' }} gutterBottom>
                    {governorate?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {governorate?.description}
                </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <SectionCarousel title="أماكن الإقامة" items={accommodations} onSeeAll={() => router.push('/accommodation')} type="accommodation" />
            <SectionCarousel title="المطاعم" items={restaurants} onSeeAll={() => router.push('/restaurant')} type="restaurants" />
            <SectionCarousel title="أماكن الترفيه" items={entertainments} onSeeAll={() => router.push('/entertainment')} type="entertainment" />
            <SectionCarousel title="المناطق السياحية" items={tourismAreas} onSeeAll={() => router.push('/tourism-area')} type="tourism-area" />
        </Container>
    );
};

export default GovernorateDetailsPage; 