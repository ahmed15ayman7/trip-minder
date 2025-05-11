import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";

const ItineraryPage = () => {
    const [mapErrorOpen, setMapErrorOpen] = React.useState(false);

    const handleCloseMapError = () => {
        setMapErrorOpen(false);
    };

    // Itinerary data
    const itineraryData = [
        { day: 1, title: "Airport Pick Up", highlighted: true, description: "" },
        {
            day: 2,
            title: "Temples & River Cruise",
            highlighted: false,
            description: "",
        },
        {
            day: 3,
            title: "Massage & Overnight Train",
            highlighted: false,
            description:
                "Like on all of our trips, we can collect you from the airport when you land and take you directly to your hotel. The first Day is just a check-in Day so you have this freedom to explore the city and get settled in.",
        },
        {
            day: 4,
            title: "Khao Sok National Park",
            highlighted: false,
            description: "",
        },
        {
            day: 5,
            title: "Travel to Koh Phangan",
            highlighted: false,
            description: "",
        },
        {
            day: 6,
            title: "Morning Chili & Muay Thai Lesson",
            highlighted: false,
            description: "",
        },
        { day: 7, title: "Island Boat Trip", highlighted: true, description: "" },
    ];

    return (
        <Box sx={{ maxWidth: 885, margin: "0 auto", padding: 2 }}>
            {/* Itinerary Section */}
            <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold", mb: 3 }}
            >
                Itinerary
            </Typography>

            <Stack spacing={3} sx={{ mb: 6 }}>
                {itineraryData.map((item, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "flex-start" }}>
                        {/* Day marker */}
                        <Box sx={{ mr: 2, mt: 0.5 }}>
                            {item.highlighted ? (
                                <FiberManualRecordIcon sx={{ color: "orange", fontSize: 24 }} />
                            ) : (
                                <RadioButtonUncheckedIcon
                                    sx={{ color: "orange", fontSize: 24 }}
                                />
                            )}
                        </Box>

                        {/* Day content */}
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                                Day {item.day}: {item.title}
                            </Typography>

                            {item.description && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 1,
                                        color: "text.secondary",
                                        maxWidth: "90%",
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                ))}
            </Stack>

            {/* Tour Map Section */}
            <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: "bold", mb: 3 }}
            >
                Tour Map
            </Typography>
            <div className="w-full h-[380px] relative overflow-hidden">
                <Paper
                    elevation={1}
                    sx={{
                        width: "100%",
                        height: 380,
                        position: "relative",
                        overflow: "hidden",
                        backgroundImage:
                            "url('https://maps.googleapis.com/maps/api/staticmap?center=Mexico&zoom=4&size=800x380&key=YOUR_API_KEY')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Map error dialog */}
                    <Dialog
                        open={mapErrorOpen}
                        onClose={handleCloseMapError}
                        aria-labelledby="map-error-dialog"
                        sx={{
                            position: "absolute",
                            top: "30%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "auto",
                            maxWidth: 300,
                            margin: 0,
                        }}
                    >
                        <DialogTitle sx={{ textAlign: "right", pb: 0 }}>
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                Google
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant="body2">
                                This page can't load Google Maps correctly.
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: "text.secondary", mt: 1, display: "block" }}
                            >
                                Do you own this website?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseMapError} sx={{ color: "#4285F4" }}>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </div>
        </Box>
    );
};

export default ItineraryPage;
