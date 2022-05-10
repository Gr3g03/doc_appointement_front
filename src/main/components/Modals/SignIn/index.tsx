import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { invalidateModal } from "../../../store/stores/modal/modal.store";
import ILoginRequest from "../../../interfaces/ILoginRequest";
import onLogin from "../../../store/stores/user/login.store.on-login";

type Data = {
  email: string;
  password: string;
};

function SignIn() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function LogIn(data: ILoginRequest) {
    // fetch(`http://localhost:8000/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     if (data.admin) {
    //       // setAdmin(data.admin);
    //       localStorage.setItem("token", data.token);
    //       navigate("/dashboard");
    //       // setModal("success");
    //     } else {
    //       setError(data.error);
    //     }
    //   });
    try {
      dispatch(onLogin(data));
    } catch (err) {
      alert(err);
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = { email, password };
    LogIn(data);
  };
  return (
    <div
      onClick={() => {
        dispatch(invalidateModal());
      }}
      className="modal-wrapper"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <header className="modal-header">
          <CloseIcon
            fontSize="large"
            className="close-icon"
            sx={{ color: "#50a2fd" }}
            onClick={() => {
              dispatch(invalidateModal());
            }}
          />
          <AccountCircleIcon
            className="user-icon"
            sx={{ fontSize: 80, color: "#50a2fd" }}
          />
          <h2>ACCOUNT LOGIN</h2>
        </header>
        <main className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              EMAIL:
              <input
                type="email"
                name="email"
                className="transition"
                required
              />
            </label>
            <label>
              PASSWORD:
              <input
                type="password"
                className="transition"
                name="password"
                minLength={5}
                required
              />
            </label>
            {error !== "" ? (
              <span className="password-error">{error}</span>
            ) : null}
            <button type="submit">LOG IN</button>
          </form>
        </main>
      </div>
    </div>
  );
}
export default SignIn;
