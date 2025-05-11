"use client"
import { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Box,
    Rating,
    Chip,
    TextField,
    InputAdornment,
    Paper,
    Drawer,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider,
    IconButton,
    useTheme,
    useMediaQuery,
    Slider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FilterListIcon from '@mui/icons-material/FilterList';
import BedIcon from '@mui/icons-material/Bed';
import GroupIcon from '@mui/icons-material/Group';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { fetchAccommodations, fetchZones } from '@/services/api';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// تعريف الأنواع
const zonesD = [
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

const accommodationTypes = [
    { id: 1, name: 'فيلا' },
    { id: 2, name: 'فندق' },
    { id: 3, name: 'شاليه' },
    { id: 4, name: 'شقة' },
    { id: 5, name: 'نُزل' },
];

const classes = [
    { id: 1, name: 'فئة A' },
    { id: 2, name: 'فئة B' },
    { id: 3, name: 'فئة C' },
    { id: 4, name: 'فئة D' },
];

interface Accommodation {
    id: number;
    name: string;
    accomodationTypeId: number;
    placeTypeId: number;
    classId: number;
    governorateId: number;
    zoneId: number;
    averagePricePerAdult: number;
    hasKidsArea: boolean;
    numOfBeds: number;
    numOfMembers: number;
    tripSuggestionId: number;
    address: string;
    bedStatus: string | null;
    contactLink: string | null;
    description: string | null;
    imageSource: string | null;
    mapLink: string | null;
    rating: number;
    score: number;
}

interface Zone {
    id: number;
    name: string;
}

interface AccommodationType {
    id: number;
    name: string;
}

interface Class {
    id: number;
    name: string;
}

interface Filters {
    zones: Zone[];
    accommodationTypes: AccommodationType[];
    classes: Class[];
    hasKidsArea: boolean;
    minPrice: number;
    maxPrice: number;
    minBeds: number;
    maxBeds: number;
    minMembers: number;
    maxMembers: number;
}
let accommodation: Accommodation[] = [
    {
        id: 1, name: 'القاهرة الجديدة',
        description: 'القاهرة الجديدة',
        zoneId: 1, governorateId: 1,
        rating: 4.5,
        averagePricePerAdult: 1000,
        accomodationTypeId: 1,
        placeTypeId: 1,
        classId: 1,
        hasKidsArea: false,
        bedStatus: 'متاح',
        address: 'القاهرة الجديدة', mapLink: null, contactLink: null, imageSource: null, score: 4.5, numOfBeds: 1, numOfMembers: 1, tripSuggestionId: 1,
    },
    {
        id: 2, name: 'القاهرة الجديدة',
        description: 'القاهرة الجديدة',
        zoneId: 1, governorateId: 1,
        rating: 4.5,
        averagePricePerAdult: 1000,
        accomodationTypeId: 1,
        placeTypeId: 1,
        classId: 1,
        hasKidsArea: true,
        bedStatus: 'متاح',
        address: 'القاهرة الجديدة',
        mapLink: null,
        contactLink: null,
        imageSource: null,
        score: 4.5,
        numOfBeds: 1,
        numOfMembers: 1,
        tripSuggestionId: 1,
    },
    {
        id: 3, name: 'القاهرة الجديدة',
        description: 'القاهرة الجديدة',
        zoneId: 1, governorateId: 1,
        rating: 4.5,
        averagePricePerAdult: 1000,
        accomodationTypeId: 1,
        placeTypeId: 1,
        classId: 1,
        hasKidsArea: true,
        bedStatus: 'متاح',
        address: 'القاهرة الجديدة',
        mapLink: null,
        contactLink: null,
        imageSource: null,
        score: 4.5,
        numOfBeds: 1,
        numOfMembers: 1,
        tripSuggestionId: 1,
    }
]

export default function AccommodationPage() {
    let [zones, setZones] = useState<any[]>(zonesD);
    const [accommodations, setAccommodations] = useState<Accommodation[]>(accommodation);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Filters>({
        zones: [],
        accommodationTypes: [],
        classes: [],
        hasKidsArea: false,
        minPrice: 0,
        maxPrice: 5000,
        minBeds: 0,
        maxBeds: 10,
        minMembers: 0,
        maxMembers: 20,
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg';

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchAccommodations();
                if (result.data && result.data.length > 0) {
                    setAccommodations(result.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const getZones = async () => {
            const result = await fetchZones();
            setZones(result.data);
        };
        getData();
        getZones();
    }, []);

    const handleFilterChange = (type: keyof Filters, value: any) => {
        setFilters(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const filteredAccommodations = accommodations.filter(accommodation => {
        const matchesSearch = accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            accommodation?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            accommodation.address.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesZone = filters.zones.length === 0 || filters.zones.filter(z => z.id === accommodation.zoneId).length > 0;
        const matchesType = filters.accommodationTypes.length === 0 || filters.accommodationTypes.filter(t => t.id === accommodation.accomodationTypeId).length > 0;
        const matchesClass = filters.classes.length === 0 || filters.classes.filter(c => c.id === accommodation.classId).length > 0;
        const matchesKidsArea = !filters.hasKidsArea || accommodation.hasKidsArea;
        const matchesPrice = accommodation.averagePricePerAdult >= filters.minPrice &&
            accommodation.averagePricePerAdult <= filters.maxPrice;
        const matchesBeds = accommodation.numOfBeds >= filters.minBeds &&
            accommodation.numOfBeds <= filters.maxBeds;
        const matchesMembers = accommodation.numOfMembers >= filters.minMembers &&
            accommodation.numOfMembers <= filters.maxMembers;

        return matchesSearch && matchesZone && matchesType && matchesClass &&
            matchesKidsArea && matchesPrice && matchesBeds && matchesMembers;
    });
    console.log(filters, filteredAccommodations);

    const FilterDrawer = () => (
        <Drawer
            anchor="right"
            open={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            variant={isMobile ? "temporary" : "permanent"}
            sx={{
                width: 280,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 280,
                    boxSizing: 'border-box',
                    position: isMobile ? 'fixed' : 'relative',
                },
            }}
        >
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    الفلترة
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" gutterBottom>
                            المناطق
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails onClick={() => { }}>
                        <FormGroup>
                            {zones.map((zone) => (
                                <FormControlLabel
                                    key={zone.id}
                                    control={
                                        <Checkbox
                                            checked={filters.zones.includes(zone.id)}
                                            onChange={(e) => {
                                                const newZones = e.target.checked
                                                    ? [...filters.zones, zone.id]
                                                    : filters.zones.filter(id => id !== zone.id);
                                                handleFilterChange('zones', newZones);
                                            }}
                                        />
                                    }
                                    label={zone.name}
                                />
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 2 }} />
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" gutterBottom>
                            نوع الإقامة
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            {accommodationTypes.map((type) => (
                                <FormControlLabel
                                    key={type.id}
                                    control={
                                        <Checkbox
                                            checked={filters.accommodationTypes.filter(t => t.id === type.id).length > 0}
                                            onChange={(e) => {
                                                const newTypes = e.target.checked
                                                    ? [...filters.accommodationTypes, type]
                                                    : filters.accommodationTypes.filter(t => t.id !== type.id);
                                                handleFilterChange('accommodationTypes', newTypes);
                                            }}
                                        />
                                    }
                                    label={type.name}
                                />
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 2 }} />
                <Accordion component="div">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" gutterBottom>
                            الفئات
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            {classes.map((cls) => (
                                <FormControlLabel
                                    key={cls.id}
                                    control={
                                        <Checkbox
                                            checked={filters.classes.filter(c => c.id === cls.id).length > 0}
                                            onChange={(e) => {
                                                const newClasses = e.target.checked
                                                    ? [...filters.classes, cls]
                                                    : filters.classes.filter(c => c.id !== cls.id);
                                                handleFilterChange('classes', newClasses);
                                            }}
                                        />
                                    }
                                    label={cls.name}
                                />
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
                <Divider sx={{ my: 2 }} />

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
                <Box sx={{ px: 2 }}>
                    <Slider
                        value={[filters.minPrice, filters.maxPrice]}
                        onChange={(_, newValue) => {
                            handleFilterChange('minPrice', newValue[0]);
                            handleFilterChange('maxPrice', newValue[1]);
                        }}
                        valueLabelDisplay="auto"
                        min={0}
                        max={5000}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{filters.minPrice} جنيه</Typography>
                        <Typography variant="body2">{filters.maxPrice} جنيه</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" gutterBottom>
                    عدد الغرف
                </Typography>
                <Box sx={{ px: 2 }}>
                    <Slider
                        value={[filters.minBeds, filters.maxBeds]}
                        onChange={(_, newValue) => {
                            handleFilterChange('minBeds', newValue[0]);
                            handleFilterChange('maxBeds', newValue[1]);
                        }}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{filters.minBeds} غرفة</Typography>
                        <Typography variant="body2">{filters.maxBeds} غرفة</Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" gutterBottom>
                    عدد الأفراد
                </Typography>
                <Box sx={{ px: 2 }}>
                    <Slider
                        value={[filters.minMembers, filters.maxMembers]}
                        onChange={(_, newValue) => {
                            handleFilterChange('minMembers', newValue[0]);
                            handleFilterChange('maxMembers', newValue[1]);
                        }}
                        valueLabelDisplay="auto"
                        min={0}
                        max={20}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{filters.minMembers} فرد</Typography>
                        <Typography variant="body2">{filters.maxMembers} فرد</Typography>
                    </Box>
                </Box>
            </Paper>
        </Drawer>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {!isMobile && <FilterDrawer />}

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1">
                        أماكن الإقامة
                    </Typography>
                    {isMobile && (
                        <IconButton onClick={() => setIsFilterOpen(true)}>
                            <FilterListIcon />
                        </IconButton>
                    )}
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

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                    {filteredAccommodations.map((accommodation) => (
                        <Box key={accommodation.id}>
                            <Paper
                                elevation={3}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                    },
                                }}
                                onClick={() => router.push(`/accommodation/${accommodation.id}`)}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <img
                                        src={accommodation.imageSource || defaultImage}
                                        alt={accommodation.name}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    {accommodation.hasKidsArea && (
                                        <Chip
                                            icon={<ChildCareIcon />}
                                            label="منطقة أطفال"
                                            color="primary"
                                            size="small"
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                backgroundColor: '#ff6600',
                                            }}
                                        />
                                    )}
                                </Box>
                                <Box sx={{ p: 2, flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {accommodation.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Rating value={accommodation.rating} readOnly size="small" />
                                        <Typography variant="body2" sx={{ ml: 1 }}>
                                            ({accommodation.score})
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 1,
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {accommodation.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: '#666' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {accommodation.address}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <BedIcon fontSize="small" sx={{ mr: 0.5, color: '#666' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {accommodation.numOfBeds} غرفة
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <GroupIcon fontSize="small" sx={{ mr: 0.5, color: '#666' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {accommodation.numOfMembers} فرد
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="h6" color="primary" sx={{ mt: 'auto' }}>
                                        من {accommodation.averagePricePerAdult} جنيه
                                    </Typography>
                                </Box>
                            </Paper>
                        </Box>
                    ))}
                </Box>
            </Container>

            {isMobile && <FilterDrawer />}
        </Box>
    );
}