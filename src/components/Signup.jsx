// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./../styles/Auth.css";
// import { config } from "../config/config";

// function Register() {
//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(config.apiBaseUrl +"/api/user/register", {
//         username,
//         email,
//         password,
//       });
//       navigate("/login");
//     } catch (error) {
//       console.error(error.response.data);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Register</button>
//         </form>
//         <p>
//           Already have an account?
//           <Link to="/login"> Login here</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Card, Box } from "@mui/material";
import { config } from "../config/config";
import "./../styles/Auth.css";

function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(config.apiBaseUrl + "/api/user/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <Box className="auth-container">
      <Card className="auth-box">
        <Typography variant="h4" className="auth-title">
          Register
        </Typography>
        <form onSubmit={handleSubmit} className="auth-form">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="auth-input"
          />
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
            Register
          </Button>
        </form>
        <Typography variant="body2" className="auth-text">
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Card>
    </Box>
  );
}

export default Register;
