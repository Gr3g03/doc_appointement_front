import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { invalidateModal } from "../../../store/stores/modal/modal.store";
import useGetUser from "../../../hooks/useGetUser";



function NotificationModal() {
    const dispatch = useDispatch();
    const user = useGetUser()


    const getOnlyPending = user.acceptedAppointemets.filter((event) => event.status.includes('pending'))

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
                </header>
                <main className="modal-body">


                    <table className="table__notification" >
                        <tbody>
                            <tr className="tr__">
                                <th className="th__">Day</th>
                                <th className="th__">Description</th>
                                <th className="th__">Status</th>
                            </tr>
                            {getOnlyPending.map((data, index) =>
                                <tr className="tr__" key={index}>
                                    <td className="th__" >{data.start}</td>
                                    <td className="th__">{data.description}</td>
                                    <td className="th__" >{data.status} </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
}
export default NotificationModal;
