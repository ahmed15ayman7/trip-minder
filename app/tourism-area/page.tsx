"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Rating,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    Paper,
    CircularProgress,
    Button,
    InputAdornment,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { fetchZones, fetchGovernorates } from '@/services/api';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
let zonesD = [
    { id: 1, name: 'مدينة نصر' },
    { id: 2, name: 'القاهرة الجديدة' },
    { id: 3, name: 'الحسين' },
    { id: 4, name: 'المعادي' },
    { id: 5, name: 'وسط البلد' },
    { id: 6, name: 'الزمالك' },
    { id: 7, name: 'مصر الجديدة' },
    { id: 8, name: 'الرحاب' },
    { id: 9, name: 'مدينتي' },
    { id: 10, name: 'جاردن سيتي' },
    { id: 11, name: 'الكورنيش' },
    { id: 12, name: 'شبرا' },
    { id: 13, name: 'القاهرة' },
];
let governoratesD = [
    { id: 1, name: 'القاهرة' },
    { id: 2, name: 'الجيزة' },
    { id: 3, name: 'القليوبية' },
    { id: 4, name: 'الإسكندرية' },
];
let classesD = [
    { id: 1, name: 'A', nameAr: 'فئة A' },
    { id: 2, name: 'B', nameAr: 'فئة B' },
    { id: 3, name: 'C', nameAr: 'فئة C' },
    { id: 4, name: 'D', nameAr: 'فئة D' },
];
let typesD = [
    { id: 1, name: 'Archaeological landmark / area', nameAr: 'منطقة تاريخية / منطقة تراثية' },
    { id: 2, name: 'Museum', nameAr: 'متحف' },
    { id: 3, name: 'Historic Palace / Castle', nameAr: 'قلعة تاريخية / قلعة تاريخية' },
    { id: 4, name: 'Cultural venue', nameAr: 'مكان ثقافي' },
    { id: 5, name: 'Historic Street / Area', nameAr: 'منطقة تاريخية / منطقة تراثية' },
    { id: 6, name: 'Ancient / Historic Mosque & Church', nameAr: 'مسجد / كنيسة تاريخية / كنيسة تاريخية' },
    { id: 7, name: 'Theater and Arts', nameAr: 'مسرح / فنون' },
    { id: 8, name: 'Shopping Center / Mall / Historical Market', nameAr: 'مركز تسوق / مركز تسوق تاريخي / مركز تسوق تاريخي' },
    { id: 9, name: 'Garden / Park', nameAr: 'منطقة جنة / منطقة جنة' },
    { id: 10, name: 'Zoo', nameAr: 'حديقة حيوان' },
    { id: 11, name: 'Entertainment City / Tourist Attraction', nameAr: 'مدينة سياحية / منشأة سياحية' },
];



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
    imageSource: string | null;
    placeType: "Tourism Area";
    score: number;
}
interface Zone {
    id: number;
    name: string;
}

interface Governorate {
    id: number;
    name: string;
}

interface Class {
    id: number;
    name: string;
}

interface Type {
    id: number;
    name: string;
}

