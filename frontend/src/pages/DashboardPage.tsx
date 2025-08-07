import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            QuickNotes EdTech Platform
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            color="text.secondary"
            gutterBottom
          >
            Dashboard
          </Typography>
          <Typography variant="body1">
            Welcome to the QuickNotes teacher dashboard. This platform delivers
            curriculum-aligned mathematics learning to South African Grade 11
            students via WhatsApp.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Platform Status: ✅ Foundation Setup Complete
            </Typography>
            <Typography variant="body2">
              Ready to begin Milestone 2: Authentication & User Management
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardPage;

