"use client"

import { Box } from "@mui/material";
import Over1 from "./Over1";
import ItineraryPage from "./ItineraryPage";
import CommentForm from "./CommentForm";
import TravelBooking from "./TravelBooking";
const Overview = () => {
    return (
        <Box>
            <Over1 />
            <ItineraryPage />
            <TravelBooking />
            <CommentForm />
        </Box>
    );
};

export default Overview;
