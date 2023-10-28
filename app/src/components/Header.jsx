import { NavLink } from "react-router-dom";
import { ReactComponent as LOGO } from "../images/nnneon.svg";
import { ReactComponent as LOGO_GITHUB } from "../images/github-mark-white.svg";
import { ReactComponent as LOGO_LINKEDIN } from "../images/linkedin.svg";
const Header = () => {
  return ( <>
    <div className="sidebar">
      <nav className="sidebarlinks">
        <a href={"https://github.com/smoluu"} target="_blank" rel="noreferrer"><LOGO_GITHUB /> </a>
        <a href={"https://www.linkedin.com/in/santeri-smolander-186292294/"} target="_blank" rel="noreferrer"><LOGO_LINKEDIN /> </a>
      </nav>
    </div>
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
  </>)
}

export default Header