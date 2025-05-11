'use client'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const CommentForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    comment: "",
    ratings: {
      location: 0,
      amenities: 0,
      food: 0,
      room: 0,
      price: 0,
      tourOperator: 0,
    },
  });

  // Categories for ratings
  const ratingCategories = [
    ["Location", "Amenities", "Food"],
    ["Room", "Price", "Tour Operator"],
  ];

  // Handle rating changes
  const handleRatingChange = (category: string, value: number) => {
    const formattedCategory =
      category.replace(/\s+/g, "").charAt(0).toLowerCase() +
      category.replace(/\s+/g, "").slice(1);
    setFormData({
      ...formData,
      ratings: {
        ...formData.ratings,
        [formattedCategory]: value,
      },
    });
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your submission logic here
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#0a0a3c" }}
        >
          Leave a Reply
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Your email address will not be published. Required fields are marked{" "}
          <Box component="span" sx={{ color: "error.main" }}>
            *
          </Box>
        </Typography>

        {/* Rating categories */}
        {ratingCategories.map((row, rowIndex) => (
          <Grid container spacing={2} key={rowIndex} sx={{ mb: 3 }}>
            {row.map((category) => (
              <Grid size={{ xs: 12, sm: 4 }} key={category}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">{category}</FormLabel>
                  <Rating
                    name={category.toLowerCase().replace(/\s+/g, "")}
                    value={
                      //@ts-ignore
                      formData.ratings[
                      category.replace(/\s+/g, "").charAt(0).toLowerCase() +
                      category.replace(/\s+/g, "").slice(1)
                      ]
                    }
                    onChange={(event: any, newValue: number | null) => {
                      if (newValue !== null) {
                        handleRatingChange(category, newValue);
                      }
                    }}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>
        ))}

        {/* Name and Email fields */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        {/* Title field */}
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          value={formData.title}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />

        {/* Comment field */}
        <TextField
          fullWidth
          id="comment"
          name="comment"
          label="Comment"
          variant="outlined"
          multiline
          rows={6}
          value={formData.comment}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />

        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#e8642c",
            "&:hover": { bgcolor: "#d15826" },
            py: 1.5,
            px: 3,
            borderRadius: 1,
          }}
        >
          Post Comment
        </Button>
      </Box>
    </Container>
  );
};

export default CommentForm; 