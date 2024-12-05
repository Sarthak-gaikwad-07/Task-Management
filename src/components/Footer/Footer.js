import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import ThemeContext from "../Contexts/ThemeContext"; // Import ThemeContext to get the current theme

const Footer = () => {
  const { theme } = useContext(ThemeContext); // Access the current theme from context

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: 2,
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor:"#f5f5f5",
        zIndex: 10,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "#000", // Ensure text color is always black
        }}
      >
        This Is Simple Todo List App !
      </Typography>
    </Box>
  );
};

export default Footer;
