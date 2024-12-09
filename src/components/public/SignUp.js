import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Grid,
    Box,
    Typography,
    Input,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
        fullName: "",
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => password.length >= 8;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        let error = "";
        if (name === "email" && value && !validateEmail(value)) {
            error = "Invalid email format.";
        }
        if (name === "password" && value && !validatePassword(value)) {
            error = "Password must be at least 8 characters long.";
        }
        setFormErrors({ ...formErrors, [name]: error });
        setError("");
    };

    const isFormValid = () =>
        formData.fullName &&
        validateEmail(formData.email) &&
        validatePassword(formData.password) &&
        !formErrors.email &&
        !formErrors.password;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const emailExists = existingUsers.some((user) => user.email === formData.email);

        if (emailExists) {
            setError("Email already exists. Please use a different email.");
            setLoading(false);
            return;
        }

        try {
            const userId = uuidv4();
            const newUser = {
                userId,
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            };

            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
                localStorage.setItem("userId", userId);
                toast.success("Account Created successfully!");
                setTimeout(() => navigate("/"), 2000);
                setFormData({ fullName: "", email: "", password: "" });
            } else {
                setError("Failed to create account. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ background: "success", color: "green", minHeight: "50px" }}
                theme="#F5F5FC"
            />

<Box
    sx={{
        flexGrow: 1,
        height: "100vh", // Full height of the viewport
        overflow: "hidden", // Disable scrolling
    }}
>
                <Grid container sx={{ height: "100%" }}>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            backgroundImage: `url('/blue-sign-in.jpg')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "100%",
                            color: "white",
                            textAlign: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                padding: "20px",
                                background: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent overlay
                            }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                                𝐒𝐭𝐚𝐲 𝐎𝐫𝐠𝐚𝐧𝐢𝐳𝐞𝐝, 𝐒𝐭𝐚𝐲 𝐏𝐫𝐨𝐝𝐮𝐜𝐭𝐢𝐯𝐞
                            </Typography>
                            <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                                𝐌𝐚𝐧𝐚𝐠𝐞 𝐲𝐨𝐮𝐫 𝐭𝐚𝐬𝐤𝐬 𝐚𝐧𝐝 𝐬𝐢𝐦𝐩𝐥𝐢𝐟𝐲 𝐲𝐨𝐮𝐫 𝐥𝐢𝐟𝐞
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right Grid */}
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "0 50px",
                                backgroundColor: "#fff",
                            }}
                            className="invisible-scrollbar"
                        >
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ fontWeight: "bold", mb: 2 }}
                            >
                                𝐓𝐨𝐝𝐨 𝐋𝐢𝐬𝐭 𝐀𝐩𝐩 </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ fontWeight: "bold", mb: 1 }}
                            >
                                𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐛𝐚𝐜𝐤!
                            </Typography>
                            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                                𝐏𝐥𝐞𝐚𝐬𝐞 𝐟𝐢𝐥𝐥 𝐲𝐨𝐮𝐫 𝐥𝐨𝐠𝐢𝐧 𝐝𝐞𝐭𝐚𝐢𝐥𝐬 𝐢𝐧 𝐭𝐡𝐞 𝐛𝐞𝐥𝐨𝐰 𝐟𝐢𝐞𝐥𝐝𝐬
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <Box>
                                    <Typography>Full Name</Typography>

                                    <TextField
                                        label="Full Name"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <Typography>Email Address</Typography>
                                    <TextField
                                        label="Email Address"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!formErrors.email}
                                        helperText={formErrors.email}
                                    />
                                    <span>Password</span>
                                    <TextField
                                        label="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!formErrors.password}
                                        helperText={formErrors.password}
                                    />

                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mt: 1,
                                            mb: 2,
                                        }}
                                    >
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label="Remember Me"
                                        />
                                    </Box>

                                    {error && (
                                        <Typography color="error" sx={{ mb: 2 }}>
                                            {error}
                                        </Typography>
                                    )}

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ textTransform: "none", mb: 2 }}
                                        disabled={loading || !isFormValid()}
                                    >
                                        {loading ? "Signing Up..." : "Sign Up"}
                                    </Button>
                                    <Typography>
                                        Already registered? <Link to="/"
                                            style={{ textDecoration: "none" }}
                                            tabIndex={0}>Sign In</Link>
                                    </Typography>
                                </Box>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default SignUp;