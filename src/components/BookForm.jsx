// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./../styles/AddBookForm.css";

// const AddBookForm = () => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Post the book to the API
//     axios
//       .post("http://localhost:5000/api/books", { title, author })
//       .then(() => {
//         setTitle("");
//         setAuthor("");
//         navigate("/dashboard"); // Navigate back to dashboard
//       })
//       .catch((error) => console.error("Error adding book:", error));
//   };

//   return (
//     <div className="add-book-container">
//       <h2>Add a New Book</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Book Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Author Name"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//           required
//         />
//         <button type="submit">Add Book</button>
//       </form>
//     </div>
//   );
// };

// export default AddBookForm;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../styles/AddBookForm.css";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Post the book to the API
    axios
      .post("http://localhost:5000/api/books", { title, author, userId }) // Include userId
      .then(() => {
        setTitle("");
        setAuthor("");
        navigate("/dashboard");
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
