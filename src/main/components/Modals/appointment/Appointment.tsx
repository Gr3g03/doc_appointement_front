import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invalidateModal } from "../../../store/stores/modal/modal.store";
import useGetUser from "../../../hooks/useGetUser";
import { setDoc } from "../../../store/stores/singleDoc/store.singleDoc";
import { RootState } from "../../../store/redux/rootState";
import axios from "axios";
import { setEvent } from "../../../store/stores/event/event.store";
import { setUser } from "../../../store/stores/user/user.store";


function AppointementModal({ selectedDate }: any) {

    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const user = useGetUser()

    const getDoctor = useSelector((_state: RootState) => _state.doc)

    const changeDate = (date: string) => {
        return date.substring(0, date.length - 6);
    };

    if (selectedDate === undefined || null) return <h1></h1>
    const ssss = selectedDate.startStr
    console.log(ssss);

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const data = {
            start: changeDate(selectedDate.startStr),
            end: changeDate(selectedDate.endStr),
            title: e.target.title.value,
            description: e.target.description.value,
            status: 'pending',
            user_id: user?.id,
            doctor_id: getDoctor?.id,
        }
        const newData = await (await axios.post(`appointements`, data)).data;
        dispatch(setUser(newData))
        dispatch(setDoc(newData))

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
                                type="date-time"
                                name="startDate"
                                className="startDate"
                                required
                                defaultValue={changeDate(selectedDate.startStr)}
                            />
                        </label>
                        <label>
                            end Date:
                            <input
                                type="date-time"
                                name="endDate"
                                className="endDate"
                                defaultValue={changeDate(selectedDate.endStr)}
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
