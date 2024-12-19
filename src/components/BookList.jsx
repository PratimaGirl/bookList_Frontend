import React, { useEffect, useContext } from "react";
import { BookContext } from "../context/BookContext";
import axios from "axios";
import { Box, List, ListItem, Typography } from "@mui/material";

const BookList = () => {
  const { books, setBooks } = useContext(BookContext);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [setBooks]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Book List
      </Typography>
      <List>
        {books.map((book) => (
          <ListItem key={book._id}>
            {book.title} by {book.author}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BookList;
