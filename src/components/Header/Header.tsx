import { useContext } from "react";
import { useAppContext } from "../../context/AppContext";
import Notifications from "../Notifications";

const Header = () => {
  const { setDialogOpen } = useAppContext();

  return <header className="app-header">
    <button className="button" onClick={() => setDialogOpen(true)}>Notify</button>
    <Notifications />
  </header>;
}

export default Header;
