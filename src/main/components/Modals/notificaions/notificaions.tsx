import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { invalidateModal } from "../../../store/stores/modal/modal.store";
import useGetUser from "../../../hooks/useGetUser";
import { setDoc } from "../../../store/stores/singleDoc/store.singleDoc";
import { RootState } from "../../../store/redux/rootState";
import axios from "axios";
import { setUser } from "../../../store/stores/user/user.store";


function NotificationModal() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const user = useGetUser()


    const getOnlyPending = user.acceptedAppointemets.filter((event) => event.status.includes('pending'))



    console.log(getOnlyPending);

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


                    <table className="table__" >
                        <tbody>
                            <tr className="tr__">
                                <th className="th__">Day</th>
                                <th className="th__">Description</th>
                                <th className="th__">Status</th>
                            </tr>
                            {getOnlyPending.map((data) =>
                                //@ts-ignore
                                <tr className="tr__" key={data.id}>
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
