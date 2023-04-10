import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/authentication.js";
import "./Navbar.css";
import {
  GridView,
  BookmarkBorder,
  Logout,
  Login,
  SignLanguage,
  Menu,
  Close,
  AccountCircle,
} from "@mui/icons-material";

const Layout = () => {
  const [error, setError] = useState("");

  const auth = useContext(AuthContext);

  const [sidebar, setSidebar] = useState(false);
  const [navbar, setNavbar] = useState("--navbar-close");

  useEffect(() => {
    if (sidebar) {
      setNavbar("--navbar-close");
    } else {
      setNavbar("--navbar-open");
    }
    console.log(navbar);
  }, [sidebar]);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  console.log(auth);

  useEffect(() => {
    if (error) {
      window.alert(error);
    }
  }, [error]);

  const handleLogout = async (event) => {
    event.preventDefault();
    if (auth.loggedIn) {
      auth.logout();
    } else {
      setError("Not logged in ---- button should not work.");
    }
  };
  const email = window.localStorage.getItem("username");

  return (
    <>
      <div className="navbar" style={{ "--navbar": `var(${navbar})` }}>
        <div className="menu-bars">
          <div class="logo">
            <Menu
              style={{ width: "30px", height: "30px", color: "#5ea0d6" }}
              onClick={showSidebar}
              class="expand"
            />
            <svg
              width="49"
              height="62"
              viewBox="0 0 49 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_835_2343)">
                <path
                  d="M24.1707 1.93817H24.1642C11.8892 1.93817 1.93829 11.8891 1.93829 24.1641V37.8356C1.93829 50.1107 11.8892 60.0616 24.1642 60.0616H24.1707C36.4457 60.0616 46.3966 50.1107 46.3966 37.8356V24.1641C46.3966 11.8891 36.4457 1.93817 24.1707 1.93817Z"
                  stroke="#88B4D9"
                  stroke-width="3.87662"
                  stroke-miterlimit="10"
                />
                <path
                  d="M24.1707 1.93817H24.1642C11.8892 1.93817 1.93829 11.8891 1.93829 24.1641V37.8356C1.93829 50.1107 11.8892 60.0616 24.1642 60.0616H24.1707C36.4457 60.0616 46.3966 50.1107 46.3966 37.8356V24.1641C46.3966 11.8891 36.4457 1.93817 24.1707 1.93817Z"
                  stroke="#5598CF"
                  stroke-opacity="0.19"
                  stroke-width="3.87662"
                  stroke-miterlimit="10"
                />
                <path
                  d="M12.0886 26.7358L9.0325 29.0101L11.436 31.8077C11.5071 37.4934 11.5006 42.1647 11.4683 45.8023C11.4683 46.2998 11.4683 46.3838 11.4683 46.5647C11.688 51.7981 16.0556 57.5613 21.6961 59.1314C27.3624 60.7079 32.9512 57.6647 36.7761 55.5972C37.9327 54.9769 39.535 53.9432 41.0663 52.2698C42.1388 51.1003 42.8754 49.9438 43.3793 49.0069C36.5629 36.6276 31.0129 27.4142 28.2928 23.4084C27.5046 22.2518 26.0056 20.0809 23.3437 19.241C21.1534 18.5497 19.2668 18.9632 18.485 19.1893C17.6257 19.493 16.0427 20.1778 14.6084 21.7027C12.7541 23.6603 12.2372 25.8442 12.0756 26.7487L12.0886 26.7358Z"
                  fill="#FFFDF9"
                  fill-opacity="0.34"
                />
                <path
                  d="M12.0886 26.7358L9.0325 29.0101L11.436 31.8077C11.5071 37.4934 11.5006 42.1647 11.4683 45.8023C11.4683 46.2998 11.4683 46.3838 11.4683 46.5647C11.688 51.7981 16.0556 57.5613 21.6961 59.1314C27.3624 60.7079 32.9512 57.6647 36.7761 55.5972C37.9327 54.9769 39.535 53.9432 41.0663 52.2698C42.1388 51.1003 42.8754 49.9438 43.3793 49.0069C36.5629 36.6276 31.0129 27.4142 28.2928 23.4084C27.5046 22.2518 26.0056 20.0809 23.3437 19.241C21.1534 18.5497 19.2668 18.9632 18.485 19.1893C17.6257 19.493 16.0427 20.1778 14.6084 21.7027C12.7541 23.6603 12.2372 25.8442 12.0756 26.7487L12.0886 26.7358Z"
                  stroke="#88B4D9"
                  stroke-width="3.87662"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.0886 26.7358L9.0325 29.0101L11.436 31.8077C11.5071 37.4934 11.5006 42.1647 11.4683 45.8023C11.4683 46.2998 11.4683 46.3838 11.4683 46.5647C11.688 51.7981 16.0556 57.5613 21.6961 59.1314C27.3624 60.7079 32.9512 57.6647 36.7761 55.5972C37.9327 54.9769 39.535 53.9432 41.0663 52.2698C42.1388 51.1003 42.8754 49.9438 43.3793 49.0069C36.5629 36.6276 31.0129 27.4142 28.2928 23.4084C27.5046 22.2518 26.0056 20.0809 23.3437 19.241C21.1534 18.5497 19.2668 18.9632 18.485 19.1893C17.6257 19.493 16.0427 20.1778 14.6084 21.7027C12.7541 23.6603 12.2372 25.8442 12.0756 26.7487L12.0886 26.7358Z"
                  stroke="#5598CF"
                  stroke-opacity="0.19"
                  stroke-width="3.87662"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.4173 30.2388C21.3236 30.2388 22.0584 29.5041 22.0584 28.5977C22.0584 27.6914 21.3236 26.9566 20.4173 26.9566C19.5109 26.9566 18.7762 27.6914 18.7762 28.5977C18.7762 29.5041 19.5109 30.2388 20.4173 30.2388Z"
                  fill="#88B4D9"
                />
              </g>
              <defs>
                <clipPath id="clip0_835_2343">
                  <rect width="48.3349" height="62" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h1 class="brand">Nook</h1>
          </div>
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <a href="#" className="menu-bars">
              <Close />
            </a>
          </li>
          <li className="nav-text">
            <a href="/apts">
              <GridView />
              <span>All Apartments</span>
            </a>
          </li>
          <li className="nav-text">
            <a href="/myapts">
              <BookmarkBorder />
              <span>My Apartments</span>
            </a>
          </li>
          {email ? (
            <div>
              <li className="nav-text">
                <a href="/user">
                  <AccountCircle />
                  <span>User</span>
                </a>
              </li>
              <li className="nav-text">
                <a href="/apts" onClick={handleLogout}>
                  <Logout />
                  <span>Log out</span>
                </a>
              </li>
            </div>
          ) : (
            <div>
              <li className="nav-text">
                <a href="/login">
                  <Login />
                  <span>Log in</span>
                </a>
              </li>
              <li className="nav-text">
                <a href="/signup">
                  <SignLanguage />
                  <span>Sign up</span>
                </a>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Layout;
