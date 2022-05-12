import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { invalidateModal } from "../../../store/stores/modal/modal.store";
import IEvent from "../../../interfaces/IEvent";

// type Data = {
//     fullName: string;
//     email: string;
//     password: string;
//     avatar: string;
// };
function AppointementModal() {

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const register = (data: IEvent) => {
    //     fetch("http://localhost:8000/register", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then((resp) => resp.json())
    //         .then((data) => {
    //             if (data.error) {
    //                 setError("Email is already taken!");
    //             } else {
    //                 // setAdmin(data.admin);
    //                 // setModal("success-new-admin");
    //                 localStorage.setItem("token", data.token);
    //                 navigate("/dashboard");
    //             }
    //         });
    // };
    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     const fullName = e.target.fullName.value;
    //     const email = e.target.email.value;
    //     const password = e.target.password.value;
    //     const avatar = e.target.avatar.value;
    //     const data = {
    //         fullName,
    //         email,
    //         password,
    //         avatar,
    //     };

    //     register(data);
    // };

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
                    <h2>Book Now</h2>
                </header>
                <main className="modal-body">
                    <form
                    // onSubmit={handleSubmit}
                    >
                        <label>
                            description
                            <input
                                type="text"
                                className="description"
                                name="description"
                                required
                            />
                        </label>
                        <label>
                            title:
                            <input
                                type="text"
                                name="title"
                                className="title"
                                required
                            />
                        </label>
                        <label>
                            start Date:
                            <input
                                type="datetime-local"
                                name="startDate"
                                className="startDate"
                                required
                            />
                        </label>
                        <label>
                            end Date:
                            <input
                                type="datetime-local"
                                name="endDate"
                                className="endDate"
                                required
                            />
                        </label>
                        {error !== "" ? <span className="email-error">{error}</span> : null}
                        <button type="submit">book</button>
                    </form>
                </main>
            </div>
        </div>
    );
}
export default AppointementModal;
