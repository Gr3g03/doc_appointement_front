import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { invalidateModal } from "../../../store/stores/modal/modal.store";
type Data = {
  fullName: string;
  email: string;
  password: string;
  avatar: string;
};
function SignUp() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const register = (data: Data) => {
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          setError("Email is already taken!");
        } else {
          // setAdmin(data.admin);
          // setModal("success-new-admin");
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        }
      });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const avatar = e.target.avatar.value;
    const data = {
      fullName,
      email,
      password,
      avatar,
    };

    register(data);
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
            sx={{ color: "#50a2fd" }}
            className="close-icon"
            onClick={() => {
              dispatch(invalidateModal());
            }}
          />
          <AdminPanelSettingsIcon
            className="user-icon"
            sx={{ fontSize: 80, color: "#50a2fd" }}
          />
          <h2>NEW ACCOUNT</h2>
        </header>
        <main className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              FULL NAME:
              <input
                type="text"
                className="transition"
                name="fullName"
                required
              />
            </label>
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
                name="password"
                className="transition"
                required
              />
            </label>
            <label>
              AVATAR:
              <input
                type="text"
                name="avatar"
                className="transition"
                required
              />
            </label>
            {error !== "" ? <span className="email-error">{error}</span> : null}
            <button type="submit">SIGN UP</button>
          </form>
        </main>
      </div>
    </div>
  );
}
export default SignUp;
