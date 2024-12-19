import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { config } from "../config/config";
import "./../styles/AddBookForm.css";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(config.apiBaseUrl + "/api/books", { title, author, userId })
      .then(() => {
        setTitle("");
        setAuthor("");
        navigate("/booklist");
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  const handleCloseButton = () => {
    navigate("/booklist");
  };

  return (
    <Box className="add-book-container">
      <Card className="add-book-card">
        <CardContent>
          <Typography variant="h4" className="add-book-title">
            Add a New Book
          </Typography>
          <form onSubmit={handleSubmit} className="add-book-form">
            <TextField
              label="Book Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="add-book-input"
              required
            />
            <TextField
              label="Author Name"
              variant="outlined"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="add-book-input"
              required
            />
            <Box className="add-book-buttons">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseButton}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Book
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddBookForm;
