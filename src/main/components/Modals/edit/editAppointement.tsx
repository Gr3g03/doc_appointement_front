import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { invalidateModal, setModal } from "../../../store/stores/modal/modal.store";
import axios from "axios";
import { setUser } from "../../../store/stores/user/user.store";
import { setEvent } from "../../../store/stores/event/event.store";


function EditAppointement({ selectedDate, eventClick, setSelectedDoc }: any) {

    const dispatch = useDispatch();

    const changeDate = (date: string) => {
        return date.substring(0, date.length - 6);
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const eventId = eventClick.event._def.publicId;

        const date = e.target.date.value;
        const startTime = e.target.startTime.value;
        const endTime = e.target.endTime.value;

        const title = e.target.title.value;
        const description = e.target.description.value;
        const start = `${date}T${startTime}`;
        const end = `${date}T${endTime}`;
        console.log(startTime, endTime);
        const response = await axios.put(`editappointements/${eventId}`, { start, end, title, description });
        if (!response.data.error) {
            dispatch(setUser(response.data.updatedUser));
            dispatch(setEvent(response.data.updatedEvent))
            setModal("");
        } else {
            alert(response.data.error);
        }
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
                            DATE:
                            <input
                                type="date"
                                className="normal-input"
                                name="date"
                                required
                            />
                        </label>
                        <label>
                            Start Time
                            <input
                                type="time"
                                className="normal-input"
                                name="startTime"
                                min={"08:00:00"}
                                max={"16:00:00"}
                                required
                            />
                        </label>
                        <label>
                            End Time
                            <input
                                type="time"
                                className="normal-input"
                                name="endTime"
                                min={"08:00:00"}
                                max={"16:00:00"}
                                required
                            />
                        </label>
                        <button type="submit">book</button>
                    </form>
                </main>
            </div>
        </div>
    );
}
export default EditAppointement;