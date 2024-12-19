import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Card, Box, CircularProgress } from "@mui/material";
import { loginUser } from "../redux/auth/authActions";
import "./../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(loginUser({ email, password }, navigate));
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            disabled={loading}
          />
          <Box className="auth-loader-box">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </form>
        <Typography variant="body2" className="auth-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default Login;
