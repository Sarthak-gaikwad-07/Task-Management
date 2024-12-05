import { useEffect, useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ThemeContext from "../Contexts/ThemeContext"; // Import your ThemeContext

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fullName, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null); // State for the dropdown menu
  const { theme } = useContext(ThemeContext); // Access theme context

  // Determine the active tab based on the current route
  const getActiveTab = () => {
    switch (location.pathname) {
      case "/pending":
        return 1;
      case "/completed":
        return 2;
      default:
        return 0; // Default to "All Tasks"
    }
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const token = localStorage.getItem("token");

    if (token) {
      const loggedUser = users.find((user) =>
        token.includes(user.email)
      );
      setUserName(loggedUser ? loggedUser.fullName : "Guest");
    }
  }, []);

  // Handle tab change and navigate to appropriate route
  const handleTabChange = (event, newValue) => {
    if (newValue === 0) navigate("/all");
    if (newValue === 1) navigate("/pending");
    if (newValue === 2) navigate("/completed");
  };

  // Handle menu open/close
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear user session
    navigate("/"); // Redirect to sign-in page
    handleMenuClose(); // Close the menu
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          𝐓𝐨𝐝𝐨 𝐋𝐢𝐬𝐭 𝐀𝐩𝐩
        </Typography>
        <Tabs
          value={getActiveTab()} // Dynamically set the active tab
          onChange={handleTabChange} // Handle tab switching
          indicatorColor="secondary"
          textColor="inherit"
          centered
        >
          <Tab label="𝐀𝐥𝐥 𝐓𝐚𝐬𝐤𝐬" />
          <Tab label="𝐏𝐞𝐧𝐝𝐢𝐧𝐠 𝐓𝐚𝐬𝐤𝐬" />
          <Tab label="𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐞𝐝 𝐓𝐚𝐬𝐤𝐬" />
        </Tabs>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleMenuOpen} // Open menu on click
        >
          <AccountCircle sx={{ height: "2ch", width: "3ch" }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: theme === "dark" ? "#1E1E1E" : "#fff", // Menu background
              color: theme === "dark" ? "#fff" : "#000", // Menu text color
            },
          }}
        >
          <MenuItem
            sx={{
              "&:hover": {
                backgroundColor: theme === "dark" ? "#333" : "#f0f0f0", // Hover effect
              },
            }}
          >
            {fullName}
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              "&:hover": {
                backgroundColor: theme === "dark" ? "#333" : "#f0f0f0", // Hover effect
              },
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
