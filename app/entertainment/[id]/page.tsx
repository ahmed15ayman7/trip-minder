"use client"

import { useEffect, useState, use } from 'react';
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
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MapIcon from '@mui/icons-material/Map';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchTourismArea } from '@/services/api';
import { fetchEntertainment } from '@/services/api';
import defaultImage from '@/assets/default.png';
export interface Entertainment {
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
    entertainmentType: string;
    hasKidsArea: boolean;
    address: string;
    mapLink: string | null;
    contactLink: string | null;
    imageUrl: string | null;
    placeType: "Entertainment";
    score: number;
}
interface TourismArea {
    id: number;
    name: string;
    averagePricePerAdult: number;
    imageUrl: string | null;
}
interface RelatedEntertainments {
    sameZone: Entertainment[];
    sameClass: Entertainment[];
    sameType: Entertainment[];
}

let classABCD = {
    "A": 1,
    "B": 2,
    "C": 3,
    "D": 4,
}

const EntertainmentPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [entertainment, setEntertainment] = useState<Entertainment | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedEntertainments, setRelatedEntertainments] = useState<RelatedEntertainments>({
        sameZone: [],
        sameClass: [],
        sameType: []
    });
    const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);
    const [selectedEntertainment, setSelectedEntertainment] = useState<number[]>([]);
    const [selectedTourismAreas, setSelectedTourismAreas] = useState<number[]>([]);
    const [tourismAreas, setTourismAreas] = useState<TourismArea[]>([]);
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
                const response = await axios.get(`/api/entertainment/${id}`);
                const entertainmentData = response.data.data;
                setEntertainment(entertainmentData);

                // جلب أماكن الترفيه المرتبطة
                const [tourismAreasResponse, zoneResponse, classResponse, typeResponse] = await Promise.all([
                    // fetchEntertainment(entertainmentData.zoneId),
                    fetchTourismArea(entertainmentData.zoneId),
                    axios.get(`/api/entertainment/zone/${entertainmentData.zoneId}`),
                    axios.get(`/api/entertainment/class/${classABCD[entertainmentData.classType as keyof typeof classABCD]}`),
                    axios.get(`/api/entertainment/type/${entertainmentData.entertainmentType}`)
                ]);
                setRelatedEntertainments({
                    sameZone: zoneResponse.data.data.filter((e: Entertainment) => e.id !== entertainmentData.id),
                    sameClass: classResponse.data.data.filter((e: Entertainment) => e.id !== entertainmentData.id),
                    sameType: typeResponse.data.data.filter((e: Entertainment) => e.id !== entertainmentData.id)
                });
                setTourismAreas(tourismAreasResponse.data);

                // تحويل العنوان إلى إحداثيات
                if (entertainmentData.mapLink) {
                    const [lat, lng] = entertainmentData.mapLink.split(',').map(Number);
                    setMapPosition([lat, lng]);
                } else if (entertainmentData.address) {
                    const coordinates = await getCoordinatesFromAddress(entertainmentData.address);
                    if (coordinates) {
                        setMapPosition(coordinates);
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

    const RelatedEntertainmentsSection = ({ title, entertainments }: { title: string; entertainments: Entertainment[] }) => (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={2}>
                {entertainments.map((entertainment) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={entertainment.id}>
                        <Card>
                            <div style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover' as 'cover', backgroundImage: `url(${entertainment.imageUrl || defaultImage})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
                            }} />
                            <CardContent>
                                <Typography variant="h6" noWrap>
                                    {entertainment.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating value={entertainment.rating} readOnly size="small" />
                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                        ({entertainment.score})
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {entertainment.address}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                    href={`/entertainment/${entertainment.id}`}
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

    if (!entertainment) {
        return (
            <Box sx={{ p: 4 }} className='flex justify-center items-center min-h-screen'>
                <Typography variant="h5" color="error">لم يتم العثور على بيانات مكان الترفيه</Typography>
            </Box>
        );
    }

    const calculateTotalPrice = () => {
        return selectedEntertainment.reduce((total, id) => {
            const item = relatedEntertainments.sameZone.find(e => e.id === id);
            return total + (item?.averagePricePerAdult || 0);
        }, 0) + selectedTourismAreas.reduce((total, id) => {
            const item = tourismAreas.find(t => t.id === id);
            return total + (item?.averagePricePerAdult || 0);
        }, 0) + entertainment.averagePricePerAdult;
    }
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* معلومات مكان الترفيه */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Box sx={{ position: 'relative', mb: 3 }}>
                            <img
                                src={entertainment.imageUrl || '/images/default.png'}
                                alt={entertainment.name}
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                            {entertainment.hasKidsArea && (
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
                            {entertainment.name}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                            <Rating value={entertainment.rating} readOnly />
                            <Typography variant="body2" color="text.secondary">
                                ({entertainment.score})
                            </Typography>
                        </Stack>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LocationOnIcon sx={{ mr: 1, color: '#666' }} />
                            <Typography variant="body1">
                                {entertainment.address}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                            <Chip label={entertainment.entertainmentType} color="primary" />
                            <Chip label={entertainment.classType} color="secondary" />
                        </Box>

                        <Typography variant="body1" paragraph>
                            {entertainment.description}
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
                                        {selected.map((value, index) => (
                                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <img src={relatedEntertainments.sameZone.find(e => e.id === value)?.imageUrl || '/images/default.png'} alt={relatedEntertainments.sameZone.find(e => e.id === value)?.name} className="w-[50px] h-[50px] rounded-md" />
                                                <Chip
                                                    key={value}
                                                    label={relatedEntertainments.sameZone.find(e => e.id === value)?.name + ' - ' + relatedEntertainments.sameZone.find(e => e.id === value)?.averagePricePerAdult + ' جنيه'}
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            >
                                {relatedEntertainments.sameZone.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <img src={item.imageUrl || '/images/default.png'} alt={item.name} className="w-[50px] h-[50px] rounded-md" />
                                            <Typography variant="body1">
                                                {item.name} - {item.averagePricePerAdult} جنيه
                                            </Typography>
                                        </Box>
                                        {item.name} - {item.averagePricePerAdult} جنيه
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
                                                <img src={tourismAreas.find(e => e.id === value)?.imageUrl || '/images/default.png'} alt={tourismAreas.find(e => e.id === value)?.name} className="w-[50px] h-[50px] rounded-md" />
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



                        <Divider sx={{ my: 3 }} />

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
                                            {entertainment.name}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {entertainment.contactLink && (
                                <Button
                                    variant="outlined"
                                    startIcon={<PhoneIcon />}
                                    href={entertainment.contactLink}
                                    target="_blank"
                                >
                                    اتصل بنا
                                </Button>
                            )}

                            {entertainment.mapLink && (
                                <Button
                                    variant="outlined"
                                    startIcon={<MapIcon />}
                                    href={entertainment.mapLink}
                                    target="_blank"
                                >
                                    عرض على الخريطة
                                </Button>
                            )}
                        </Box>

                        {/* أماكن الترفيه المرتبطة */}
                        {relatedEntertainments.sameZone.length > 0 && (
                            <RelatedEntertainmentsSection
                                title="أماكن ترفيه في نفس المنطقة"
                                entertainments={relatedEntertainments.sameZone}
                            />
                        )}

                        {relatedEntertainments.sameClass.length > 0 && (
                            <RelatedEntertainmentsSection
                                title="أماكن ترفيه من نفس الفئة"
                                entertainments={relatedEntertainments.sameClass}
                            />
                        )}

                        {relatedEntertainments.sameType.length > 0 && (
                            <RelatedEntertainmentsSection
                                title="أماكن ترفيه من نفس النوع"
                                entertainments={relatedEntertainments.sameType}
                            />
                        )}
                    </Paper>
                </Grid>

                {/* ملخص التكلفة */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 24 }}>
                        <Typography variant="h6" gutterBottom>
                            ملخص التكلفة
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body1">
                                متوسط السعر للفرد: {entertainment.averagePricePerAdult} جنيه
                            </Typography>
                        </Box>
                        {selectedEntertainment.length > 0 && (
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body1">
                                    تكلفة الترفيه: {selectedEntertainment.reduce((total, id) => {
                                        const item = relatedEntertainments.sameZone.find(e => e.id === id);
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

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" gutterBottom>
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

export default EntertainmentPage; 