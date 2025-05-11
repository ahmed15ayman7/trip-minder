import AccessTime from "@mui/icons-material/AccessTime";
import Add from "@mui/icons-material/Add";
import ArrowForward from "@mui/icons-material/ArrowForward";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Remove from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Price = () => {
  // Data for ticket types
  const [tickets, setTickets] = useState([
    { id: 1, type: "Adult (18+ years)", price: 282.0, quantity: 3 },
    { id: 2, type: "Youth (13-17 years)", price: 168.0, quantity: 2 },
    { id: 3, type: "Children (0-12 years)", price: 80.0, quantity: 4 },
  ]);

  // Data for extra services
  const [extras, setExtras] = useState([
    { id: 1, name: "Add Service per booking", price: 40, selected: false },
    {
      id: 2,
      name: "Add Service per person",
      price: 40,
      selected: false,
      details: "Adult: $17.00 - Youth: $14.00",
    },
  ]);

  // Handle ticket quantity changes
  const handleQuantityChange = (id: number, increment: number) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, quantity: Math.max(0, ticket.quantity + increment) }
          : ticket,
      ),
    );
  };

  // Handle extra service selection
  const handleExtraChange = (id: number) => {
    setExtras(
      extras.map((extra) =>
        extra.id === id ? { ...extra, selected: !extra.selected } : extra,
      ),
    );
  };

  // Calculate total price
  const calculateTotal = () => {
    const ticketsTotal = tickets.reduce(
      (sum, ticket) => sum + ticket.price * ticket.quantity,
      0,
    );
    const extrasTotal = extras.reduce(
      (sum, extra) => (extra.selected ? sum + extra.price : sum),
      0,
    );
    return (ticketsTotal + extrasTotal).toFixed(2);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: 360,
        borderRadius: 2,
        border: "1px solid #e7e6e6",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 4, pb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body1" color="#05073c">
            From
          </Typography>
          <Typography variant="h6" fontWeight="medium" color="#05073c">
            $1,200
          </Typography>
        </Stack>

        <Card
          variant="outlined"
          sx={{ mt: 3, borderRadius: 2, border: "1px solid #dddddd" }}
        >
          <CardContent sx={{ p: 0 }}>
            <Stack>
              <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "neutral.100",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CalendarToday fontSize="medium" color="primary" />
                </Box>
                <Box sx={{ ml: 2 }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="medium"
                    color="#05073c"
                  >
                    From
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    February 05 ~ March 14
                  </Typography>
                </Box>
                <Box sx={{ ml: "auto" }}>
                  <ArrowForward fontSize="small" />
                </Box>
              </Box>

              <Divider />

              <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: "neutral.100",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AccessTime fontSize="medium" color="primary" />
                </Box>
                <Box sx={{ ml: 2 }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="medium"
                    color="#05073c"
                  >
                    Time
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose time
                  </Typography>
                </Box>
                <Box sx={{ ml: "auto" }}>
                  <ArrowForward fontSize="small" />
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Typography
          variant="h6"
          fontWeight="medium"
          color="#05073c"
          sx={{ mt: 3, mb: 2 }}
        >
          Tickets
        </Typography>

        <Stack spacing={2}>
          {tickets.map((ticket) => (
            <Box
              key={ticket.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" color="#05073c">
                {ticket.type}{" "}
                <Typography component="span" fontWeight="medium">
                  $
                </Typography>
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid #e7e6e6",
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                  }}
                  onClick={() => handleQuantityChange(ticket.id, -1)}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <Typography
                  variant="body2"
                  color="#05073c"
                  sx={{ width: 10, textAlign: "center" }}
                >
                  {ticket.quantity}
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    border: "1px solid #e7e6e6",
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                  }}
                  onClick={() => handleQuantityChange(ticket.id, 1)}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          ))}
        </Stack>

        <Typography
          variant="h6"
          fontWeight="medium"
          color="#05073c"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Extra
        </Typography>

        <Stack spacing={2}>
          {extras.map((extra) => (
            <Box
              key={extra.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <Checkbox
                  checked={extra.selected}
                  onChange={() => handleExtraChange(extra.id)}
                  sx={{ p: 0, mr: 1 }}
                />
                <Box>
                  <Typography variant="body2" color="#05073c">
                    {extra.name}
                  </Typography>
                  {extra.details && (
                    <Typography
                      variant="body2"
                      color="#05073c"
                      sx={{ mt: 0.5 }}
                    >
                      {extra.details}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Typography variant="body2" color="#05073c">
                ${extra.price}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" fontWeight="medium" color="#05073c">
            Total:
          </Typography>
          <Typography variant="h6" fontWeight="medium" color="#05073c">
            ${calculateTotal()}
          </Typography>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            bgcolor: "#eb662b",
            "&:hover": { bgcolor: "#d55a25" },
            borderRadius: 2,
            py: 1.5,
          }}
          endIcon={<ArrowForward />}
        >
          Book Now
        </Button>
      </Box>
    </Paper>
  );
};

export default Price;
