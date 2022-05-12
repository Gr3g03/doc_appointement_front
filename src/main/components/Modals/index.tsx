import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootState";
import "./style.css";
import AppointementModal from "./appointment/Appointment"


function Modals({ selectedDate }: any) {
  const modal = useSelector((state: RootState) => state.modal);

  switch (modal) {
    case "appoinment":
      return <AppointementModal selectedDate={selectedDate} />;
    default:
      return null;
  }
}
export default Modals;
