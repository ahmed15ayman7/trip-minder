"use client";
import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import SectionHeader from "../components/SectionHeader";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Governorate {
    id: number;
    name: string;
    description?: string;
}

const GovernoratePage = () => {
    const [governorates, setGovernorates] = useState<Governorate[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchGovernorates = async () => {
            try {
                const response = await fetch("/api/governorate");
                const data = await response.json();
                if (data && data.data && data.data.length > 0) {
                    setGovernorates(data.data);
                } else {
                    setGovernorates([
                        { id: 1, name: "القاهرة", description: "عاصمة مصر وأكبر مدنها." },
                        { id: 2, name: "الإسكندرية", description: "عروس البحر المتوسط." },
                        { id: 3, name: "الجيزة", description: "موطن الأهرامات وأبو الهول." },
                        // ... أضف المزيد افتراضياً
                    ]);
                }
            } catch (error) {
                setGovernorates([
                    { id: 1, name: "القاهرة", description: "عاصمة مصر وأكبر مدنها." },
                    { id: 2, name: "الإسكندرية", description: "عروس البحر المتوسط." },
                    { id: 3, name: "الجيزة", description: "موطن الأهرامات وأبو الهول." },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchGovernorates();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <SectionHeader title="كل المحافظات" isSeeAll={false} />
            <Grid container spacing={3}>
                {governorates.map((gov, idx) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={gov.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.07 }}
                        >
                            <Card
                                sx={{
                                    cursor: "pointer",
                                    borderRadius: 3,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    border: "1px solid #eee",
                                    height: "100%",
                                    transition: "transform 0.2s",
                                    '&:hover': { transform: 'scale(1.03)' },
                                }}
                                onClick={() => router.push(`/governorate/${gov.id}`)}
                            >
                                <CardContent>
                                    <Typography variant="h5" sx={{ color: "#ff6600", fontWeight: "bold" }} gutterBottom>
                                        {gov.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {gov.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default GovernoratePage; 