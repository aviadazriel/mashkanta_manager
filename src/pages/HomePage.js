import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the Database Manager
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/users"
        >
          Manage Users
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/articles"
        >
          Manage Articles
        </Button>

        <Button
  variant="contained"
  color="primary"
  component={Link}
  to="/news"
>
  Manage News
</Button>


<Button
  variant="contained"
  color="primary"
  component={Link}
  to="/chat"
>
  AI Chat Assistant
</Button>
      </Box>
    </Box>
  );
};

export default HomePage;
