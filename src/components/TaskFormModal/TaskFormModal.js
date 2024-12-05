import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

const TaskFormModal = ({ open, onClose, onSave, task, categories = [] }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [errors, setErrors] = useState({}); // Object to store validation errors

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setCategory(task.category || "");
      setPriority(task.priority || "");
      setSubtasks(task.subtasks || []);
      setStatus(task.status || "");
      setDueDate(task.dueDate || "");
      setErrors({}); // Clear errors on edit
    } else {
      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("");
      setStatus("");
      setDueDate("");
      setErrors({});
    }
  }, [task, open]);

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        { id: Date.now(), title: newSubtask.trim(), completed: false },
      ]);
      setNewSubtask("");
    } else {
      setErrors((prev) => ({ ...prev, newSubtask: "Subtask is required." }));
    }
  };

  const handleDeleteSubtask = (subtaskId) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Task Title is required.";
    if (!description.trim()) newErrors.description = "Task Description is required.";
    if (!category.trim()) newErrors.category = "Category is required.";
    if (!priority.trim()) newErrors.priority = "Priority is required.";
    if (!status.trim()) newErrors.status = "Status is required.";
    if (!dueDate.trim()) newErrors.dueDate = "Due Date is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = () => {
    if (!validateFields()) return;

    const userId = localStorage.getItem("userId");
    const newTask = {
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      subtasks,
      status,
      dueDate,
      createdOn: new Date().toISOString(),
      id: task?.id || Date.now(),
      userId,
    };

    // Trigger onSave callback and close the modal
    onSave(newTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
      <DialogContent
        sx={{
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent", // Ensure thumb is invisible
          },
          overflowY: "auto", // Allow content to be scrollable
          maxHeight: "70vh", // Adjust max height to fit content
        }}
      >
        <TextField
          label={
            <>
              Task Title <span style={{ color: "red" }}>*</span>
            </>
          }
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label={
            <>
              Task Description <span style={{ color: "red" }}>*</span>
            </>
          }
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          select
          label={
            <>
              Category <span style={{ color: "red" }}>*</span>
            </>
          }
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          error={!!errors.category}
          helperText={errors.category}
          sx={{ marginBottom: 2 }}
        >
          {categories.map((cat, index) => (
            <MenuItem key={index} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label={
            <>
              Priority <span style={{ color: "red" }}>*</span>
            </>
          }
          fullWidth
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          error={!!errors.priority}
          helperText={errors.priority}
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>

        <TextField
          select
          label={
            <>
              Status <span style={{ color: "red" }}>*</span>
            </>
          }
          fullWidth
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          error={!!errors.status}
          helperText={errors.status}
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>

        <TextField
          label={
            <>
              Due Date <span style={{ color: "red" }}>*</span>
            </>
          }
          type="date"
          fullWidth
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          error={!!errors.dueDate}
          helperText={errors.dueDate}
          sx={{ marginBottom: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label={
            <>
              Subtask <span style={{ color: "red" }}></span>
            </>
          }
          fullWidth
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleAddSubtask} sx={{ marginBottom: 2 }}>
          Add Subtask
        </Button>
        {subtasks.length > 0 && (
          <List>
            {subtasks.map((subtask) => (
              <ListItem key={subtask.id}>
                <ListItemText primary={subtask.title} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleDeleteSubtask(subtask.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        {errors.subtasks && (
          <Typography variant="body2" color="error">
            {errors.subtasks}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormModal;
