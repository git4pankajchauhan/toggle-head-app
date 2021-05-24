import { Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  /* Close Side Menu Mobile View */
  const closeSidebar = () => {
    setSidebar(false);
  };

  /* Open Side Menu Mobile View */
  const sideBarClick = e => {
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const sidebar = document.querySelector('.sidebar');
    if (sidebarMenu !== e.target && sidebar === e.target) {
      setSidebar(false);
    }
  };

  return (
    <nav className="main-navbar">
      <div className="container">
        <Menu className="navbar-icon" onClick={() => setSidebar(true)} />
        <div className={`sidebar ${sidebar && 'sidebar-fade-in'}`} onClick={sideBarClick}>
          <div className={`sidebar-menu ${sidebar && 'show-menus'}`}>
            <div className="nav-menus">
              <NavLink onClick={closeSidebar} activeClassName="active-link" className="nav-link" exact to="/story">
                Story
              </NavLink>
              <NavLink onClick={closeSidebar} activeClassName="active-link" className="nav-link" exact to="/">
                Our Product
              </NavLink>
              <NavLink onClick={closeSidebar} activeClassName="active-link" className="nav-link" exact to="/store-locator">
                Store Locator
              </NavLink>
              <NavLink onClick={closeSidebar} activeClassName="active-link" className="nav-link" exact to="/kitchen">
                Kitchen
              </NavLink>
              <NavLink onClick={closeSidebar} activeClassName="active-link" className="nav-link" exact to="/media">
                Media
              </NavLink>
              <NavLink onClick={closeSidebar} activeClassName="active-link" className="nav-link" exact to="/blogs">
                Blogs
              </NavLink>
              <NavLink onClick={closeSidebar} activeClassName="active-link" className="nav-link" exact to="/contact-us">
                Contact Us
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
