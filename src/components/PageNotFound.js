import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 3 }}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleRedirect}>
        Go to Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
