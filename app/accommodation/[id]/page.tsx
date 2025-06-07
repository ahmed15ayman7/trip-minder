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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Divider,
    Stack,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import BedIcon from '@mui/icons-material/Bed';
import GroupIcon from '@mui/icons-material/Group';
import { fetchEntertainment, fetchTourismArea, classABCD, AccomodationTypes, fetchRestaurants } from '@/services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
let defaultImage = '/images/default.png';

export interface Accommodation {
    id: number;
    name: string;
    accomodationType: string;
    classType: string;
    zone: string;
    zoneId: number;
    governorate: string;
    governorateId: number;
    rating: number;
    placeType: string;
    averagePricePerAdult: number;
    hasKidsArea: boolean;
    description: string;
    address: string;
    mapLink: string | null;
    contactLink: string;
    imageUrl: string | null;
    numOfBeds: number;
    bedStatus: string;
    numOfPersons: number;
    score: number;
}

interface Entertainment {
    id: number;
    name: string;
    averagePricePerAdult: number;
    imageUrl: string | null;
}

interface TourismArea {
    id: number;
    name: string;
    averagePricePerAdult: number;
    imageUrl: string | null;
}

interface Restaurants {
    id: number;
    name: string;
    averagePricePerAdult: number;
    imageUrl: string | null;
}

interface RelatedAccommodations {
    sameZone: Accommodation[];
    sameClass: Accommodation[];
    sameType: Accommodation[];
}



const AccommodationPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const [data, setData] = useState<Accommodation | null>(null);
    const [entertainment, setEntertainment] = useState<Entertainment[]>([]);
    const [tourismAreas, setTourismAreas] = useState<TourismArea[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurants[]>([]);
    const [selectedEntertainment, setSelectedEntertainment] = useState<number[]>([]);
    const [selectedTourismAreas, setSelectedTourismAreas] = useState<number[]>([]);
    const [selectedRestaurants, setSelectedRestaurants] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [relatedAccommodations, setRelatedAccommodations] = useState<RelatedAccommodations>({
        sameZone: [],
        sameClass: [],
        sameType: []
    });
    const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);
    const { id } = use(params);

    const getCoordinatesFromAddress = async (address: string): Promise<[number, number] | null> => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
            );

            if (response.data && response.data.length > 0) {
                return [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)];
            }
            return null;
        } catch (error) {
            console.error('Error geocoding address:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/accommodation/${id}`);
                setData(response.data.data);

                if (response.data.data) {
                    const [entertainmentData, tourismData, zoneData, classData, typeData, restaurantsData] = await Promise.all([
                        fetchEntertainment(response.data.data.zoneId),
                        fetchTourismArea(response.data.data.zoneId),
                        axios.get(`/api/accommodation/zone/${response.data.data.zoneId}`),
                        axios.get(`/api/accommodation/class/${classABCD[response.data.data.classType as keyof typeof classABCD]}`),
                        axios.get(`/api/accommodation/types/${AccomodationTypes[response.data.data.accomodationType as keyof typeof AccomodationTypes] || AccomodationTypes.Villa}`),
                        axios.get(`/api/restaurants/zone/${response.data.data.zoneId}`),
                    ]);

                    setEntertainment(entertainmentData.data || []);
                    setTourismAreas(tourismData.data || []);
                    setRelatedAccommodations({
                        sameZone: zoneData.data.data.filter((a: Accommodation) => a.id !== response.data.data.id),
                        sameClass: classData.data.data.filter((a: Accommodation) => a.id !== response.data.data.id),
                        sameType: typeData.data.data.filter((a: Accommodation) => a.id !== response.data.data.id)
                    });
                    setRestaurants(restaurantsData.data || []);
                    // تحويل العنوان إلى إحداثيات
                    if (response.data.data.mapLink) {
                        const [lat, lng] = response.data.data.mapLink.split(',').map(Number);
                        setMapPosition([lat, lng]);
                    } else if (response.data.data.address) {
                        const coordinates = await getCoordinatesFromAddress(response.data.data.address);
                        if (coordinates) {
                            setMapPosition(coordinates);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const calculateTotalPrice = () => {
        if (!data) return 0;

        const accommodationPrice = data.averagePricePerAdult;
        const entertainmentPrice = selectedEntertainment.reduce((total, id) => {
            const item = entertainment.find(e => e.id === id);
            return total + (item?.averagePricePerAdult || 0);
        }, 0);

        const tourismPrice = selectedTourismAreas.reduce((total, id) => {
            const item = tourismAreas.find(t => t.id === id);
            return total + (item?.averagePricePerAdult || 0);
        }, 0);

        const restaurantsPrice = selectedRestaurants.reduce((total, id) => {
            const item = restaurants.find(r => r.id === id);
            return total + (item?.averagePricePerAdult || 0);
        }, 0);

        return accommodationPrice + entertainmentPrice + tourismPrice + restaurantsPrice;
    };

    const RelatedAccommodationsSection = ({ title, accommodations }: { title: string; accommodations: Accommodation[] }) => (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={2}>
                {accommodations.map((accommodation) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} component="div" key={accommodation.id}>
                        <Card>
                            <div style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover' as 'cover', backgroundImage: `url(${accommodation.imageUrl || defaultImage})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                            }} />
                            <CardContent>
                                <Typography variant="h6" noWrap>
                                    {accommodation.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating value={accommodation.rating} readOnly size="small" />
                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                        ({accommodation.score})
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {accommodation.address}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                    href={`/accommodation/${accommodation.id}`}
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

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!data) {
        return (
            <Box sx={{ p: 4 }} className='flex justify-center items-center min-h-screen' >
                <Typography variant="h5" color="error">لم يتم العثور على بيانات الإقامة</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* معلومات الإقامة */}
                <Grid size={{ xs: 12, md: 8 }} component="div">
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Box sx={{ position: 'relative', mb: 3 }}>
                            <img
                                src={data.imageUrl || '/images/default.png'}
                                alt={data.name}
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                            {data.hasKidsArea && (
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
                            {data.name}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                            <Rating value={data.rating} readOnly />
                            <Typography variant="body2" color="text.secondary">
                                ({data.score})
                            </Typography>
                        </Stack>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LocationOnIcon sx={{ mr: 1, color: '#666' }} />
                            <Typography variant="body1">
                                {data.address}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <BedIcon sx={{ mr: 1, color: '#666' }} />
                                <Typography variant="body1">
                                    {data.numOfBeds} غرفة
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <GroupIcon sx={{ mr: 1, color: '#666' }} />
                                <Typography variant="body1">
                                    {data.numOfPersons} فرد
                                </Typography>
                            </Box>
                        </Box>

                        <Typography variant="body1" paragraph>
                            {data.description}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {/* خيارات الترفيه */}
                        <Typography variant="h6" gutterBottom>
                            أماكن الترفيه
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>اختر أماكن الترفيه</InputLabel>
                            <Select
                                multiple
                                value={selectedEntertainment}
                                onChange={(e) => setSelectedEntertainment(e.target.value as number[])}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <img src={entertainment.find(e => e.id === value)?.imageUrl || '/images/default.png'} alt={entertainment.find(e => e.id === value)?.name} className="w-[50px] h-[50px] rounded-md" />
                                                <Chip
                                                    key={value}
                                                    label={entertainment.find(e => e.id === value)?.name + ' - ' + entertainment.find(e => e.id === value)?.averagePricePerAdult + ' جنيه'}
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            >
                                {entertainment.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <img src={item.imageUrl || '/images/default.png'} alt={item.name} className="w-[50px] h-[50px] rounded-md" />
                                            <Typography variant="body1">
                                                {item.name} - {item.averagePricePerAdult} جنيه
                                            </Typography>
                                        </Box>

                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* خيارات المطاعم */}
                        <Typography variant="h6" gutterBottom>
                            أماكن المطاعم
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>اختر أماكن المطاعم</InputLabel>
                            <Select
                                multiple
                                value={selectedRestaurants}
                                onChange={(e) => setSelectedRestaurants(e.target.value as number[])}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <img src={restaurants.find(e => e.id === value)?.imageUrl || '/images/default.png'} alt={restaurants.find(e => e.id === value)?.name} className="w-[50px] h-[50px] rounded-md" />
                                                <Chip
                                                    key={value}
                                                    label={restaurants.find(e => e.id === value)?.name + ' - ' + restaurants.find(e => e.id === value)?.averagePricePerAdult + ' جنيه'}
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            >
                                {restaurants.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <img src={item.imageUrl || '/images/default.png'} alt={item.name} className="w-[50px] h-[50px] rounded-md" />
                                            <Typography variant="body1">
                                                {item.name} - {item.averagePricePerAdult} جنيه
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* المناطق السياحية */}
                        <Typography variant="h6" gutterBottom>
                            المناطق السياحية
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>اختر المناطق السياحية</InputLabel>
                            <Select
                                multiple
                                value={selectedTourismAreas}
                                onChange={(e) => setSelectedTourismAreas(e.target.value as number[])}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <img src={tourismAreas.find(e => e.id === value)?.imageUrl || '/images/default.png'} alt={entertainment.find(e => e.id === value)?.name} className="w-[50px] h-[50px] rounded-md" />
                                                <Chip
                                                    key={value}
                                                    label={tourismAreas.find(e => e.id === value)?.name + ' - ' + tourismAreas.find(e => e.id === value)?.averagePricePerAdult + ' جنيه'}
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            >
                                {tourismAreas.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        <img src={item.imageUrl || '/images/default.png'} alt={item.name} className="w-[50px] h-[50px] rounded-md" />
                                        {item.name} - {item.averagePricePerAdult} جنيه
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* خريطة الموقع */}
                        {mapPosition && (
                            <Box sx={{ height: 400, mb: 3 }}>
                                <MapContainer
                                    center={mapPosition}
                                    zoom={13}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={mapPosition}>
                                        <Popup>
                                            {data?.name}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </Box>
                        )}

                        {/* الإقامات المرتبطة */}
                        {relatedAccommodations.sameZone.length > 0 && (
                            <RelatedAccommodationsSection
                                title="إقامات في نفس المنطقة"
                                accommodations={relatedAccommodations.sameZone}
                            />
                        )}

                        {relatedAccommodations.sameClass.length > 0 && (
                            <RelatedAccommodationsSection
                                title="إقامات من نفس الفئة"
                                accommodations={relatedAccommodations.sameClass}
                            />
                        )}

                        {relatedAccommodations.sameType.length > 0 && (
                            <RelatedAccommodationsSection
                                title="إقامات من نفس النوع"
                                accommodations={relatedAccommodations.sameType}
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
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body1">
                                تكلفة الإقامة: {data.averagePricePerAdult} جنيه
                            </Typography>
                        </Box>

                        {selectedEntertainment.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    تكلفة الترفيه: {selectedEntertainment.reduce((total, id) => {
                                        const item = entertainment.find(e => e.id === id);
                                        return total + (item?.averagePricePerAdult || 0);
                                    }, 0)} جنيه
                                </Typography>
                            </Box>
                        )}

                        {selectedTourismAreas.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    تكلفة المناطق السياحية: {selectedTourismAreas.reduce((total, id) => {
                                        const item = tourismAreas.find(t => t.id === id);
                                        return total + (item?.averagePricePerAdult || 0);
                                    }, 0)} جنيه
                                </Typography>
                            </Box>
                        )}

                        <Divider sx={{ my: 2 }} />
                        {selectedRestaurants.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    تكلفة المطاعم: {selectedRestaurants.reduce((total, id) => {
                                        const item = restaurants.find(r => r.id === id);
                                        return total + (item?.averagePricePerAdult || 0);
                                    }, 0)} جنيه
                                </Typography>
                            </Box>
                        )}
                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" color="primary" gutterBottom>
                            التكلفة الإجمالية: {calculateTotalPrice()} جنيه
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                mt: 2,
                                bgcolor: '#ff6600',
                                '&:hover': {
                                    bgcolor: '#e65c00',
                                },
                            }}
                        >
                            احجز الآن
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AccommodationPage;