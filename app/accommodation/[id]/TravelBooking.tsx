import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ThumbDown from "@mui/icons-material/ThumbDown";
import ThumbUp from "@mui/icons-material/ThumbUp";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

// Calendar data
const februaryData = {
  month: "February 2024",
  days: [
    { day: null, date: null },
    { day: null, date: null },
    { day: null, date: null },
    { day: null, date: null },
    { day: "Thu", date: 1 },
    { day: "Fri", date: 2 },
    { day: "Sat", date: 3 },
    { day: "Sun", date: 4 },
    { day: "Mon", date: 5 },
    { day: "Tue", date: 6 },
    { day: "Wed", date: 7 },
    { day: "Thu", date: 8 },
    { day: "Fri", date: 9 },
    { day: "Sat", date: 10 },
    { day: "Sun", date: 11 },
    { day: "Mon", date: 12 },
    { day: "Tue", date: 13 },
    { day: "Wed", date: 14, selected: true },
    { day: "Thu", date: 15 },
    { day: "Fri", date: 16 },
    { day: "Sat", date: 17 },
    { day: "Sun", date: 18 },
    { day: "Mon", date: 19 },
    { day: "Tue", date: 20 },
    { day: "Wed", date: 21 },
    { day: "Thu", date: 22 },
    { day: "Fri", date: 23 },
    { day: "Sat", date: 24 },
    { day: "Sun", date: 25 },
    { day: "Mon", date: 26 },
    { day: "Tue", date: 27 },
    { day: "Wed", date: 28 },
    { day: "Thu", date: 29 },
  ],
};

const marchData = {
  month: "March 2024",
  days: [
    { day: "Fri", date: 1 },
    { day: "Sat", date: 2 },
    { day: "Sun", date: 3 },
    { day: "Mon", date: 4 },
    { day: "Tue", date: 5 },
    { day: "Wed", date: 6 },
    { day: "Thu", date: 7 },
    { day: "Fri", date: 8 },
    { day: "Sat", date: 9 },
    { day: "Sun", date: 10 },
    { day: "Mon", date: 11 },
    { day: "Tue", date: 12 },
    { day: "Wed", date: 13 },
    { day: "Thu", date: 14 },
    { day: "Fri", date: 15 },
    { day: "Sat", date: 16 },
    { day: "Sun", date: 17 },
    { day: "Mon", date: 18 },
    { day: "Tue", date: 19 },
    { day: "Wed", date: 20 },
    { day: "Thu", date: 21 },
    { day: "Fri", date: 22 },
    { day: "Sat", date: 23 },
    { day: "Sun", date: 24 },
    { day: "Mon", date: 25 },
    { day: "Tue", date: 26 },
    { day: "Wed", date: 27 },
    { day: "Thu", date: 28 },
    { day: "Fri", date: 29 },
    { day: "Sat", date: 30 },
  ],
};

// FAQ data
const faqData = [
  {
    question: "Can I get the refund?",
    answer:
      "Plagiarizing the first Coco Chanel(no.5 & some data) travel or Baffin Lagoon to Big Bear cancellation policy: For a full refund, cancel at least 24 hours in advance of the start date of the experience. Discover and book Hiking Nag Nag Nag Coco Chanel(no.5 & some data) travel or Baffin Lagoon by Big Bear",
    expanded: true,
  },
  {
    question: "Can I change the travel date?",
    answer: "",
    expanded: false,
  },
  {
    question: "When and where does the tour end?",
    answer: "",
    expanded: false,
  },
  {
    question: "Do you arrange airport transfers?",
    answer: "",
    expanded: false,
  },
];

// Rating categories
const ratingCategories = [
  { name: "Location", value: 5.0 },
  { name: "Amenities", value: 5.0 },
  { name: "Food", value: 5.0 },
  { name: "Price", value: 5.0 },
  { name: "Rooms", value: 5.0 },
  { name: "Tour Operator", value: 5.0 },
];

