import { useRef } from "react";

import { Container,  Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/evaluate",
    display: "Evaluate",
  },
  {
    path: "/about",
    display: "About",
  },

  {
    path: "/faq",
    display: "FAQ",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);

  const access_token = localStorage.getItem('access_token');


  // const toggleMenu = () => menuRef.current.classList.toggle("menu__active"); //change toogle button

  return (
    <header className="header">
     

      {/* ========== main navigation =========== */}

      <div className="main__navbar" style={{padding: '35px'}}>
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <button style={{textDecoration: 'none'}}><i class="ri-menu-line"></i></button>
            </span> 

            <div className="navigation" ref={menuRef}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">

                {access_token === null ? 
                <>
                <Link to="/login" className=" d-flex align-items-center gap-1">
                  <i class="ri-login-circle-line"></i> Login
                </Link>

                <Link to="/register" className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> Register
                </Link>
                </>
                :
                <Link to="/dashboard" className=" d-flex align-items-center gap-1">
                  <i class="ri:dashboard-fill"></i> Dashboard
              </Link>
              }

              </div>
            </Col>
          
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
