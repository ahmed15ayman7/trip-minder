"use client"

import { useEffect, useState } from 'react';
import { fetchRestaurants, fetchZones } from '@/services/api';
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
    List,
    ListItem,
    ListItemText,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Divider,
    IconButton,
    useTheme,
    useMediaQuery,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useRouter } from 'next/navigation';
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

const foodCategories = [
    { id: 1, name: 'مأكولات بحرية' },
    { id: 2, name: 'مشويات وستيك' },
    { id: 3, name: 'مطبخ أوروبي' },
    { id: 4, name: 'مطبخ آسيوي' },
    { id: 5, name: 'مطبخ ياباني (سوشي)' },
    { id: 6, name: 'وجبات سريعة' },
    { id: 7, name: 'مطبخ نوبي' },
    { id: 8, name: 'وجبات خفيفة' },
    { id: 9, name: 'مطبخ شرقي (لبناني)' },
    { id: 10, name: 'مطبخ شرقي ومصري' },
    { id: 11, name: 'طعام تقليدي' },
];

const classes = [
    { id: 1, name: 'فئة A' },
    { id: 2, name: 'فئة B' },
    { id: 3, name: 'فئة C' },
    { id: 4, name: 'فئة D' },
];

interface Restaurant {
    id: number;
    name: string;
    foodCategoryId: number;
    placeTypeId: number;
    classId: number;
    zoneId: number;
    averagePricePerAdult: number;
    hasKidsArea: boolean;
    tripSuggestionId: number;
    address: string;
    contactLink: string;
    description: string;
    imageSource: string | null;
    mapLink: string;
    rating: number;
    score: number;
}

interface Zone {
    id: number;
    name: string;
}

interface FoodCategory {
    id: number;
    name: string;
}

interface Class {
    id: number;
    name: string;
}

interface Filters {
    zones: Zone[];
    foodCategories: FoodCategory[];
    classes: Class[];
    hasKidsArea: boolean;
    minPrice: number;
    maxPrice: number;
}
const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg';
let restaurantsD: Restaurant[] = [
    { id: 1, name: 'مطعم 1', description: 'مطعم 1', imageSource: defaultImage, rating: 4.5, score: 4.5, zoneId: 1, foodCategoryId: 1, classId: 1, hasKidsArea: true, placeTypeId: 1, averagePricePerAdult: 100, tripSuggestionId: 1, address: 'القاهرة', contactLink: 'https://via.placeholder.com/150', mapLink: 'https://via.placeholder.com/150' },
    { id: 2, name: 'مطعم 2', description: 'مطعم 2', imageSource: defaultImage, rating: 4.5, score: 4.5, zoneId: 1, foodCategoryId: 1, classId: 1, hasKidsArea: true, placeTypeId: 1, averagePricePerAdult: 100, tripSuggestionId: 1, address: 'القاهرة', contactLink: 'https://via.placeholder.com/150', mapLink: 'https://via.placeholder.com/150' },
    { id: 3, name: 'مطعم 3', description: 'مطعم 3', imageSource: defaultImage, rating: 4.5, score: 4.5, zoneId: 1, foodCategoryId: 1, classId: 1, hasKidsArea: true, placeTypeId: 1, averagePricePerAdult: 100, tripSuggestionId: 1, address: 'القاهرة', contactLink: 'https://via.placeholder.com/150', mapLink: 'https://via.placeholder.com/150' },
];

export default function RestaurantsPage() {
    let [zones, setZones] = useState<any[]>(zonesD);
    const [restaurants, setRestaurants] = useState<Restaurant[]>(restaurantsD);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Filters>({
        zones: [],
        foodCategories: [],
        classes: [],
        hasKidsArea: false,
        minPrice: 0,
        maxPrice: 1000,
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg';

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await fetchRestaurants();
                if (result.data && result.data.length > 0) {
                    setRestaurants(result.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
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

    const getZones = async () => {
        const result = await fetchZones();
        setZones(result.data);
    };

    const filteredRestaurants = restaurants.filter(restaurant => {
        const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            restaurant.address.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesZone = filters.zones.length === 0 || filters.zones.filter(z => z.id === restaurant.zoneId).length > 0;
        const matchesCategory = filters.foodCategories.length === 0 || filters.foodCategories.filter(c => c.id === restaurant.foodCategoryId).length > 0;
        const matchesClass = filters.classes.length === 0 || filters.classes.filter(c => c.id === restaurant.classId).length > 0;
        const matchesKidsArea = !filters.hasKidsArea || restaurant.hasKidsArea;
        const matchesPrice = restaurant.averagePricePerAdult >= filters.minPrice &&
            restaurant.averagePricePerAdult <= filters.maxPrice;

        return matchesSearch && matchesZone && matchesCategory && matchesClass && matchesKidsArea && matchesPrice;
    });

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
            <Box sx={{ p: 2, overflowY: "scroll" }}>
                <Typography variant="h6" gutterBottom>
                    الفلترة
                </Typography>
                <Divider sx={{ my: 2 }} />
                {/* Accordion */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
                        <Typography variant="subtitle1" gutterBottom>
                            المناطق
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>


                        <FormGroup>
                            {zones.map((zone) => (
                                <FormControlLabel
                                    key={zone.id}
                                    control={
                                        <Checkbox
                                            checked={filters.zones.filter(z => z.id === zone.id).length > 0}
                                            onChange={(e) => {
                                                const newZones = e.target.checked
                                                    ? [...filters.zones, zone]
                                                    : filters.zones.filter(z => z.id !== zone.id);
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
                            فئات الطعام
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            {foodCategories.map((category) => (
                                <FormControlLabel
                                    key={category.id}
                                    control={
                                        <Checkbox
                                            checked={filters.foodCategories.filter(c => c.id === category.id).length > 0}
                                            onChange={(e) => {
                                                const newCategories = e.target.checked
                                                    ? [...filters.foodCategories, category]
                                                    : filters.foodCategories.filter(c => c.id !== category.id);
                                                handleFilterChange('foodCategories', newCategories);
                                            }}
                                        />
                                    }
                                    label={category.name}
                                />
                            ))}
                        </FormGroup>

                    </AccordionDetails>
                </Accordion>

                <Divider sx={{ my: 2 }} />
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} >
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
            </Box>
        </Drawer>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            {!isMobile && <FilterDrawer />}

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1">
                        المطاعم
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
                    placeholder="ابحث عن مطعم..."
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
                    {filteredRestaurants.map((restaurant, i) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
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
                                onClick={() => router.push(`/restaurants/${restaurant.id}`)}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <img
                                        src={restaurant.imageSource || defaultImage}
                                        alt={restaurant.name}
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    {restaurant.hasKidsArea && (
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
                                        {restaurant.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Rating value={restaurant.rating} readOnly size="small" />
                                        <Typography variant="body2" sx={{ ml: 1 }}>
                                            ({restaurant.score})
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
                                        {restaurant.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: '#666' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {restaurant.address}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" color="primary" sx={{ mt: 'auto' }}>
                                        من {restaurant.averagePricePerAdult} جنيه
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {isMobile && <FilterDrawer />}
        </Box>
    );
}