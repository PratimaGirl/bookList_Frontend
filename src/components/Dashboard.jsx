// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../redux/auth/authActions";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./../styles/Dashboard.css";

// const Dashboard = () => {
//   const [books, setBooks] = useState([]);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch books from the API
//     axios
//       .get("http://localhost:5000/api/books")
//       .then((response) => setBooks(response.data))
//       .catch((error) => console.error("Error fetching books:", error));
//   }, []);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/login");
//   };

//   return (
//     <div className="dashboard-container">
//       <nav className="dashboard-nav">
//         <h1>Dashboard</h1>
//         <button onClick={handleLogout}>Logout</button>
//       </nav>
//       <main className="dashboard-main">
//         <h2>Your Book Collection</h2>
//         <button
//           className="add-book-button"
//           onClick={() => navigate("/add-book")}
//         >
//           Add Book
//         </button>

//         <div className="dashboard-books">
//           {books.length === 0 ? (
//             <p>No books found. Add some books to see them here!</p>
//           ) : (
//             <table className="books-table">
//               <thead>
//                 <tr>
//                   <th>Sr. No.</th>
//                   <th>Title</th>
//                   <th>Author</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {books.map((book, index) => (
//                   <tr key={book._id}>
//                     <td>{index+1}</td>
//                     <td>{book.title}</td>
//                     <td>{book.author}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../redux/auth/authActions";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./../styles/Dashboard.css";

// const Dashboard = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPageCount, setPerPageCount] = useState(5); // Default items per page
//   const perPageItems = [5, 25, 50, 100]; // Options for items per page

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch books from the API
//     axios
//       .get("http://localhost:5000/api/books")
//       .then((response) => {
//         setBooks(response.data);
//         setFilteredBooks(response.data);
//       })
//       .catch((error) => console.error("Error fetching books:", error));
//   }, []);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/login");
//   };

//   // Handle Search
//   useEffect(() => {
//     const result = books.filter(
//       (book) =>
//         book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         book.author.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredBooks(result);
//     setCurrentPage(1); // Reset to the first page when filtering
//   }, [searchQuery, books]);

//   // Handle Sorting
//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });

//     const sortedBooks = [...filteredBooks].sort((a, b) => {
//       if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
//       if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
//       return 0;
//     });
//     setFilteredBooks(sortedBooks);
//   };

//   // Pagination Logic
//   const indexOfLastBook = currentPage * perPageCount;
//   const indexOfFirstBook = indexOfLastBook - perPageCount;
//   const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

//   const totalPages = Math.ceil(filteredBooks.length / perPageCount);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <nav className="dashboard-nav">
//         <h1>Dashboard</h1>
//         <button onClick={handleLogout}>Logout</button>
//       </nav>
//       <main className="dashboard-main">
//         <h2>Your Book Collection</h2>
//         <div className="dashboard-controls">
//           <input
//             type="text"
//             placeholder="Search by title or author"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button
//             className="add-book-button"
//             onClick={() => navigate("/add-book")}
//           >
//             Add Book
//           </button>
//         </div>

