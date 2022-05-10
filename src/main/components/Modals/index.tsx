import { useSelector } from "react-redux";
import { RootState } from "../../store/redux/rootState";
import "./style.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Modals() {
  const modal = useSelector((state: RootState) => state.modal);

  switch (modal) {
    case "log-in":
      return <SignIn />;
    case "sign-up":
      return <SignUp />;
    default:
      return null;
  }
}
export default Modals;
