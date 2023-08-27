import React from "react";
import "./Navbar.sass";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const guestLinks = () => {
  //   <Fragment
  // };

  // const authLinks = () => {};
  //
  // const logoutHandler = () => {
  //   logout();
  // };

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
              <path d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714" />
            </svg>

            <span className="link-text">Главное</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to={"/search"} className="nav-link">
            <svg
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.51097 11.8174C2.43817 7.02965 6.21905 3.09005 10.9558 3.01802C13.2305 2.98343 15.4259 3.86359 17.059 5.46487C18.6922 7.06615 19.6293 9.25739 19.6643 11.5565C19.7371 16.3442 15.9562 20.2838 11.2194 20.3559C6.48269 20.4279 2.58377 16.6051 2.51097 11.8174ZM19.6286 18.5422L22.2143 20.5653L22.2586 20.5646C22.7833 21.0791 22.7962 21.926 22.2874 22.4562C21.7785 22.9864 20.9407 22.9991 20.416 22.4846L18.2592 20.0874C18.0558 19.8886 17.939 19.6161 17.9346 19.3302C17.9303 19.0442 18.0387 18.7683 18.2361 18.5634C18.6167 18.1737 19.2362 18.1643 19.6286 18.5422Z"
                fill="white"
              />
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
                    d="M19.0714 19.0699C16.0152 22.1263 11.4898 22.7867 7.78642 21.074C7.23971 20.8539 6.79148 20.676 6.36537 20.676C5.17849 20.683 3.70117 21.8339 2.93336 21.067C2.16555 20.2991 3.31726 18.8206 3.31726 17.6266C3.31726 17.2004 3.14642 16.7602 2.92632 16.2124C1.21283 12.5096 1.87411 7.98269 4.93026 4.92721C8.8316 1.02443 15.17 1.02443 19.0714 4.9262C22.9797 8.83501 22.9727 15.1681 19.0714 19.0699Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.9393 12.4131H15.9483"
                    stroke="#130F26"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9304 12.4131H11.9394"
                    stroke="#130F26"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
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

        {/*<li className="nav-item">*/}
        {/*  <Link to={"/notifications"} className="nav-link">*/}
        {/*    <svg*/}
        {/*      width="25"*/}
        {/*      height="24"*/}
        {/*      viewBox="0 0 25 24"*/}
        {/*      fill="none"*/}
        {/*      xmlns="http://www.w3.org/2000/svg"*/}
        {/*    >*/}
        {/*      <path*/}
        {/*        fillRule="evenodd"*/}
        {/*        clipRule="evenodd"*/}
        {/*        d="M19.8774 13.9622C19.0304 12.0992 19.0524 11.3982 19.0914 10.1242C19.1014 9.82317 19.1114 9.49617 19.1114 9.12117C19.1114 6.14417 16.9824 1.95117 12.2504 1.95117C7.51836 1.95117 5.38936 6.14417 5.38936 9.12117C5.38936 9.49517 5.39936 9.82317 5.40936 10.1242C5.44836 11.3982 5.46936 12.0992 4.61336 13.9872C4.24736 14.9312 4.29136 15.7462 4.74636 16.4102C5.83836 18.0082 8.99836 18.2282 12.2504 18.2282C15.5024 18.2282 18.6624 18.0082 19.7544 16.4102C20.2104 15.7462 20.2544 14.9312 19.8774 13.9622Z"*/}
        {/*        fill="white"*/}
        {/*      />*/}
        {/*      <path*/}
        {/*        fillRule="evenodd"*/}
        {/*        clipRule="evenodd"*/}
        {/*        d="M14.9477 19.2405C13.3167 19.4215 11.5487 19.4205 9.53865 19.2385C9.23765 19.2145 8.93965 19.3735 8.80165 19.6485C8.66265 19.9245 8.70666 20.2555 8.91165 20.4855C9.81166 21.4925 10.9957 22.0485 12.2457 22.0485H12.2477C13.5007 22.0485 14.6877 21.4935 15.5897 20.4855C15.7967 20.2545 15.8397 19.9185 15.6977 19.6415C15.5547 19.3665 15.2607 19.2125 14.9477 19.2405Z"*/}
        {/*        fill="white"*/}
        {/*      />*/}
        {/*    </svg>*/}

        {/*    <span className="link-text">Уведомления</span>*/}
        {/*  </Link>*/}
        {/*</li>*/}

        <li className="nav-item">
          <Link to={"/profile"} className="nav-link">
            <svg
              width="26"
              height="25"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.377 7.97699C18.4217 10.9137 16.1029 13.3042 13.1641 13.3489C10.2264 13.3936 7.83495 11.0747 7.7903 8.13797C7.74564 5.20128 10.0655 2.81171 13.0032 2.76704C15.942 2.72235 18.3324 5.0403 18.377 7.97699ZM13.3073 22.7647C8.97019 22.8307 5.29752 22.1814 5.25616 19.4617C5.21479 16.741 8.88941 16.005 13.2035 15.9394C17.5417 15.8735 21.2133 16.5227 21.2547 19.2425C21.296 21.9632 17.6214 22.6991 13.3073 22.7647Z"
                fill="white"
              />
            </svg>

            <span className="link-text">Профиль</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps, { logout })(Navbar);
export default Navbar;
