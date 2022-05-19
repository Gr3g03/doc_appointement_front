import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import onLogout from "../../../main/store/stores/user/login.store.on-logout"
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./style.css"
import useGetUser from "../../hooks/useGetUser";
import { setModal } from "../../store/stores/modal/modal.store";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Header = () => {

  const user = useGetUser()

  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(onLogout())
  }

  const getOnlyPending = user.acceptedAppointemets.filter((event) => event.status.includes('pending'))


  if (user?.isDoctor) {
    return (
      <header className="header">
        <nav className="nav_left">
          <ul className="headerUl">
            <Link to={`/`}>
              <li className="headerli">
                Home
              </li>
            </Link>
          </ul>

        </nav>
        <nav className="center_nav">
          <ul className="headerUl">
            <li className="headerli">
            </li>
          </ul>

        </nav>
        <nav className="nav_right">
          <ul className="headerUl">

            <Link to={`/doctor-profile`}>
              <li className="headerli">
                <AccountCircleIcon sx={{
                  width: '2rem',
                  marginBottom: "-0.4rem"
                }} />
              </li>
            </Link>
            <li className="headerli">
              <Badge badgeContent={getOnlyPending.length} onClick={() => {
                dispatch(setModal('notification'))
              }
              } color="secondary">
                <NotificationsNoneIcon color="action" />
              </Badge>
            </li>
            <li className="headerli">
              <Button className="primary" color="secondary" variant="outlined" onClick={handleSubmit} sx={{
                color: "white",
                borderColor: 'white'
              }}>Sign Out</Button>
            </li>
          </ul>
        </nav>

      </header>
    )
  }
  else {
    return (
      <header className="header">
        <nav className="nav_left">
          <ul className="headerUl">
            <Link to={`/dashboard-user`}>
              <li className="headerli">
                Home
              </li>
            </Link>

          </ul>

        </nav>
        <nav className="center_nav">
          <ul className="headerUl">
            <li className="headerli">

            </li>
          </ul>

        </nav>
        <nav className="nav_right">
          <ul className="headerUl">

            <Link to={`/user-profile`}>
              <li className="headerli">
                <AccountCircleIcon sx={{
                  width: '2rem',
                  marginBottom: "-0.4rem"
                }} />
              </li>
            </Link>
            <li className="headerli">
              <Button className="primary" color="secondary" variant="outlined" onClick={handleSubmit} sx={{
                color: "white",
                borderColor: 'white'
              }}>Sign Out</Button>
            </li>
          </ul>
        </nav>

      </header>
    )
  }
}

export default Header