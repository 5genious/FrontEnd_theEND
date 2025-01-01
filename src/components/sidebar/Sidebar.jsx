import { useContext, useEffect, useRef } from "react";

import {
  MdOutlineBarChart,
  MdOutlineRequestQuote,
  MdOutlineErrorOutline,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineMessage,
  MdOutlinePeople,
  MdOutlineSettings,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";
import { Button } from "keep-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";
import { FaUser } from "react-icons/fa6";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  // Ferme la barre latérale en cliquant à l'extérieur
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <NavLink
                to="/menu"
                className="menu-link"
                activeClassName="active"
              >
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Menu</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/incidents"
                className="menu-link"
                activeClassName="active"
              >
                <span className="menu-link-icon">
                  <MdOutlineErrorOutline size={20} />{" "}
                  {/* Icône pour "Incidents" */}
                </span>
                <span className="menu-link-text">Incidents</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/demandes"
                className="menu-link"
                activeClassName="active"
              >
                <span className="menu-link-icon">
                  <MdOutlineRequestQuote size={20} />{" "}
                  {/* Icône pour "Demandes" */}
                </span>
                <span className="menu-link-text">Demandes</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/profile"
                className="menu-link"
                activeClassName="active"
              >
                <span className="menu-link-icon">
                  <FaUser size={15} /> {/* Icône pour "Demandes" */}
                </span>
                <span className="menu-link-text">profile</span>
              </NavLink>
            </li>
            {user.roles && user.roles.includes("ADMIN") && (
              <li className="menu-item">
                <NavLink
                  to="/statistiques"
                  className="menu-link"
                  activeClassName="active"
                >
                  <span className="menu-link-icon">
                    <MdOutlineBarChart size={18} />{" "}
                    {/* Icône pour "Statistiques" */}
                  </span>
                  <span className="menu-link-text">Statistiques</span>
                </NavLink>
              </li>
            )}

            {user.roles && user.roles.includes("ADMIN") && (
              <li className="menu-item">
                <NavLink
                  to="/utilisateurs"
                  className="menu-link"
                  activeClassName="active"
                >
                  <span className="menu-link-icon">
                    <MdOutlineShoppingBag size={20} />
                  </span>
                  <span className="menu-link-text">Utilisateurs</span>
                </NavLink>
              </li>
            )}
            {/*
              <li className="menu-item">
                <NavLink to="/hhh" className="menu-link" activeClassName="active">
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20}/>
                </span>
                  <span className="menu-link-text">Customer</span>
                </NavLink>
              </li>*/}

            {/* <li className="menu-item">
              <NavLink
                to="/hhhh"
                className="menu-link"
                activeClassName="active"
              >
                <span className="menu-link-icon">
                  <MdOutlineMessage size={18} />
                </span>
                <span className="menu-link-text">Messages</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                to="/profile"
                className="menu-link"
                activeClassName="active"
              >
                <span className="menu-link-icon">
                  <FaUser size={15} />
                </span>
                <span className="menu-link-text mt-1">Profile</span>
              </NavLink>
            </li>

            </li> */}
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            {/* <li className="menu-item menu-item-offset">
              <NavLink
                to="/parametre"
                className="menu-link"
                activeClassName="active"
              >
                <span className="menu-link-icon">
                  <MdOutlineSettings size={20} />
                </span>
                <span className="menu-link-text">Paramètres</span>
              </NavLink>
            </li> */}
            <li className="menu-item menu-item-offset deconnexion-button">
              <Button
                onClick={logout}
                className="menu-link"
                activeClassName="active"
              >
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Déconnexion</span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
