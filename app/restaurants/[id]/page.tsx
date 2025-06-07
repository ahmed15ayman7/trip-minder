// app/[id]/page.tsx
"use client"

import { use, useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Rating,
    Chip,
    Button,
    Divider,
    Stack,
    CircularProgress,
    Card,
    CardContent,
    CardMedia,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { FoodCategories, classABCD, AccomodationTypes } from '@/services/api';
import { useRestaurantStore } from '@/app/store/restaurantStore';

export interface Restaurant {
    id: number;
    name: string;
    foodCategory: string;
    classType: string;
    zone: string;
    zoneId: number;
    governorate: string;
    governorateId: number;
    rating: number;
    placeType: "Restaurant";
    averagePricePerAdult: number;
    hasKidsArea: boolean;
    description: string | null;
    address: string;
    mapLink: string | null;
    contactLink: string;
    imageUrl: string | null;
    score: number;
}

const RestaurantPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const { restaurants, addRestaurant, removeRestaurant, getTotalPrice } = useRestaurantStore();
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedRestaurants, setRelatedRestaurants] = useState<{
        sameZone: Restaurant[];
        sameClass: Restaurant[];
        sameFoodType: Restaurant[];
    }>({
        sameZone: [],
        sameClass: [],
        sameFoodType: [],
    });
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/restaurants/${id}`);
                const restaurantData = response.data.data;
                setRestaurant(restaurantData);

                // جلب المطاعم المرتبطة
                const [zoneResponse, classResponse, foodTypeResponse] = await Promise.all([
                    axios.get(`/api/restaurants/zone/${restaurantData.zoneId}`),
                    axios.get(`/api/restaurants/class/${classABCD[restaurantData.classType as keyof typeof classABCD] || classABCD.A}`),
                    axios.get(`/api/restaurants/foodtype/${FoodCategories[restaurantData.foodCategory as keyof typeof FoodCategories] || FoodCategories.Seafood}`)
                ]);

                setRelatedRestaurants({
                    sameZone: zoneResponse.data.data.filter((r: Restaurant) => r.id !== restaurantData.id),
                    sameClass: classResponse.data.data.filter((r: Restaurant) => r.id !== restaurantData.id),
                    sameFoodType: foodTypeResponse.data.data.filter((r: Restaurant) => r.id !== restaurantData.id),
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const RelatedRestaurantsSection = ({ title, restaurants }: { title: string; restaurants: Restaurant[] }) => (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={2}>
                {restaurants.map((restaurant) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} component="div" key={restaurant.id}>
                        <Card>
                            <div style={{
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover' as 'cover', backgroundImage: `url(${restaurant.imageUrl || defaultImage})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                            }} />
                            <CardContent>
                                <Typography variant="h6" noWrap>
                                    {restaurant.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating value={restaurant.rating} readOnly size="small" />
                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                        ({restaurant.score})
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {restaurant.address}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                    href={`/restaurants/${restaurant.id}`}
                                >
                                    عرض التفاصيل
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    const handleBookTable = () => {
        if (restaurant) {
            addRestaurant(restaurant);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!restaurant) {
        return (
            <Box sx={{ p: 4 }} className='flex justify-center items-center min-h-screen'>
                <Typography variant="h5" color="error">لم يتم العثور على بيانات المطعم</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* معلومات المطعم */}
                <Grid size={{ xs: 12, md: 8 }} component="div">
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Box sx={{ position: 'relative', mb: 3 }}>
                            <img
                                src={restaurant.imageUrl || defaultImage}
                                alt={restaurant.name}
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                            {restaurant.hasKidsArea && (
                                <Chip
                                    icon={<ChildCareIcon />}
                                    label="منطقة أطفال"
                                    color="primary"
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        backgroundColor: '#ff6600',
                                    }}
                                />
                            )}
                        </Box>

                        <Typography variant="h4" gutterBottom>
                            {restaurant.name}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                            <Rating value={restaurant.rating} readOnly />
                            <Typography variant="body2" color="text.secondary">
                                ({restaurant.score})
                            </Typography>
                        </Stack>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LocationOnIcon sx={{ mr: 1, color: '#666' }} />
                            <Typography variant="body1">
                                {restaurant.address}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                            <Chip label={restaurant.foodCategory} color="primary" />
                            <Chip label={restaurant.classType} color="secondary" />
                        </Box>

                        <Typography variant="body1" paragraph>
                            {restaurant.description}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {restaurant.contactLink && (
                                <Button
                                    variant="outlined"
                                    startIcon={<PhoneIcon />}
                                    href={restaurant.contactLink}
                                    target="_blank"
                                >
                                    اتصل بنا
                                </Button>
                            )}

                            {restaurant.mapLink && (
                                <Button
                                    variant="outlined"
                                    startIcon={<MapIcon />}
                                    href={restaurant.mapLink}
                                    target="_blank"
                                >
                                    عرض على الخريطة
                                </Button>
                            )}
                        </Box>

                        {/* المطاعم المرتبطة */}
                        {relatedRestaurants.sameZone.length > 0 && (
                            <RelatedRestaurantsSection
                                title="مطاعم في نفس المنطقة"
                                restaurants={relatedRestaurants.sameZone}
                            />
                        )}

                        {relatedRestaurants.sameClass.length > 0 && (
                            <RelatedRestaurantsSection
                                title="مطاعم من نفس الفئة"
                                restaurants={relatedRestaurants.sameClass}
                            />
                        )}

                        {relatedRestaurants.sameFoodType.length > 0 && (
                            <RelatedRestaurantsSection
                                title="مطاعم بنفس نوع الطعام"
                                restaurants={relatedRestaurants.sameFoodType}
                            />
                        )}
                    </Paper>
                </Grid>

                {/* ملخص التكلفة */}
                <Grid size={{ xs: 12, md: 4 }} component="div">
                    <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 24 }}>
                        <Typography variant="h6" gutterBottom>
                            ملخص التكلفة
                        </Typography>
                        {restaurants.filter(r => r.id === restaurant.id).length === 0 && (
                            <Box sx={{ mb: 2 }}>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="body1">
                                    متوسط السعر للفرد: {restaurant.averagePricePerAdult} جنيه
                                </Typography>
                            </Box>
                        )}

                        {restaurants.length > 0 && (
                            <>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    المطاعم المختارة
                                </Typography>
                                {restaurants.map((r) => (
                                    <Box key={r.id} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body1">
                                            {r.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography variant="body1">
                                                {r.averagePricePerAdult} جنيه
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => removeRestaurant(r.id)}
                                            >
                                                إزالة
                                            </Button>
                                        </Box>
                                    </Box>
                                ))}
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    إجمالي المطاعم المختارة: {getTotalPrice()} جنيه
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6" gutterBottom>
                                    الإجمالي الكلي: {getTotalPrice() + (restaurants.filter(r => r.id === restaurant.id).length === 0 ? restaurant.averagePricePerAdult : 0)} جنيه
                                </Typography>
                            </>
                        )}

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleBookTable}
                            sx={{
                                mt: 2,
                                bgcolor: restaurants.filter(r => r.id === restaurant.id).length === 0 ? '#ff6600' : '#008000',
                                '&:hover': {
                                    bgcolor: '#e65c00',
                                },
                            }}
                        >
                            {restaurants.filter(r => r.id === restaurant.id).length === 0 ? "احجز طاولة" : "تم الاختيار"}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default RestaurantPage;