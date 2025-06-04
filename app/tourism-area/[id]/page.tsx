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

interface Entertainment {
    id: number;
    name: string;
    averagePricePerAdult: number;
    imageUrl: string | null;
}
interface RelatedTourismAreas {
    sameZone: TourismArea[];
    sameClass: TourismArea[];
    sameType: TourismArea[];
}

let classABCD = {
    "A": 1,
    "B": 2,
    "C": 3,
    "D": 4,
}

const TourismAreaPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [tourismArea, setTourismArea] = useState<TourismArea | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedTourismAreas, setRelatedTourismAreas] = useState<RelatedTourismAreas>({
        sameZone: [],
        sameClass: [],
        sameType: []
    });
    const [entertainment, setEntertainment] = useState<Entertainment[]>([]);
    const [tourismAreas, setTourismAreas] = useState<TourismArea[]>([]);
    const [selectedEntertainment, setSelectedEntertainment] = useState<number[]>([]);
    const [selectedTourismAreas, setSelectedTourismAreas] = useState<number[]>([]);
    const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);

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
                const response = await axios.get(`/api/tourism-area/${id}`);
                const tourismAreaData = response.data.data;
                setTourismArea(tourismAreaData);

                // جلب المناطق السياحية المرتبطة
                const [entertainmentResponse, tourismAreasResponse, zoneResponse, classResponse, typeResponse] = await Promise.all([
                    fetchEntertainment(tourismAreaData.zoneId),
                    fetchTourismArea(tourismAreaData.zoneId),
                    axios.get(`/api/tourism-area/zone/${tourismAreaData.zoneId}`),
                    axios.get(`/api/tourism-area/class/${classABCD[tourismAreaData.classType as keyof typeof classABCD]}`),
                    axios.get(`/api/tourism-area/type/${tourismAreaData.tourismType}`)
                ]);
                setEntertainment(entertainmentResponse.data || []);
                setTourismAreas(tourismAreasResponse.data || []);
                setRelatedTourismAreas({
                    sameZone: zoneResponse.data.data.filter((e: TourismArea) => e.id !== tourismAreaData.id),
                    sameClass: classResponse.data.data.filter((e: TourismArea) => e.id !== tourismAreaData.id),
                    sameType: typeResponse.data.data.filter((e: TourismArea) => e.id !== tourismAreaData.id)
                });

                // تحويل العنوان إلى إحداثيات
                if (tourismAreaData.mapLink) {
                    const [lat, lng] = tourismAreaData.mapLink.split(',').map(Number);
                    setMapPosition([lat, lng]);
                } else if (tourismAreaData.address) {
                    const coordinates = await getCoordinatesFromAddress(tourismAreaData.address);
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

    const RelatedTourismAreasSection = ({ title, areas }: { title: string; areas: TourismArea[] }) => (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={2}>
                {areas.map((area) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={area.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={area.imageUrl || '/images/default.png'}
                                alt={area.name}
                            />
                            <CardContent>
                                <Typography variant="h6" noWrap>
                                    {area.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Rating value={area.rating} readOnly size="small" />
                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                        ({area.score})
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {area.address}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                    href={`/tourism-area/${area.id}`}
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

    if (!tourismArea) {
        return (
            <Box sx={{ p: 4 }} className='flex justify-center items-center min-h-screen'>
                <Typography variant="h5" color="error">لم يتم العثور على بيانات المنطقة السياحية</Typography>
            </Box>
        );
    }

    const calculateTotalPrice = () => {
        return selectedEntertainment.reduce((total, id) => {
            const item = entertainment.find(e => e.id === id);
            return total + (item?.averagePricePerAdult || 0);
        }, 0) + selectedTourismAreas.reduce((total, id) => {
            const item = tourismAreas.find(t => t.id === id);
            return total + (item?.averagePricePerAdult || 0);
        }, 0) + tourismArea.averagePricePerAdult;
    }
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* معلومات المنطقة السياحية */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Box sx={{ position: 'relative', mb: 3 }}>
                            <img
                                src={tourismArea.imageUrl || '/images/default.png'}
                                alt={tourismArea.name}
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                            {tourismArea.hasKidsArea && (
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
                            {tourismArea.name}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                            <Rating value={tourismArea.rating} readOnly />
                            <Typography variant="body2" color="text.secondary">
                                ({tourismArea.score})
                            </Typography>
                        </Stack>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <LocationOnIcon sx={{ mr: 1, color: '#666' }} />
                            <Typography variant="body1">
                                {tourismArea.address}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                            <Chip label={tourismArea.tourismType} color="primary" />
                            <Chip label={tourismArea.classType} color="secondary" />
                        </Box>

                        <Typography variant="body1" paragraph>
                            {tourismArea.description}
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
                                            {tourismArea.name}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {tourismArea.contactLink && (
                                <Button
                                    variant="outlined"
                                    startIcon={<PhoneIcon />}
                                    href={tourismArea.contactLink}
                                    target="_blank"
                                >
                                    اتصل بنا
                                </Button>
                            )}

                            {tourismArea.mapLink && (
                                <Button
                                    variant="outlined"
                                    startIcon={<MapIcon />}
                                    href={tourismArea.mapLink}
                                    target="_blank"
                                >
                                    عرض على الخريطة
                                </Button>
                            )}
                        </Box>

                        {/* المناطق السياحية المرتبطة */}
                        {relatedTourismAreas.sameZone.length > 0 && (
                            <RelatedTourismAreasSection
                                title="مناطق سياحية في نفس المنطقة"
                                areas={relatedTourismAreas.sameZone}
                            />
                        )}

                        {relatedTourismAreas.sameClass.length > 0 && (
                            <RelatedTourismAreasSection
                                title="مناطق سياحية من نفس الفئة"
                                areas={relatedTourismAreas.sameClass}
                            />
                        )}

                        {relatedTourismAreas.sameType.length > 0 && (
                            <RelatedTourismAreasSection
                                title="مناطق سياحية من نفس النوع"
                                areas={relatedTourismAreas.sameType}
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
                                متوسط السعر للفرد: {tourismArea.averagePricePerAdult} جنيه
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

export default TourismAreaPage; 