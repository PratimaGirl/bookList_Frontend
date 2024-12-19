import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/authActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import "./../styles/BookList.css";
import { config } from "../config/config";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageCount, setPerPageCount] = useState(5);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(config.apiBaseUrl + `/api/books/${userId}`)
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, [userId]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  useEffect(() => {
    const result = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(result);
    setCurrentPage(0);
  }, [searchQuery, books]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedBooks = [...filteredBooks].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredBooks(sortedBooks);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setPerPageCount(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(config.apiBaseUrl + `/api/books/${bookId}`)
        .then(() => {
          setBooks(books.filter((book) => book._id !== bookId));
        })
        .catch((error) => console.error("Error deleting book:", error));
    }
  };

  const handleEditClick = (book) => {
    setCurrentBook(book);
    setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
    axios
      .put(config.apiBaseUrl + `/api/books/${currentBook._id}`, {
        title: currentBook.title,
        author: currentBook.author,
      })
      .then((response) => {
        const updatedBooks = books.map((book) =>
          book._id === currentBook._id ? response.data : book
        );
        setBooks(updatedBooks);
        setFilteredBooks(updatedBooks);
        setIsEditModalOpen(false);
      })
      .catch((error) => console.error("Error updating book:", error));
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setCurrentBook(null);
  };

  const currentBooks = filteredBooks.slice(
    currentPage * perPageCount,
    currentPage * perPageCount + perPageCount
  );

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>BOOKIFY</h1>
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </nav>
      <main className="dashboard-main">
        <h2>Your Book Collection</h2>
        <div className="dashboard-controls">
          <TextField
            className="search-box"
            label="Search by title or author"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/add-book")}
          >
            Add Book
          </Button>
        </div>

        <TableContainer>
          <Table>
            <TableHead className="table-header">
              <TableRow>
                <TableCell>Sr. No.</TableCell>
                <TableCell onClick={() => handleSort("title")}>
                  Title{" "}
                  {sortConfig.key === "title"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </TableCell>
                <TableCell onClick={() => handleSort("author")}>
                  Author{" "}
                  {sortConfig.key === "author"
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentBooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    No books found. Add some books to see them here!
                  </TableCell>
                </TableRow>
              ) : (
                currentBooks.map((book, index) => (
                  <TableRow key={book._id} className="table-row">
                    <TableCell>
                      {currentPage * perPageCount + index + 1}
                    </TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(book)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(book._id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={filteredBooks.length}
          rowsPerPage={perPageCount}
          page={currentPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </main>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <Dialog open={isEditModalOpen} onClose={handleEditModalClose}>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="dense"
              value={currentBook.title}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, title: e.target.value })
              }
            />
            <TextField
              label="Author"
              fullWidth
              margin="dense"
              value={currentBook.author}
              onChange={(e) =>
                setCurrentBook({ ...currentBook, author: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditModalClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default BookList;
