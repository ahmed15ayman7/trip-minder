"use client";
import React, { use, useEffect, useState } from "react";
import { Box, Container, Typography, CircularProgress, Divider, Grid } from "@mui/material";
import SectionHeader from "../../components/SectionHeader";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import axios from "axios";
interface Governorate {
    id: number;
    name: string;
    description?: string;
}

interface Accommodation {
    id: number;
    name: string;
    imageUrl: string | null;
    averagePricePerAdult: number;
    description: string;
}
interface Restaurant {
    id: number;
    name: string;
    imageUrl: string | null;
    averagePricePerAdult: number;
    description: string;
}
interface Entertainment {
    id: number;
    name: string;
    imageUrl: string | null;
    averagePricePerAdult: number;
    description: string;
}
interface TourismArea {
    id: number;
    name: string;
    imageUrl: string | null;
    averagePricePerAdult: number;
    description: string;
}

const defaultImage = '/images/default.png';

const SectionCarousel = ({ title, items, onSeeAll, type }: { title: string, items: any[], onSeeAll: () => void, type: string }) => {

    return (
        <Box sx={{ py: 3 }}>
            <SectionHeader title={title} onSeeAll={onSeeAll} />
            <Grid container spacing={2}>
                {items.slice(0, 8).map((item, idx) => {
                    console.log(item)
                    return (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
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
                                        src={item.imageUrl || defaultImage}
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
                        </Grid>
                    )
                })}
            </Grid>
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
                const govRes = await axios.get(`/api/governorate/${id}`);
                const govData = govRes.data;
                console.log(govData);
                let governorate = id === '1' ? { id: 1, name: 'محافظة القاهرة', description: 'واحده من اكبر محافظات مصر' } : id === "2" ? { id: 2, name: 'محافظة الاسكندرية', description: 'واحده من اكبر محافظات مصر' } : id === "3" ? { id: 3, name: 'محافظة الجيزة', description: 'واحده من اكبر محافظات مصر' } : { id: 0, name: 'محافظة افتراضية', description: 'وصف افتراضي للمحافظة.' };
                setGovernorate(govData.data || governorate);
                // Accommodations
                const accRes = await axios.get(`/api/accommodation/governorate/${id}`);
                const accData = accRes.data;
                console.log(accData);
                setAccommodations(accData.data && accData.data.length > 0 ? accData.data : [
                    { id: 1, name: 'فندق النيل', imageUrl: defaultImage, averagePricePerAdult: 350, description: 'فندق فاخر على النيل.' },
                    { id: 2, name: 'شاليه البحر', imageUrl: defaultImage, averagePricePerAdult: 250, description: 'شاليه بإطلالة بحرية.' },
                ]);
                // Restaurants
                const restRes = await axios.get(`/api/restaurants/governorate/${id}`);
                const restData = restRes.data;
                setRestaurants(restData.data && restData.data.length > 0 ? restData.data : [
                    { id: 1, name: 'مطعم أبو السيد', imageUrl: defaultImage, averagePricePerAdult: 120, description: 'أشهر الأكلات المصرية.' },
                    { id: 2, name: 'مطعم الدوار', imageUrl: defaultImage, averagePricePerAdult: 200, description: 'إطلالة بانورامية.' },
                ]);
                // Entertainments
                const entRes = await axios.get(`/api/entertainment/governorate/${id}`);
                const entData = entRes.data;
                setEntertainments(entData.data && entData.data.length > 0 ? entData.data : [
                    { id: 1, name: 'مدينة الملاهي', imageUrl: defaultImage, averagePricePerAdult: 100, description: 'أفضل مدينة ملاهي.' },
                    { id: 2, name: 'مركز الألعاب', imageUrl: defaultImage, averagePricePerAdult: 80, description: 'ألعاب إلكترونية.' },
                ]);
                // Tourism Areas
                const tourRes = await axios.get(`/api/tourism-area/governorate/${id}`);
                const tourData = tourRes.data;
                setTourismAreas(tourData.data && tourData.data.length > 0 ? tourData.data : [
                    { id: 1, name: 'منطقة الأهرامات', imageUrl: defaultImage, averagePricePerAdult: 200, description: 'زيارة الأهرامات.' },
                    { id: 2, name: 'واحة سيوة', imageUrl: defaultImage, averagePricePerAdult: 180, description: 'جمال الطبيعة.' },
                ]);
            } catch (error) {
                setGovernorate({ id: 0, name: 'محافظة افتراضية', description: 'وصف افتراضي للمحافظة.' });
                setAccommodations([
                    { id: 1, name: 'فندق النيل', imageUrl: defaultImage, averagePricePerAdult: 350, description: 'فندق فاخر على النيل.' },
                    { id: 2, name: 'شاليه البحر', imageUrl: defaultImage, averagePricePerAdult: 250, description: 'شاليه بإطلالة بحرية.' },
                ]);
                setRestaurants([
                    { id: 1, name: 'مطعم أبو السيد', imageUrl: defaultImage, averagePricePerAdult: 120, description: 'أشهر الأكلات المصرية.' },
                    { id: 2, name: 'مطعم الدوار', imageUrl: defaultImage, averagePricePerAdult: 200, description: 'إطلالة بانورامية.' },
                ]);
                setEntertainments([
                    { id: 1, name: 'مدينة الملاهي', imageUrl: defaultImage, averagePricePerAdult: 100, description: 'أفضل مدينة ملاهي.' },
                    { id: 2, name: 'مركز الألعاب', imageUrl: defaultImage, averagePricePerAdult: 80, description: 'ألعاب إلكترونية.' },
                ]);
                setTourismAreas([
                    { id: 1, name: 'منطقة الأهرامات', imageUrl: defaultImage, averagePricePerAdult: 200, description: 'زيارة الأهرامات.' },
                    { id: 2, name: 'واحة سيوة', imageUrl: defaultImage, averagePricePerAdult: 180, description: 'جمال الطبيعة.' },
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
            <SectionCarousel title="المطاعم" items={restaurants} onSeeAll={() => router.push('/restaurants')} type="restaurants" />
            <SectionCarousel title="أماكن الترفيه" items={entertainments} onSeeAll={() => router.push('/entertainment')} type="entertainment" />
            <SectionCarousel title="المناطق السياحية" items={tourismAreas} onSeeAll={() => router.push('/tourism-area')} type="tourism-area" />
        </Container>
    );
};

export default GovernorateDetailsPage; 