interface Filters {
    zones: Zone[];
    governorates: Governorate[];
    types: Type[];
    classes: Class[];
    hasKidsArea: boolean;
    minPrice: number;
    maxPrice: number;
}
let tourismArea: TourismArea[] = [
    { id: 1, name: 'القاهرة الجديدة', description: 'القاهرة الجديدة', classType: 'A', zone: 'القاهرة الجديدة', zoneId: 1, governorate: 'القاهرة', governorateId: 1, rating: 4.5, averagePricePerAdult: 1000, tourismType: 'منطقة تاريخية', hasKidsArea: true, address: 'القاهرة الجديدة', mapLink: null, contactLink: null, imageSource: null, placeType: 'Tourism Area', score: 4.5 },
    { id: 2, name: 'القاهرة القديمة', description: 'القاهرة القديمة', classType: 'A', zone: 'القاهرة القديمة', zoneId: 1, governorate: 'القاهرة', governorateId: 1, rating: 4.5, averagePricePerAdult: 1000, tourismType: 'منطقة تاريخية', hasKidsArea: true, address: 'القاهرة القديمة', mapLink: null, contactLink: null, imageSource: null, placeType: 'Tourism Area', score: 4.5 },
    { id: 3, name: 'القاهرة الجديدة', description: 'القاهرة الجديدة', classType: 'A', zone: 'القاهرة الجديدة', zoneId: 1, governorate: 'القاهرة', governorateId: 1, rating: 4.5, averagePricePerAdult: 1000, tourismType: 'منطقة تاريخية', hasKidsArea: true, address: 'القاهرة الجديدة', mapLink: null, contactLink: null, imageSource: null, placeType: 'Tourism Area', score: 4.5 },
]
const TourismAreaPage = () => {
    let [zones, setZones] = useState<any[]>(zonesD);
    let [governorates, setGovernorates] = useState<any[]>(governoratesD);
    const [searchTerm, setSearchTerm] = useState('');
    const getZones = async () => {
        const result = await fetchZones();
        setZones(result.data);
    };
    const router = useRouter();
    const [tourismAreas, setTourismAreas] = useState<TourismArea[]>(tourismArea);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Filters>({
        zones: [],
        governorates: [],
        types: [],
        classes: [],
        hasKidsArea: false,
        minPrice: 0,
        maxPrice: 1000,
    });


    useEffect(() => {
        fetchTourismAreas();
        getZones();
        getGovernorates();
    }, [filters]);
    let getGovernorates = async () => {
        const result = await fetchGovernorates();
        setGovernorates(result.data);
    };
    const filteredTourismAreas = tourismAreas.filter(tourismArea => {
        const matchesSearch = tourismArea.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tourismArea?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tourismArea.address.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesZone = filters.zones.length === 0 || filters.zones.filter(z => z.id === tourismArea.zoneId).length > 0;
        const matchesType = filters.types.length === 0 || filters.types.filter(t => t.name === tourismArea.tourismType).length > 0;
        const matchesClass = filters.classes.length === 0 || filters.classes.filter(c => c.name === tourismArea.classType).length > 0;
        const matchesKidsArea = !filters.hasKidsArea || tourismArea.hasKidsArea;
        const matchesPrice = tourismArea.averagePricePerAdult >= filters.minPrice &&
            tourismArea.averagePricePerAdult <= filters.maxPrice;

        return matchesSearch && matchesZone && matchesType && matchesClass &&
            matchesKidsArea && matchesPrice;
    });
    const fetchTourismAreas = async () => {
        try {
            setLoading(true);

            const response = await axios.get(`/api/tourism-area/list`);
            setTourismAreas(response.data.data);
        } catch (error) {
            console.error('Error fetching tourism areas:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (name: string, value: any) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };


    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                {/* الفلاتر */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 24 }}>
                        <Typography variant="h6" gutterBottom>
                            الفلاتر
                        </Typography>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1" gutterBottom>
                                    المنطقة
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {zones.map((zone) => (
                                        <FormControlLabel
                                            key={zone.id}
                                            control={<Checkbox checked={filters.zones.filter(z => z.id === zone.id).length > 0}
                                                onChange={(e) => {
                                                    const newZones = e.target.checked
                                                        ? [...filters.zones, zone]
                                                        : filters.zones.filter(z => z.id !== zone.id);
                                                    handleFilterChange('zones', newZones);
                                                }} />}
                                            label={zone.name}
                                        />
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1" gutterBottom>
                                    المحافظة
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {governorates.map((governorate) => (
                                        <FormControlLabel
                                            key={governorate.id}
                                            control={<Checkbox checked={filters.governorates.filter(g => g.id === governorate.id).length > 0}
                                                onChange={(e) => {
                                                    const newGovernorates = e.target.checked
                                                        ? [...filters.governorates, governorate]
                                                        : filters.governorates.filter(g => g.id !== governorate.id);
                                                    handleFilterChange('governorates', newGovernorates);
                                                }} />}
                                            label={governorate.name}
                                        />
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1" gutterBottom>
                                    الفئة
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {classesD.map((classItem) => (
                                        <FormControlLabel
                                            key={classItem.id}
                                            control={<Checkbox checked={filters.classes.filter(c => c.id === classItem.id).length > 0}
                                                onChange={(e) => {
                                                    const newClasses = e.target.checked
                                                        ? [...filters.classes, classItem]
                                                        : filters.classes.filter(c => c.id !== classItem.id);
                                                    handleFilterChange('classes', newClasses);
                                                }} />}
                                            label={classItem.nameAr}
                                        />
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}  >
                                <Typography variant="subtitle1" gutterBottom>
                                    النوع
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {typesD.map((type) => (
                                        <FormControlLabel
                                            key={type.id}
                                            control={<Checkbox checked={filters.types.filter(t => t.id === type.id).length > 0}
                                                onChange={(e) => {
                                                    const newTypes = e.target.checked
                                                        ? [...filters.types, type]
                                                        : filters.types.filter(t => t.id !== type.id);
                                                    handleFilterChange('types', newTypes);
                                                }} />}
                                            label={type.nameAr}
                                        />
                                    ))}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filters.hasKidsArea}
                                    onChange={(e) => handleFilterChange('hasKidsArea', e.target.checked)}
                                />
                            }
                            label="منطقة أطفال"
                        />

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle1" gutterBottom>
                            نطاق السعر
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                type="number"
                                label="الحد الأدنى"
                                value={filters.minPrice}
                                onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                                size="small"
                            />
                            <TextField
                                type="number"
                                label="الحد الأقصى"
                                value={filters.maxPrice}
                                onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                                size="small"
                            />
                        </Box>
                    </Paper>
                </Grid>

                {/* قائمة المناطق السياحية */}
                <Grid size={{ xs: 12, md: 9 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Container sx={{ py: 4 }}>
                            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h4" component="h1">
                                    أماكن السياحة
                                </Typography>
                            </Box>

                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="ابحث عن مكان إقامة..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 3 }}
                            />
                            <Grid container spacing={3}>
                                {filteredTourismAreas.map((area) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={area.id}>
                                        <Card
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    transform: 'scale(1.02)',
                                                    transition: 'transform 0.2s ease-in-out'
                                                }
                                            }}
                                            onClick={() => router.push(`/tourism-area/${area.id}`)}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={area.imageSource || '/images/default.png'}
                                                alt={area.name}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" gutterBottom noWrap>
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
                                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                                    <Chip
                                                        label={area.tourismType}
                                                        size="small"
                                                        color="primary"
                                                    />
                                                    {area.hasKidsArea && (
                                                        <Chip
                                                            label="منطقة أطفال"
                                                            size="small"
                                                            color="secondary"
                                                        />
                                                    )}
                                                </Box>
                                                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                                    {area.averagePricePerAdult} جنيه
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default TourismAreaPage; 