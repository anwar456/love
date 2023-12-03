import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function NavbarComponent() {
  const [activeMenu, setActivemenu] = useState("gallery");

  const handleMenuClick = (menu) => {
    setActivemenu(menu);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-white shadow-sm p-3">
        <Container>
          <NavLink className="nav-logo" to={"/"}>
            You❤️Me
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-menu">
              <Link
                to={"/gallery"}
                className={activeMenu === "gallery" ? "active" : ""}
                onClick={() => handleMenuClick("gallery")}
              >
                Gallery
              </Link>
              <Link
                to={"/resolution"}
                className={activeMenu === "resolution" ? "active" : ""}
                onClick={() => handleMenuClick("resolution")}
              >
                Resolution
              </Link>
              <Link
                to={"/quotes"}
                className={activeMenu === "quotes" ? "active" : ""}
                onClick={() => handleMenuClick("quotes")}
              >
                Quotes
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
