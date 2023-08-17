import React, { Fragment } from "react";
import "./Navbar.sass";
import { connect } from "react-redux";
import { logout } from "../../actions/auth.js";
import { Link } from "react-router-dom";

const Navbar = ({ logout, isAuthenticated }) => {
  // const guestLinks = () => {
  //   <Fragment
  // };

  const authLinks = () => {};

  const logoutHandler = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <a href="#" className="nav-link">
            <span className="link-text logo-text">QosylMe</span>
          </a>
        </li>
        <li className="nav-item">
          <Link to={"/home"} className="nav-link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
                stroke="#130F26"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="link-text">Главное</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/search"} className="nav-link">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
<path stroke="#130F26" fillRule="evenodd" clipRule="evenodd" d="M11.5136 2.20215C6.51764 2.20215 2.45264 6.26715 2.45264 11.2641C2.45264 16.2601 6.51764 20.3241 11.5136 20.3241C16.5096 20.3241 20.5746 16.2601 20.5746 11.2641C20.5746 6.26715 16.5096 2.20215 11.5136 2.20215Z" fill="white"/>
<path stroke="#130F26" fillRule="evenodd" clipRule="evenodd" d="M20.1371 17.9765C19.0831 17.9765 18.2251 18.8325 18.2251 19.8865C18.2251 20.9405 19.0831 21.7975 20.1371 21.7975C21.1901 21.7975 22.0471 20.9405 22.0471 19.8865C22.0471 18.8325 21.1901 17.9765 20.1371 17.9765Z" fill="white"/>
</svg>


            <span className="link-text">Поиск</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/posts"} className="nav-link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Iconly/Light/Chat">
                <g id="Chat">
                  <path
                    id="Stroke 4"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.0714 19.0699C16.0152 22.1263 11.4898 22.7867 7.78642 21.074C7.23971 20.8539 6.79148 20.676 6.36537 20.676C5.17849 20.683 3.70117 21.8339 2.93336 21.067C2.16555 20.2991 3.31726 18.8206 3.31726 17.6266C3.31726 17.2004 3.14642 16.7602 2.92632 16.2124C1.21283 12.5096 1.87411 7.98269 4.93026 4.92721C8.8316 1.02443 15.17 1.02443 19.0714 4.9262C22.9797 8.83501 22.9727 15.1681 19.0714 19.0699Z"
                    stroke="#130F26"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Stroke 11"
                    d="M15.9393 12.4131H15.9483"
                    stroke="#130F26"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Stroke 13"
                    d="M11.9304 12.4131H11.9394"
                    stroke="#130F26"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Stroke 15"
                    d="M7.9214 12.4131H7.9304"
                    stroke="#130F26"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>

            <span className="link-text">Посты</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/notifications"} className="nav-link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z"
                stroke="#130F26"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3888 20.8574C13.0247 22.3721 10.8967 22.3901 9.51947 20.8574"
                stroke="#130F26"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="link-text">Уведомления</span>
          </Link>
        </li>

        <li className="nav-item" onClick={logout}>
          <Link to={"/profile"} className="nav-link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Iconly/Light/Profile">
                <g id="Profile">
                  <path
                    id="Stroke 1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9848 15.3457C8.11719 15.3457 4.81433 15.9305 4.81433 18.2724C4.81433 20.6143 8.09624 21.22 11.9848 21.22C15.8524 21.22 19.1543 20.6343 19.1543 18.2933C19.1543 15.9524 15.8734 15.3457 11.9848 15.3457Z"
                    stroke="#130F26"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Stroke 3"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9848 12.0059C14.5229 12.0059 16.58 9.94779 16.58 7.40969C16.58 4.8716 14.5229 2.81445 11.9848 2.81445C9.44667 2.81445 7.38858 4.8716 7.38858 7.40969C7.38001 9.93922 9.42382 11.9973 11.9524 12.0059H11.9848Z"
                    stroke="#130F26"
                    strokeWidth="1.42857"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>

            <span className="link-text">Профиль</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
