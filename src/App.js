import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import TaskList from "./components/TaskList/TaskList ";
import TaskFormModal from "./components/TaskFormModal/TaskFormModal";
import PageNotFound from "./components/PageNotFound"; // Import the NotFound component
import { ThemeProvider } from "./components/Contexts/ThemeContext";
import SignIn from "./components/public/SignIn";
import SignUp from "./components/public/SignUp";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks are updated
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleSave = (task) => {
    if (task.id) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, ...task } : t))
      );
    } else {
      setTasks((prev) => [
        ...prev,
        {
          ...task,
          id: Date.now(),
          status: "Pending",
          createdOn: new Date().toLocaleString(),
        },
      ]);
    }
    setIsFormOpen(false);
  };

  const handleDelete = (task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const getFilteredTasks = (filter) => {
    if (filter === "pending") return tasks.filter((task) => task.status === "Pending");
    if (filter === "completed") return tasks.filter((task) => task.status === "Completed");
    return tasks; // Default is "all," so return all tasks
  };

  const openForm = (task = null) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  return (
    <ThemeProvider>
      <Router>
        <LocationBasedHeader />
        <div>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/all" element={
              <TaskList
                tasks={getFilteredTasks()}
                onEdit={openForm}
                onDelete={handleDelete}
                onStatusChange={(task, status) => handleSave({ ...task, status })}
                openForm={() => openForm()}
              />
            } />
            <Route path="/pending" element={
              <TaskList
                tasks={getFilteredTasks("pending")}
                onEdit={openForm}
                onDelete={handleDelete}
                onStatusChange={(task, status) => handleSave({ ...task, status })}
                openForm={() => openForm()}
              />
            } />
            <Route path="/completed" element={
              <TaskList
                tasks={getFilteredTasks("completed")}
                onEdit={openForm}
                onDelete={handleDelete}
                onStatusChange={(task, status) => handleSave({ ...task, status })}
                openForm={() => openForm()}
              />
            } />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <TaskFormModal
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSave={handleSave}
            task={selectedTask}
          />
        </div>
        <LocationBasedFooter />
      </Router>
    </ThemeProvider>
  );
};

// LocationBasedHeader component to manage conditional rendering of Header based on route
const LocationBasedHeader = () => {
  const location = useLocation();
  const noHeaderRoutes = ["/", "/sign-up"]; // Routes where the header should not appear
  const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);

  return shouldShowHeader ? <Header /> : null;
};

const LocationBasedFooter = () => {
  const location = useLocation();
  const noFooterRoutes = ["/", "/sign-up"]; // Routes where the footer should not appear
  const shouldShowFooter = !noFooterRoutes.includes(location.pathname);

  return shouldShowFooter ? <Footer /> : null;
};

export default App;
