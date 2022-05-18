import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { invalidateModal } from "../../../store/stores/modal/modal.store";
import axios from "axios";
import { setUser } from "../../../store/stores/user/user.store";


function EditAppointement({ selectedDate, eventClick, setSelectedDoc }: any) {

    const dispatch = useDispatch();

    const changeDate = (date: string) => {
        return date.substring(0, date.length - 6);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const eventId = eventClick.event._def.publicId;

        const data = {

            start: e.target.startDate.value,
            end: e.target.endDate.value,
            title: e.target.title.value,
            description: e.target.description.value,
        }

        const userFromServer = await (await axios.put(`editappointements/${eventId}`, data)).data;
        console.log(userFromServer);

        if (!userFromServer.error) {
            // dispatch(setDoc(userFromServer));
            // dispatch(setUser(userFromServer));
            // setTest(userFromServer)
            dispatch(setUser(userFromServer.updatedUser))
            setSelectedDoc(userFromServer.updatedEvent)
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
                            start Date:
                            <input
                                type="date-time"
                                name="startDate"
                                className="startDate"
                                required
                            // defaultValue={changeDate(selectedDate.startStr)}
                            />
                        </label>
                        <label>
                            end Date:
                            <input
                                type="date-time"
                                name="endDate"
                                className="endDate"
                                // defaultValue={changeDate(selectedDate.endStr)}
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
