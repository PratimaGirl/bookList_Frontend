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
} from "@mui/material";
import "./../styles/BookList.css";
import { config } from "../config/config";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [currentPage, setCurrentPage] = useState(0);
  const [perPageCount, setPerPageCount] = useState(5);

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
              </TableRow>
            </TableHead>
            <TableBody>
              {currentBooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3}>
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
    </div>
  );
};

export default BookList;