//         <div className="dashboard-books">
//           {currentBooks.length === 0 ? (
//             <p>No books found. Add some books to see them here!</p>
//           ) : (
//             <table className="books-table">
//               <thead>
//                 <tr>
//                   <th>Sr. No.</th>
//                   <th onClick={() => handleSort("title")}>
//                     Title {sortConfig.key === "title" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
//                   </th>
//                   <th onClick={() => handleSort("author")}>
//                     Author {sortConfig.key === "author" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentBooks.map((book, index) => (
//                   <tr key={book._id}>
//                     <td>{indexOfFirstBook + index + 1}</td>
//                     <td>{book.title}</td>
//                     <td>{book.author}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Pagination */}
//         <div className="pagination-controls">
//           <div className="items-per-page">
//             <span>Items per page:</span>
//             <ul className="per-page-list">
//               {perPageItems.map((item) => (
//                 <li
//                   key={`per-page-${item}`}
//                   className={`per-page-item ${
//                     item === perPageCount ? "active" : ""
//                   }`}
//                   onClick={() => {
//                     setPerPageCount(item);
//                     setCurrentPage(1); // Reset to the first page
//                   }}
//                 >
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="pagination">
//             <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//               Previous
//             </button>
//             <span>
//               Page <input
//                 type="number"
//                 value={currentPage}
//                 min={1}
//                 max={totalPages}
//                 onChange={(e) => handlePageChange(Number(e.target.value))}
//               />{" "}
//               of {totalPages}
//             </span>
//             <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//               Next
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



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
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";
  import "./../styles/Dashboard.css";

  const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
    const [currentPage, setCurrentPage] = useState(0); // Zero-based index for MUI pagination
    const [perPageCount, setPerPageCount] = useState(5);
    const [openModal, setOpenModal] = useState(false); // State for modal
    const [newBook, setNewBook] = useState({ title: "", author: "" });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
      // Fetch books from the API
      axios
        .get(`http://localhost:5000/api/books/${userId}`)
        .then((response) => {
          setBooks(response.data);
          setFilteredBooks(response.data);
        })
        .catch((error) => console.error("Error fetching books:", error));
    }, []);

    const handleLogout = () => {
      dispatch(logoutUser());
      navigate("/login");
    };

    // Handle Search
    useEffect(() => {
      const result = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(result);
      setCurrentPage(0); // Reset to the first page when filtering
    }, [searchQuery, books]);

    // Handle Sorting
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

    // Pagination Logic
    const handlePageChange = (event, newPage) => {
      setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
      setPerPageCount(parseInt(event.target.value, 10));
      setCurrentPage(0); // Reset to the first page
    };

    const currentBooks = filteredBooks.slice(
      currentPage * perPageCount,
      currentPage * perPageCount + perPageCount
    );

  
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewBook({ title: "", author: "" });
  };

  const handleAddBook = () => {
    axios
      .post("http://localhost:5000/api/books", { ...newBook, userId })
      .then((response) => {
        setBooks([...books, response.data]);
        setFilteredBooks([...books, response.data]);
        handleCloseModal();
      })
      .catch((error) => console.error("Error adding book:", error));
  };

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
              onClick={handleOpenModal}
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
                    Title {sortConfig.key === "title" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableCell>
                  <TableCell onClick={() => handleSort("author")}>
                    Author {sortConfig.key === "author" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentBooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3}>No books found. Add some books to see them here!</TableCell>
                  </TableRow>
                ) : (
                  currentBooks.map((book, index) => (
                    <TableRow key={book._id} className="table-row">
                      <TableCell>{currentPage * perPageCount + index + 1}</TableCell>
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

        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Add a New Book</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="dense"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            margin="dense"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddBook} color="primary" variant="contained">
            Add Book
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  };

  export default Dashboard;

//   import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TextField,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../redux/auth/authActions";

// const Dashboard = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
//   const [currentPage, setCurrentPage] = useState(0); // Zero-based index for MUI pagination
//   const [perPageCount, setPerPageCount] = useState(5);

//   const [openModal, setOpenModal] = useState(false); // State for modal
//   const [newBook, setNewBook] = useState({ title: "", author: "" }); // State for new book form

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/books/${userId}`)
//       .then((response) => {
//         setBooks(response.data);
//         setFilteredBooks(response.data);
//       })
//       .catch((error) => console.error("Error fetching books:", error));
//   }, [userId]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/login");
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     const result = books.filter(
//       (book) =>
//         book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
//         book.author.toLowerCase().includes(e.target.value.toLowerCase())
//     );
//     setFilteredBooks(result);
//     setCurrentPage(0);
//   };

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });

//     const sortedBooks = [...filteredBooks].sort((a, b) => {
//       if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
//       if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
//       return 0;
//     });
//     setFilteredBooks(sortedBooks);
//   };

//   const handlePageChange = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setPerPageCount(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setNewBook({ title: "", author: "" });
//   };

//   const handleAddBook = () => {
//     axios
//       .post("http://localhost:5000/api/books", { ...newBook, userId })
//       .then((response) => {
//         setBooks([...books, response.data]);
//         setFilteredBooks([...books, response.data]);
//         handleCloseModal();
//       })
//       .catch((error) => console.error("Error adding book:", error));
//   };

//   const currentBooks = filteredBooks.slice(
//     currentPage * perPageCount,
//     currentPage * perPageCount + perPageCount
//   );

//   return (
//     <div className="dashboard-container">
//       <nav className="dashboard-nav">
//         <h1>BOOKIFY</h1>
//         <Button variant="contained" color="primary" onClick={handleLogout}>
//           Logout
//         </Button>
//       </nav>
//       <main className="dashboard-main">
//         <h2>Your Book Collection</h2>
//         <div className="dashboard-controls">
//           <TextField
//             className="search-box"
//             label="Search by title or author"
//             variant="outlined"
//             size="small"
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//           <Button variant="contained" color="secondary" onClick={handleOpenModal}>
//             Add Book
//           </Button>
//         </div>

//         <TableContainer>
//           <Table>
//             <TableHead className="table-header">
//               <TableRow>
//                 <TableCell>Sr. No.</TableCell>
//                 <TableCell onClick={() => handleSort("title")}>
//                   Title {sortConfig.key === "title" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
//                 </TableCell>
//                 <TableCell onClick={() => handleSort("author")}>
//                   Author {sortConfig.key === "author" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentBooks.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={3}>No books found. Add some books to see them here!</TableCell>
//                 </TableRow>
//               ) : (
//                 currentBooks.map((book, index) => (
//                   <TableRow key={book._id} className="table-row">
//                     <TableCell>{currentPage * perPageCount + index + 1}</TableCell>
//                     <TableCell>{book.title}</TableCell>
//                     <TableCell>{book.author}</TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25, 50, 100]}
//           component="div"
//           count={filteredBooks.length}
//           rowsPerPage={perPageCount}
//           page={currentPage}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </main>

//       {/* Modal for Adding Book */}
//       <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
//         <DialogTitle>Add a New Book</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Title"
//             variant="outlined"
//             fullWidth
//             margin="dense"
//             value={newBook.title}
//             onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
//           />
//           <TextField
//             label="Author"
//             variant="outlined"
//             fullWidth
//             margin="dense"
//             value={newBook.author}
//             onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseModal} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddBook} color="primary" variant="contained">
//             Add Book
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Dashboard;
