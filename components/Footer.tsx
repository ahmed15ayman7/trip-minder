import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

const Footer = () => {
    // Company links data
    const companyLinks = [
        { title: "About Us", url: "#" },
        { title: "Tours Reviews", url: "#" },
        { title: "Contact Us", url: "#" },
        { title: "Travel Guides", url: "#" },
        { title: "Data Policy", url: "#" },
        { title: "Cookie Policy", url: "#" },
        { title: "Legal", url: "#" },
        { title: "Sitemap", url: "#" },
    ];

    // Support links data
    const supportLinks = [
        { title: "Get in Touch", url: "#" },
        { title: "Help center", url: "#" },
        { title: "Live chat", url: "#" },
        { title: "How it works", url: "#" },
    ];

    // Mobile app links
    const mobileApps = [
        { title: "iOS App", icon: <AppleIcon />, url: "#" },
        { title: "Android App", icon: <AndroidIcon />, url: "#" },
    ];

    // Payment methods
    const paymentMethods = [
        { name: "Visa", image: "/images/visa.png" },
        { name: "Mastercard", image: "/images/mastercard.png" },
        { name: "Apple Pay", image: "/images/applepay.png" },
        { name: "PayPal", image: "/images/paypal.png" },
        { name: "American Express", image: "/images/amex.png" },
    ];

    return (
        <Box sx={{ bgcolor: "#EB662B20", py: 6 }}>
            <Container maxWidth="lg">
                {/* Top section with phone number */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                    <Typography variant="body1">
                        Speak to our expert at:
                        <Link href="tel:1-800-453-6744" color="#ff6600" sx={{ ml: 1 }}>
                            1-800-453-6744
                        </Link>
                    </Typography>
                    <Typography variant="body1">Follow Us</Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {/* Main footer content */}
                <Grid container spacing={4}>
                    {/* Contact column */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Contact
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            328 Queensberry Street, North Melbourne VIC3051, Australia
                        </Typography>
                        <Link
                            href="mailto:help@tours.com"
                            color="inherit"
                            underline="hover"
                        >
                            help@tours.com
                        </Link>
                    </Grid>

                    {/* Company column */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Company
                        </Typography>
                        <Stack spacing={1}>
                            {companyLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    color="inherit"
                                    underline="hover"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Support column */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Support
                        </Typography>
                        <Stack spacing={1}>
                            {supportLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    color="inherit"
                                    underline="hover"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Newsletter column */}
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Newsletter
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Subscribe to the free newsletter and stay up to date
                        </Typography>
                        <Box sx={{ display: "flex", mb: 4 }}>
                            <TextField
                                size="small"
                                placeholder="Your email address"
                                variant="outlined"
                                sx={{ flexGrow: 1, mr: 1 }}
                            />
                            <Button variant="contained" sx={{ bgcolor: "#ff6600" }}>
                                Send
                            </Button>
                        </Box>

                        {/* Mobile Apps */}
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Mobile Apps
                        </Typography>
                        <Stack spacing={1}>
                            {mobileApps.map((app, index) => (
                                <Link
                                    key={index}
                                    href={app.url}
                                    color="inherit"
                                    underline="hover"
                                    sx={{ display: "flex", alignItems: "center" }}
                                >
                                    {app.icon}
                                    <Typography sx={{ ml: 1 }}>{app.title}</Typography>
                                </Link>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>

                {/* Footer bottom */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 4,
                    }}
                >
                    <Typography variant="body2">© Copyright Visitours 2024</Typography>
                    <Stack direction="row" spacing={1}>
                        {paymentMethods.map((method, index) => (
                            <Box
                                key={index}
                                component="img"
                                src={method.image}
                                alt={method.name}
                                sx={{ height: 24 }}
                            />
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;