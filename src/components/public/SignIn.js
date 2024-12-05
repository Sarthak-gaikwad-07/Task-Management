import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => password.length >= 8;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });

        if (name === "email") {
            setErrors({
                ...errors,
                email: validateEmail(value) ? "" : "Invalid email format",
            });
        }

        if (name === "password") {
            setErrors({
                ...errors,
                password: validatePassword(value)
                    ? ""
                    : "Password must be at least 8 characters",
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            (u) =>
                u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
            const token = "default-token-" + user.email + "12345";

            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.userId);
            toast.success("User logged in successfully!");
            setTimeout(() => {
                navigate("/all", { state: { userId: user.userId } });
            }, 2000);
        } else {
            toast.error("Invalid email or password. Please try again.");
        }
    };

    const isFormValid =
        validateEmail(credentials.email) &&
        validatePassword(credentials.password);

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

            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid
                        item
                        xs={6}
                        sx={{
                            backgroundImage: `url('/blue-sign-in.jpg')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "100vh",
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
                                background: "rgba(0, 0, 0, 0.5)",
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

                    <Grid item xs={6}>
                        <Box
                            sx={{
                                height: "100vh",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "0 50px",
                                backgroundColor: "#fff",
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ fontWeight: "bold", mb: 2 }}
                            >
                                𝐓𝐨𝐝𝐨 𝐋𝐢𝐬𝐭 𝐀𝐩𝐩
                            </Typography>

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
                                    <Typography>Email Address</Typography>

                                    <TextField
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        label="Email Address"
                                        placeholder="Enter email address"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                    <span>Password</span>
                                    <TextField
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        label="Password"
                                        placeholder="Enter password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        error={!!errors.password}
                                        helperText={errors.password}
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
                                        <Button
                                            variant="text"
                                            color="primary"
                                            sx={{ textTransform: "none" }}
                                        >
                                            Forgot Password?
                                        </Button>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        sx={{ textTransform: "none", mb: 2 }}
                                        disabled={!isFormValid}
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                            </form>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <Link
                                    to="../sign-up"
                                    style={{ textDecoration: "none" }}
                                    tabIndex={0}
                                >
                                    Create a new account
                                </Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default SignIn;
