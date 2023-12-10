import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { themeAction } from "../../store/theme";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  console.log(darkTheme);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    navigate("/login");
  };

  const verifyEmailHandler = async () => {
    if (!token) {
      alert("You are not logged In");
      return;
    }

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCsdHmEyton0hpjeL78i6sCtLW-udHBNGk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }),
      }
    );

    alert(
      "Check your email , you might have recieved a verification link . Click on it to verify."
    );

    const data = await response.json();
    console.log(data);
  };

  const toggleDarkTheme = (e) => {
    e.preventDefault();
    dispatch(themeAction.toggleTheme());
  };

  return (
    <nav className={`navbar navbar-expand-lg`}>
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          Expense Tracker
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/products">
                Products
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/about">
                About Us
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button
        onClick={verifyEmailHandler}
        className="btn btn-primary m-3"
        style={{ width: "12%" }}
      >
        Verify email ID
      </button>
      <button onClick={logoutHandler} className="btn btn-danger m-2">
        Logout
      </button>
      <div onClick={toggleDarkTheme} className="dark_mode">
        {darkTheme ? (
          <button type="button" className="btn btn-light">
            Light Theme
          </button>
        ) : (
          <button className="btn btn-dark">Dark Theme</button>
        )}
      </div>
    </nav>
  );
};

export default Header;
