import { NavLink } from "react-router-dom";
import { useState } from "react"
import { ReactComponent as LOGO } from "../images/nnneon.svg";
import { ReactComponent as LOGO_GITHUB } from "../images/github-mark-white.svg";
import { ReactComponent as LOGO_LINKEDIN } from "../images/linkedin.svg";
import { ReactComponent as MENU } from "../images/menu.svg";
import Offcanvas from 'react-bootstrap/Offcanvas';
const Header = () => {

  const [offcanvasShow, offcanvassetShow] = useState(false);
  const OffcanvasToggle = () => offcanvassetShow(!offcanvasShow);
  return (<>
    <div className="sidebar">
      <nav className="sidebarlinks">
        <a href={"https://github.com/smoluu"} target="_blank" rel="noreferrer"><LOGO_GITHUB /> </a>
        <a href={"https://www.linkedin.com/in/santeri-smolander-186292294/"} target="_blank" rel="noreferrer"><LOGO_LINKEDIN /> </a>
      </nav>
    </div>

    <div className="logo">
      <NavLink to="/"
      ><LOGO />
      </NavLink>

    </div>

    <nav className="navbar-container">

      <div className="navbar-hamburger">
        <button className="hamburger-button" onClick={OffcanvasToggle}>
          <MENU></MENU>
        </button>
      </div>

      <div className="navbar-links">
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
      </div>

        <Offcanvas className={`offcanvas ${offcanvasShow ? "open" : ""}`} placement="end" show={offcanvasShow} onHide={OffcanvasToggle}>
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="navbar-links-offcanvas">
            <NavLink
              to="/"
              onClick={OffcanvasToggle}
              >Home
            </NavLink>

            <NavLink
              to="/About"
              onClick={OffcanvasToggle}
              >About
            </NavLink>

            <NavLink
              to="/Projects"
              onClick={OffcanvasToggle}
              >Projects
            </NavLink>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

    </nav>
  </>)
}

export default Header