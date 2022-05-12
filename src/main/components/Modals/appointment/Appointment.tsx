import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invalidateModal } from "../../../store/stores/modal/modal.store";
import IEvent from "../../../interfaces/IEvent";
import useGetUser from "../../../hooks/useGetUser";
import { setDoc } from "../../../store/stores/singleDoc/store.singleDoc";
import { RootState } from "../../../store/redux/rootState";
import axios from "axios";
import { setUser } from "../../../store/stores/user/user.store";


function AppointementModal({ selectedDate }: any) {

    const [error, setError] = useState("");
    const [test, setTest] = useState<IEvent | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useGetUser()

    const getDoctor = useSelector((_state: RootState) => _state.doc)




    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const data = {
            startDate: e.target.startDate.value,
            endDate: e.target.endDate.value,
            title: e.target.title.value,
            description: e.target.description.value,
            status: 'pending',
            user_id: user?.id,
            doctor_id: getDoctor?.id,
        }
        const newData = await (await axios.post(`appointements`, data)).data;
        console.log(newData)
        dispatch(setUser(newData))

    }
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
                        onSubmit={handleSubmit}
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
