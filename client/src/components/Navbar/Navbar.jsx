import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const navTo = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" })
  }
  const handleLogin = () => {
    (navTo("/login"))
  }
  const handleRegistration = () => {
    (navTo("/registration"))
  }
  return (
    <>
      <div className="navbar">
        <div className="nav_container">
          <Link to="/">
            <span className="logo">HoBo</span>
          </Link>
          {user ?
            <button className="custom" onClick={handleLogout}> LOG OUT</button>
            :
            <div className="navItems">
              <button className="custom" onClick={handleRegistration}>Register</button>
              <button className="custom" onClick={handleLogin}>Log In</button>
            </div>}
        </div>
      </div>
    </>
  )
}

export default Navbar
