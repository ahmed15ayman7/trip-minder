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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    FormGroup,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    TextField,
    IconButton,
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
    { id: 1, name: 'Cafe', nameAr: 'مقهى' },
    { id: 2, name: 'Cinema', nameAr: 'سينما' },
    { id: 3, name: 'Park', nameAr: 'حديقة' },
    { id: 4, name: 'Shopping', nameAr: 'متجر' },
    { id: 5, name: 'Amusement', nameAr: 'منشأة ترفيهية' },
    { id: 6, name: 'Club', nameAr: 'منشأة جماعية' },
    { id: 7, name: 'Landmark', nameAr: 'معلم' },
    { id: 8, name: 'Cultural', nameAr: 'ثقافي' },
    { id: 9, name: 'Café & Garden', nameAr: 'مقهى وحديقة' },
];


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
interface Zone {
    id: number;
    name: string;
}

interface EntertainmentType {
    id: number;
    name: string;
}

interface Class {
    id: number;
    name: string;
}

interface Governorate {
    id: number;
    name: string;
}

interface Filters {
    zones: Zone[];
    governorates: Governorate[];
    entertainmentTypes: EntertainmentType[];
    classes: Class[];
    hasKidsArea: boolean;
    minPrice: number;
    maxPrice: number;

}
let entertainment: Entertainment[] = [
    { id: 1, name: 'القاهرة الجديدة', description: 'القاهرة الجديدة', classType: 'A', zone: 'القاهرة الجديدة', zoneId: 1, governorate: 'القاهرة', governorateId: 1, rating: 4.5, averagePricePerAdult: 1000, entertainmentType: 'مقهى', hasKidsArea: true, address: 'القاهرة الجديدة', mapLink: null, contactLink: null, imageUrl: null, placeType: 'Entertainment', score: 4.5 },
    { id: 2, name: 'القاهرة القديمة', description: 'القاهرة القديمة', classType: 'A', zone: 'القاهرة القديمة', zoneId: 1, governorate: 'القاهرة', governorateId: 1, rating: 4.5, averagePricePerAdult: 1000, entertainmentType: 'مقهى', hasKidsArea: true, address: 'القاهرة القديمة', mapLink: null, contactLink: null, imageUrl: null, placeType: 'Entertainment', score: 4.5 },
    { id: 3, name: 'القاهرة الجديدة', description: 'القاهرة الجديدة', classType: 'A', zone: 'القاهرة الجديدة', zoneId: 1, governorate: 'القاهرة', governorateId: 1, rating: 4.5, averagePricePerAdult: 1000, entertainmentType: 'مقهى', hasKidsArea: true, address: 'القاهرة الجديدة', mapLink: null, contactLink: null, imageUrl: null, placeType: 'Entertainment', score: 4.5 },

]

const EntertainmentPage = () => {
    let [zones, setZones] = useState<any[]>(zonesD);
    let [governorates, setGovernorates] = useState<any[]>(governoratesD);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [entertainments, setEntertainments] = useState<Entertainment[]>(entertainment);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<Filters>({
        zones: [],
        governorates: [],
        entertainmentTypes: [],
        classes: [],
        hasKidsArea: false,
        minPrice: 0,
        maxPrice: 1000,

    });

    useEffect(() => {
        fetchEntertainments();
        getZones();
        // getGovernorates();
    }, [filters]);
    const filteredEntertainments = entertainments.filter(entertainment => {
        const matchesSearch = entertainment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entertainment?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entertainment.address.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesZone = filters.zones.length === 0 || filters.zones.filter(z => z.id === entertainment.zoneId).length > 0;
        const matchesType = filters.entertainmentTypes.length === 0 || filters.entertainmentTypes.filter(t => t.name === entertainment.entertainmentType).length > 0;
        const matchesGovernorate = filters.governorates.length === 0 || filters.governorates.filter(g => g.id === entertainment.governorateId).length > 0;
        const matchesClass = filters.classes.length === 0 || filters.classes.filter(c => c.name === entertainment.classType).length > 0;
        const matchesKidsArea = !filters.hasKidsArea || entertainment.hasKidsArea;
        const matchesPrice = entertainment.averagePricePerAdult >= filters.minPrice &&
            entertainment.averagePricePerAdult <= filters.maxPrice;

        return matchesSearch && matchesZone && matchesGovernorate && matchesType && matchesClass &&
            matchesKidsArea && matchesPrice;
    });
    const fetchEntertainments = async () => {
        try {
            const response = await axios.get(`/api/entertainment/list`);
            setEntertainments(response.data.data);
        } catch (error) {
            console.error('Error fetching entertainments:', error);
        } finally {
            setLoading(false);
        }
    };
    const getZones = async () => {
        const result = await fetchZones();
        setZones(result);
    };
    const getGovernorates = async () => {
        const result = await fetchGovernorates();
        setGovernorates(result);
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
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1" gutterBottom>
                                    النوع
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {typesD.map((type) => (
                                        <FormControlLabel
                                            key={type.id}
                                            control={<Checkbox checked={filters.entertainmentTypes.filter(t => t.id === type.id).length > 0}
                                                onChange={(e) => {
                                                    const newTypes = e.target.checked
                                                        ? [...filters.entertainmentTypes, type]
                                                        : filters.entertainmentTypes.filter(t => t.id !== type.id);
                                                    handleFilterChange('entertainmentTypes', newTypes);
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

                {/* قائمة أماكن الترفيه */}
                <Grid size={{ xs: 12, md: 9 }} >
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                            <CircularProgress />
                        </Box>
                    ) : (

                        <Container sx={{ py: 4 }}>
                            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h4" component="h1">
                                    أماكن الترفيه
                                </Typography>
                            </Box>

                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="ابحث عن مكان ترفيهي..."
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
                                {filteredEntertainments.map((entertainment) => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={entertainment.id}>
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
                                            onClick={() => router.push(`/entertainment/${entertainment.id}`)}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={entertainment.imageUrl || '/images/default.png'}
                                                alt={entertainment.name}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" gutterBottom noWrap>
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
                                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                                    <Chip
                                                        label={entertainment.entertainmentType}
                                                        size="small"
                                                        color="primary"
                                                    />
                                                    {entertainment.hasKidsArea && (
                                                        <Chip
                                                            label="منطقة أطفال"
                                                            size="small"
                                                            color="secondary"
                                                        />
                                                    )}
                                                </Box>
                                                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                                    {entertainment.averagePricePerAdult} جنيه
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

export default EntertainmentPage; 