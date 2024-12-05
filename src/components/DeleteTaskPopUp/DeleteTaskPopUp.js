import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

const DeleteTaskPopUp = ({ open, onConfirm, onCancel }) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="delete-task-dialog-title"
            aria-describedby="delete-task-dialog-description"
        >
            <DialogTitle id="delete-task-dialog-title">Delete Task</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-task-dialog-description">
                    Are you sure you want to delete this task?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteTaskPopUp;
