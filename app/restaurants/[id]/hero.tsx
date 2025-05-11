import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import {
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import Price from "./price";
import OverView from "./Overview";
import AccommodationListCarousel from "@/components/AccommodationListCarousel";
const Hero = () => {
    // Data for star ratings
    const rating = 4.8;
    const reviewCount = 269;

    // Tour information
    const tourInfo = {
        title:
            "Phi Phi Islands Adventure Day Trip with Seaview Lunch by V. Marine Tour",
        location: "Paris, France",
        bookings: "30K+ booked",
    };

    // Images data
    const images = [
        {
            url: "/image.svg",
            gridArea: "1 / 1 / 3 / 2",
            width: "100%",
            height: "510px",
        },
        {
            url: "/image-2.svg",
            gridArea: "1 / 2 / 2 / 3",
            width: "100%",
            height: "250px",
        },
        {
            url: "/image-3.svg",
            gridArea: "2 / 2 / 3 / 3",
            width: "250px",
            height: "250px",
        },
        {
            url: "/image-4.svg",
            gridArea: "2 / 3 / 3 / 3",
            width: "250px",
            height: "250px",
            hasButton: true,
        },
    ];

    return (
        <Box maxWidth="1320px" position="relative" className="w-full px-10">
            <Box maxWidth="788px" mb={4}>
                <Stack direction="row" spacing={1} mt={2} mb={2}>
                    <Chip
                        label="Bestseller"
                        sx={{
                            bgcolor: "#eb662b0d",
                            color: "#eb662b",
                            fontWeight: 500,
                            borderRadius: "200px",
                            height: "40px",
                        }}
                    />
                    <Chip
                        label="Free cancellation"
                        sx={{
                            bgcolor: "neutral.100",
                            color: "black",
                            fontWeight: 500,
                            borderRadius: "200px",
                            height: "40px",
                        }}
                    />
                </Stack>

                <Typography
                    variant="h3"
                    color="#05073c"
                    fontWeight="bold"
                    fontSize="39.7px"
                    lineHeight="56px"
                    mb={3}
                >
                    {tourInfo.title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                    {[...Array(5)].map((_, index) => (
                        <StarIcon key={index} sx={{ color: "#e2ad64", fontSize: "15px" }} />
                    ))}
                    <Typography variant="body2" color="#05073c" fontSize="14.5px">
                        {rating} ({reviewCount})
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                        <LocationOnIcon sx={{ color: "#05073c", fontSize: "16px" }} />
                        <Typography
                            variant="body2"
                            color="#05073c"
                            fontSize="14.2px"
                            ml={0.5}
                        >
                            {tourInfo.location}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                        <PeopleIcon sx={{ color: "#05073c", fontSize: "16px" }} />
                        <Typography
                            variant="body2"
                            color="#05073c"
                            fontSize="14.5px"
                            ml={0.5}
                        >
                            {tourInfo.bookings}
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Box position="absolute" right={0} top="205px">
                <Stack direction="row" spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton size="small">
                            <ShareIcon sx={{ color: "#05073c", fontSize: "16px" }} />
                        </IconButton>
                        <Typography variant="body2" color="#05073c" fontSize="14.4px">
                            Share
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton size="small">
                            <FavoriteBorderIcon sx={{ color: "#05073c", fontSize: "16px" }} />
                        </IconButton>
                        <Typography variant="body2" color="#05073c" fontSize="14.9px">
                            Wishlist
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "770px 250px 250px",
                    gridTemplateRows: "250px 250px",
                    gap: "10px",
                    mt: 3,
                }}
            >
                {images.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            gridArea: image.gridArea,
                            backgroundImage: `url(${image.url})`,
                            backgroundSize: "cover",
                            backgroundPosition: "50% 50%",
                            width: image.width,
                            height: image.height,
                            position: "relative",
                        }}
                    >
                        {image.hasButton && (
                            <Button
                                variant="contained"
                                sx={{
                                    position: "absolute",
                                    bottom: "16px",
                                    right: "16px",
                                    bgcolor: "#05073c",
                                    borderRadius: "200px",
                                    textTransform: "none",
                                    "&:hover": {
                                        bgcolor: "#05073c",
                                    },
                                }}
                            >
                                See all photos
                            </Button>
                        )}
                    </Box>
                ))}
            </Box>
            <Grid container spacing={2}>
                <Grid component="div" size={{ xs: 12, md: 8 }}>
                    <OverView />
                </Grid>
                <Grid component="div" size={{ xs: 12, md: 4 }}>
                    <Price />
                </Grid>
            </Grid>
            <AccommodationListCarousel />
        </Box>
    );
};

export default Hero;
