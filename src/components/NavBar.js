// import React, { useState } from "react";
// import { logoutUser } from "../redux/actions/userActions";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import Badge from "@mui/material/Badge";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PersonIcon from "@mui/icons-material/Person";
// import MenuIcon from "@mui/icons-material/Menu";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
//   const isAdmin = useSelector((state) => state.user.isAdmin);
//   const cartItems = useSelector((state) => state.cart.items);

//   const handleLogout = () => {
//     dispatch(logoutUser());
    
//     localStorage.removeItem("token");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userId");
    
//     navigate("/login");
//   };
  

//   const loadCart = () => {
//     navigate("/cart");
//   };

//   const itemCount = cartItems.reduce(
//     (total, item) => total + (item.quantity || 1),
//     0
//   );

//   const isActive = (path) => (location.pathname === path ? "active" : "");

//   const activeStyle = {
//     backgroundColor: "#B19CD9",
//     color: "#fff",
//   };

//   return (
//     <div>
//       <nav
//         className="navbar navbar-expand-lg navbar-dark"
//         style={{
//           backgroundColor: "#a109f8",
//           boxShadow: "0px 10px 20px black",
//           position: "fixed",
//           top: "0",
//           zIndex: "10",
//           width: "100%",
//         }}
//       >
//         <div className="container-fluid">
//           <Link className="navbar-brand fs-1 fst-italic" to="/">
//             YumFood
//           </Link>

//           {!isAdmin && (
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//           )}

//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             {!isAdmin && (
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <Link
//                     className={`nav-link fs-5 mx-3 ${isActive("/")}`}
//                     aria-current="page"
//                     to="/"
//                     style={location.pathname === "/" ? activeStyle : {}}
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 {isLoggedIn && (
//                   <li className="nav-item">
//                     <Link
//                       className={`nav-link fs-5 mx-3 ${isActive("/myorder")}`}
//                       to="/myorder"
//                       style={location.pathname === "/myorder" ? activeStyle : {}}
//                     >
//                       My Orders
//                     </Link>
//                   </li>
//                 )}
//               </ul>
//             )}
//             {!isLoggedIn ? (
//               !isAdmin && (
//                 <form className="d-flex">
//                   <Link className="btn bg-white text-success mx-1" to="/login">
//                     Login
//                   </Link>
//                   <Link className="btn bg-white text-success mx-1" to="/signup">
//                     Signup
//                   </Link>
//                 </form>
//               )
//             ) : isAdmin ? (
//               <div className="d-flex ms-auto align-items-center">
//                    <DropdownButton align="end" title={<MenuIcon style={{ color: "white" }} />} variant="white">
//                   <Dropdown.Item color="white" as={Link} to="/admin/profile">
//                     <PersonIcon /> Profile
//                   </Dropdown.Item>
//                   <Dropdown.Item onClick={handleLogout}>
//                     <ExitToAppIcon /> Logout
//                   </Dropdown.Item>
//                 </DropdownButton>
//               </div>
//             ) : (
//               <div className="d-flex ms-auto align-items-center">
//                 <div className="btn text-success mx-2" onClick={loadCart}>
//                   <Badge color="secondary" badgeContent={itemCount}>
//                     <ShoppingCartIcon style={{ color: "white" }} />
//                   </Badge>
//                 </div>

//                 {/* Dropdown Menu for User */}
//                 <DropdownButton align="end" title={<MenuIcon style={{ color: "white" }} />} variant="white">
//                   <Dropdown.Item color="white" as={Link} to="/profile">
//                     <PersonIcon /> Profile
//                   </Dropdown.Item>
//                   <Dropdown.Item onClick={handleLogout}>
//                     <ExitToAppIcon /> Logout
//                   </Dropdown.Item>
//                 </DropdownButton>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { logoutUser } from "../redux/actions/userActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { fetchNotifications } from "../redux/actions/notificationsActions";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const cartItems = useSelector((state) => state.cart.items);
  const unreadNotifications = useSelector(
    (state) => state.notifications?.unreadCount || 0
  );
  
  const handleLogout = () => {
    dispatch(logoutUser());

    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");

    navigate("/login");
  };

  const loadCart = () => {
    navigate("/cart");
  };

  const loadNotifications = () => {
    navigate("/notifications");
  };

  const itemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const activeStyle = {
    backgroundColor: "#B19CD9",
    color: "#fff",
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(fetchNotifications(userId)); // Fetch notifications
    }
  }, [dispatch]);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          backgroundColor: "#a109f8",
          boxShadow: "0px 10px 20px black",
          position: "fixed",
          top: "0",
          zIndex: "10",
          width: "100%",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            YumFood
          </Link>

          {!isAdmin && (
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          )}

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!isAdmin && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link fs-5 mx-3 ${isActive("/")}`}
                    aria-current="page"
                    to="/"
                    style={location.pathname === "/" ? activeStyle : {}}
                  >
                    Home
                  </Link>
                </li>
                {isLoggedIn && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link fs-5 mx-3 ${isActive("/myorder")}`}
                      to="/myorder"
                      style={
                        location.pathname === "/myorder" ? activeStyle : {}
                      }
                    >
                      My Orders
                    </Link>
                  </li>
                )}
              </ul>
            )}
            {!isLoggedIn ? (
              !isAdmin && (
                <form className="d-flex">
                  <Link className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>
                  <Link className="btn bg-white text-success mx-1" to="/signup">
                    Signup
                  </Link>
                </form>
              )
            ) : isAdmin ? (
              <div className="d-flex ms-auto align-items-center">
                <DropdownButton
                  align="end"
                  title={<MenuIcon style={{ color: "white" }} />}
                  variant="white"
                >
                  <Dropdown.Item color="white" as={Link} to="/admin/profile">
                    <PersonIcon /> Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    <ExitToAppIcon /> Logout
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            ) : (
              <div className="d-flex ms-auto align-items-center">
                <div className="btn text-success mx-2" onClick={loadCart}>
                  <Badge color="secondary" badgeContent={itemCount}>
                    <ShoppingCartIcon style={{ color: "white" }} />
                  </Badge>
                </div>
                <div
                  className="btn text-success mx-2"
                  onClick={loadNotifications}
                >
                  <Badge color="secondary" badgeContent={unreadNotifications}>
                    <NotificationsIcon style={{ color: "white" }} />
                  </Badge>
                </div>

                {/* Dropdown Menu for User */}
                <DropdownButton
                  align="end"
                  title={<MenuIcon style={{ color: "white" }} />}
                  variant="white"
                >
                  <Dropdown.Item color="white" as={Link} to="/profile">
                    <PersonIcon /> Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    <ExitToAppIcon /> Logout
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}