// Review data
const reviewData = [
  {
    id: 1,
    name: "Ali Tufan",
    date: "April 2023",
    title: "Take this tour! It's fantastic!",
    content:
      "Great for 4 hours to explore. Really a lot to see and tons of photo spots. Even have a passport for you to collect all the stamps as a souvenir. Must see if a Harry Potter fan.",
    images: [
      "/image.svg",
      "/image-2.svg",
      "/image-3.svg",
    ],
  },
  {
    id: 2,
    name: "Ali Tufan",
    date: "April 2023",
    title: "Take this tour! It's fantastic!",
    content:
      "Great for 4 hours to explore. Really a lot to see and tons of photo spots. Even have a passport for you to collect all the stamps as a souvenir. Must see if a Harry Potter fan.",
    images: [
      "/image.svg",
      "/image-2.svg",
      "/image-3.svg",
    ],
  },
  {
    id: 3,
    name: "Ali Tufan",
    date: "April 2023",
    title: "Take this tour! It's fantastic!",
    content:
      "Great for 4 hours to explore. Really a lot to see and tons of photo spots. Even have a passport for you to collect all the stamps as a souvenir. Must see if a Harry Potter fan.",
    images: [
      "/image.svg",
      "/image-2.svg",
      "/image-3.svg",
    ],
  },
];

// Calendar component
const Calendar = ({ data, isCurrentMonth }: { data: any, isCurrentMonth: boolean }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight="medium">
          {data.month}
        </Typography>
      </Box>
      <Grid container spacing={0.5}>
        {weekDays.map((day, index) => (
          <Grid size={{ xs: 12 / 7 }} key={`header-${index}`}>
            <Typography
              variant="caption"
              align="center"
              sx={{ display: "block", color: "text.secondary" }}
            >
              {day}
            </Typography>
          </Grid>
        ))}

        {data.days.map((day: any, index: number) => (
          <Grid size={{ xs: 12 / 7 }} key={`day-${index}`}>
            {day.date && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: day.selected
                    ? "primary.main"
                    : "transparent",
                  color: day.selected ? "white" : "text.primary",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: day.selected
                      ? "primary.main"
                      : "action.hover",
                  },
                }}
              >
                <Typography variant="body2">{day.date}</Typography>
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// FAQ component
const FAQSection = ({ data }: { data: any }) => {
  const [expanded, setExpanded] = useState(data.map((item: any) => item.expanded));

  const handleChange = (index: number) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        FAQ
      </Typography>
      {data.map((item: any, index: number) => (
        <Accordion
          key={index}
          expanded={expanded[index]}
          onChange={() => handleChange(index)}
          elevation={0}
          sx={{
            mb: 1,
            "&:before": { display: "none" },
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0 }}>
            <Typography variant="subtitle1">{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0 }}>
            <Typography variant="body2" color="text.secondary">
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

// Review component
const ReviewItem = ({ review }: { review: any }) => {
  return (
    <Card
      elevation={0}
      sx={{ mb: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ mr: 1 }}></Avatar>
            <Typography variant="subtitle1">{review.name}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {review.date}
          </Typography>
        </Box>
        <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
          {review.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {review.content}
        </Typography>
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {review.images.map((image: string, index: number) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <CardMedia
                component="img"
                image={image}
                alt={`Review image ${index + 1}`}
                sx={{ height: 80, borderRadius: 1 }}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="text"
            startIcon={<ThumbUp />}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            Helpful
          </Button>
          <Button
            variant="text"
            startIcon={<ThumbDown />}
            size="small"
            sx={{ color: "text.secondary" }}
          >
            Not helpful
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// Main component
const TravelBooking = () => {
  return (
    <Box sx={{ maxWidth: 885, mx: "auto", p: 2 }}>
      <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Availability Calendar
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <IconButton size="small">
                <ChevronLeft />
              </IconButton>
              <Calendar data={februaryData} isCurrentMonth={true} />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Calendar data={marchData} isCurrentMonth={false} />
              <IconButton size="small">
                <ChevronRight />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <FAQSection data={faqData} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
          Customer Reviews
        </Typography>

        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              Overall Rating
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              Excellent
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating value={5} readOnly precision={0.5} />
              <Typography variant="h6" sx={{ ml: 1 }}>
                5.0
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {ratingCategories.map((category, index) => (
              <Grid component="div" className=" grid-cols-12 gap-4 max-sm:grid-cols-12" key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">{category.name}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {category.value.toFixed(1)}
                  </Typography>
                </Box>
                <Rating
                  value={category.value}
                  readOnly
                  size="small"
                  precision={0.5}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>

        {reviewData.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button variant="outlined" color="primary">
            See more reviews
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TravelBooking;
