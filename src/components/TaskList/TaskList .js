import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Box, Typography, Button, TextField, MenuItem, IconButton } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TaskCard from "../TaskCard/TaskCard";
import TaskFormModal from "../TaskFormModal/TaskFormModal";
import ThemeContext from "../Contexts/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const TaskList = () => {
  const location = useLocation();
  const [taskData, setTaskData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [categories, setCategories] = useState(["All", "Work", "Personal", "Shopping"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [priorityLevels, setPriorityLevels] = useState(["All", "Low", "Medium", "High"]);
  const [activePriority, setActivePriority] = useState("All");
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTaskData(savedTasks);
  }, []);

  // Define light and dark themes
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#f9f9f9",
        paper: "#fff",
      },
      text: {
        primary: "#000",
        secondary: "#555",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#121212",
        paper: "#1e1e1e",
      },
      text: {
        primary: "#fff",
        secondary: "#aaa",
      },
    },
  });

  const activeTheme = theme === "light" ? lightTheme : darkTheme;

  const filteredTasks = taskData
    .filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => (activeCategory === "All" ? true : task.category === activeCategory))
    .filter((task) => (activePriority === "All" ? true : task.priority === activePriority))
    .filter((task) => (location.pathname === "/pending" ? task.status === "Pending" : true))
    .filter((task) => (location.pathname === "/completed" ? task.status === "Completed" : true));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setActiveCategory(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setActivePriority(event.target.value);
  };

  const handleAddNewTask = () => {
    setSelectedTask(null); // Clear selected task for adding new task
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedTask(null); // Reset selected task when closing the form
  };

  const handleSaveTask = (task) => {
    if (!task || !task.title || !task.category || !task.priority || !task.status) {
      console.error("Invalid task data", task);
      return;
    }

    const newTask = {
      ...task,
      id: task.id || Date.now(), // Ensure an ID is set
    };

    let updatedTasks;
    if (selectedTask) {
      // Update existing task
      updatedTasks = taskData.map((t) => (t.id === selectedTask.id ? newTask : t));
    } else {
      // Add new task
      updatedTasks = [...taskData, newTask];
    }

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTaskData(updatedTasks);
    handleCloseForm();
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setOpenForm(true); 
  };

  const handleDeleteTask = (taskToDelete) => {
    const updatedTasks = taskData.filter((task) => task.id !== taskToDelete.id);
    setTaskData(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleStatusChange = (task, status) => {
    const updatedTasks = taskData.map((t) =>
      t.id === task.id ? { ...t, status } : t
    );
    setTaskData(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage
  };

  return (
    <ThemeProvider theme={activeTheme}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            color: "text.primary",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <TextField
            label="Search Task"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: "300px" }}
          />
          <TextField
            select
            label="Filter by Category"
            value={activeCategory}
            onChange={handleCategoryChange}
            sx={{ width: "200px" }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Filter by Priority"
            value={activePriority}
            onChange={handlePriorityChange}
            sx={{ width: "200px" }}
          >
            {priorityLevels.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" onClick={handleAddNewTask}>
            Add New Task
          </Button>
          <IconButton onClick={toggleTheme}>
            {theme === "light" ? <WbSunnyIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>

        {/* Scrollable Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: 2,
            color: "text.primary",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
          }}
        >
          {filteredTasks.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <img
                src="/no-data-image.png"
                alt="No tasks available"
                style={{
                  width: "250px",
                  filter: theme === "dark" ? "invert(1)" : "none",
                }}
              />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredTasks.map((task) => (
                <Grid item xs={12} sm={6} md={4} key={task.id}>
                  <TaskCard
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <TaskFormModal
          open={openForm}
          onClose={handleCloseForm}
          onSave={handleSaveTask}
          task={selectedTask}
          categories={categories}
        />
      </Box>
    </ThemeProvider>
  );
};

export default TaskList;
