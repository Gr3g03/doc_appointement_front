import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootState";
import "./style.css";
import AppointementModal from "./appointment/Appointment"
import NotificationModal from "./notificaions/notificaions"
import EditAppointement from "./edit/editAppointement"



function Modals({ selectedDate, eventClick, setSelectedDoc, docEventClick }: any) {
  const modal = useSelector((state: RootState) => state.modal);

  switch (modal) {
    case "appoinment":
      return <AppointementModal selectedDate={selectedDate} />;
    case "notification":
      return <NotificationModal />;
    case "edit":
      return <EditAppointement selectedDate={selectedDate} eventClick={eventClick} setSelectedDoc={setSelectedDoc} docEventClick={docEventClick} />;
    default:
      return null
  }
}
export default Modals;
