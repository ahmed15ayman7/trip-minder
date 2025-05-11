import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
    Box,
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import React from "react";

const Over1 = () => {
    // Tour specifications data
    const tourSpecs = [
        { label: "Duration", value: "3 days" },
        { label: "Group Size", value: "10 people" },
        { label: "Ages", value: "18-99 yrs" },
        { label: "Languages", value: "English, Japanese" },
    ];

    // Tour highlights data
    const highlights = [
        "Experience the thrill of a speedboat to the stunning Phi Phi Islands",
        "Be amazed by the variety of marine life in the archepelagо",
        "Enjoy relaxing in paradise with white sand beaches and azure turquoise water",
        "Feel the comfort of a tour limited to 35 passengers",
        "Catch a glimpse of the wild monkeys around Monkey Beach",
    ];

    // What's included data
    const included = [
        "Beverages, drinking water, morning tea and buffet lunch",
        "Local taxes",
        "Hotel pickup and drop-off by air-conditioned minivan",
        "InsuranceTransfer to a private pier",
        "Soft drinks",
        "Tour Guide",
    ];

    // What's not included data
    const notIncluded = ["Towel", "Tips", "Alcoholic Beverages"];

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                {/* Tour Specifications */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    {tourSpecs.map((spec, index) => (
                        <Grid component="div" size={{ xs: 12, md: 3 }} key={index}>
                            <Paper
                                elevation={0}
                                sx={{ p: 2, borderRadius: 2, height: "100%" }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    {spec.label}
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                    {spec.value}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Tour Overview */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{ mb: 2, fontWeight: "bold" }}
                    >
                        Tour Overview
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The Phi Phi archipelago is a must-visit while in Phuket, and this
                        speedboat trip whisks you around the islands in one day. Swim over
                        the coral reefs of Pileh Lagoon, have lunch at Phi Phi Leh, snorkel
                        at Bamboo Island, and visit Monkey Beach and Maya Bay, immortalized
                        in "The Beach." Boat transfers, snacks, buffet lunch, snorkeling
                        equipment, and Phuket hotel pickup and drop-off all included.
                    </Typography>
                </Box>

                {/* Tour Highlights */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{ mb: 2, fontWeight: "bold" }}
                    >
                        Tour Highlights
                    </Typography>
                    <List>
                        {highlights.map((highlight, index) => (
                            <ListItem key={index} sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 24 }}>
                                    <Typography variant="body1">•</Typography>
                                </ListItemIcon>
                                <ListItemText primary={highlight} />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* What's included */}
                <Box>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{ mb: 3, fontWeight: "bold" }}
                    >
                        What's included
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid component="div" size={{ xs: 12, md: 6 }}>
                            <List>
                                {included.map((item, index) => (
                                    <ListItem key={index} sx={{ py: 1 }}>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon sx={{ color: "#e0f2e9" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid component="div" size={{ xs: 12, md: 6 }}>
                            <List>
                                {notIncluded.map((item, index) => (
                                    <ListItem key={index} sx={{ py: 1 }}>
                                        <ListItemIcon>
                                            <CancelOutlinedIcon sx={{ color: "#fbe9e7" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Over1;
