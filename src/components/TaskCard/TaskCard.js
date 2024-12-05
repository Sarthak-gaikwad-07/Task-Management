import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Box,
  LinearProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteTaskPopUp from "../DeleteTaskPopUp/DeleteTaskPopUp";
import dayjs from "dayjs";
import ThemeContext from "../Contexts/ThemeContext";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const isOverdue = task.dueDate && dayjs().isAfter(dayjs(task.dueDate));

  if (!task) {
    // Early return if the task prop is undefined
    return null;
  }

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    onDelete(task);
    setOpenDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const priorityColor = {
    High: "error",
    Medium: "warning",
    Low: "success",
  };

  // Calculate the progress percentage based on task status
  const calculateProgressPercentage = () => {
    switch (task.status) {
      case "Pending":
        return 0;
      case "Ongoing":
        return 50;
      case "Completed":
        return 100;
      default:
        return 0;
    }
  };

  const progressPercentage = calculateProgressPercentage();

  return (
    <>
      <Card
        sx={{
          boxShadow: 3,
          position: "relative",
          marginBottom: 2,
          padding: 1,
          backgroundColor: theme === "dark" ? "#1E1E1E" : isOverdue ? "#ffebee" : "white",
          color: theme === "dark" ? "#ffffff" : "#000000",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: 1,
              color: theme === "dark" ? "#ffffff" : "inherit",
            }}
          >
            {task.title || "Untitled Task"}
          </Typography>

          {task.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                marginBottom: 1,
                color: theme === "dark" ? "#B0B0B0" : "inherit",
              }}
            >
              <strong>Description:</strong> {task.description}
            </Typography>
          )}

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginBottom: 1,
              color: theme === "dark" ? "#B0B0B0" : "inherit",
            }}
          >
            <strong>Status:</strong> {task.status || "Not Specified"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginBottom: 1,
              color: theme === "dark" ? "#B0B0B0" : "inherit",
            }}
          >
            <strong>Category:</strong> {task.category || "Not Specified"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginBottom: 1,
              color: theme === "dark" ? "#B0B0B0" : "inherit",
            }}
          >
            <strong>Created On:</strong>{" "}
            {task.createdOn ? dayjs(task.createdOn).format("YYYY-MM-DD") : "Not Available"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              color: theme === "dark" ? "#B0B0B0" : "inherit",
            }}
          >
            <strong>Due Date:</strong>{" "}
            {task.dueDate && dayjs(task.dueDate).isValid()
              ? dayjs(task.dueDate).format("YYYY-MM-DD")
              : "Not Set"}
          </Typography>

          {task.priority && (
            <Chip
              label={task.priority}
              color={priorityColor[task.priority]}
              sx={{ marginTop: 1 }}
            />
          )}

          {/* Display progress bar and percentage */}
          <Box sx={{ marginTop: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: theme === "dark" ? "#B0B0B0" : "inherit",
              }}
            >
              Progress:
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progressPercentage}
              sx={{
                marginTop: 1,
                backgroundColor: theme === "dark" ? "#333333" : "#e0e0e0", // Change background based on theme
                '& .MuiLinearProgress-bar': {
                  backgroundColor: theme === "dark" ? "#76c7c0" : "#3f51b5", // Change progress color based on theme
                },
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                marginTop: 1,
                color: theme === "dark" ? "#B0B0B0" : "inherit",
              }}
            >
              {progressPercentage}%
            </Typography>
          </Box>
          {Array.isArray(task.subtasks) && task.subtasks.length > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Typography
                variant="subtitle2"
                color="text.primary"
                sx={{
                  color: theme === "dark" ? "#ffffff" : "inherit",
                }}
              >
                Subtasks:
              </Typography>
              {task.subtasks.map((subtask, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    color: theme === "dark" ? "#B0B0B0" : "inherit",
                  }}
                >
                  - {subtask.title}
                </Typography>
              ))}
            </Box>
          )}
        </CardContent>

        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: theme === "dark" ? "#ffffff" : "inherit",
          }}
          onClick={handleMenuOpen}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => onStatusChange(task, "Completed")}>
            Mark as Completed
          </MenuItem>
          <MenuItem onClick={() => onStatusChange(task, "Ongoing")}>
            Mark as Ongoing
          </MenuItem>
          <MenuItem onClick={() => onEdit(task)}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
      </Card>

      <DeleteTaskPopUp
        open={openDeleteDialog}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default TaskCard;
