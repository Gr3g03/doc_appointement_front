import logo from "../../../app/images/logo.png";
import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModal } from "../../store/stores/modal/modal.store";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <header>
      <nav className="navigation-header">
        <ul className="logo-section">
          <li className="logo-section__item">
            <img src={logo} />
            <h1>Medica+</h1>
          </li>
        </ul>
        <ul className="login-section">
          <li className="login-section__button">
            <button
              onClick={() => {
                // setModal("sign-up");
                dispatch(setModal("sign-up"));
              }}
            >
              Sign Up
            </button>
          </li>
          <li className="login-section__button">
            <button
              onClick={() => {
                dispatch(setModal("log-in"));
              }}
            >
              Log in
            </button>
          </li>

          <li className="login-section__info">
            <h3>Hot Line +38344255255</h3>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
