import { NavLink } from "react-router-dom";
import { ReactComponent as LOGO } from "../images/nnneon.svg";
const Header = () => {
  return (
    <div className="wrapperDiv">
      <div className="header">
        <div className="logo">
          <NavLink to="/"
          ><LOGO/>
          </NavLink>

        </div>
        <nav className="links">
          <NavLink
            to="/"
          >Home
          </NavLink>

          <NavLink
            to="/About"
          >About
          </NavLink>

          <NavLink
            to="/Projects"
          >Projects
          </NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Header