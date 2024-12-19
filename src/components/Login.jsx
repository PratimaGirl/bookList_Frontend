import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Card, Box } from "@mui/material";
import { loginUser } from "../redux/auth/authActions";
import "./../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }, navigate));
  };

  return (
    <Box className="auth-container">
      <Card className="auth-box">
        <Typography variant="h4" className="auth-title">
          Login
        </Typography>
        <form onSubmit={handleSubmit} className="auth-form">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Login
          </Button>
        </form>
        <Typography variant="body2" className="auth-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default Login;
