import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout");
    // TODO: Logout
    navigate("/login", { replace: true });
    // localStorage.removeItem("token");
    // window.location = "/";
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Asociaciones
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink            
            end            
            className={({isActive}) => `nav-item nav-link ${isActive ? "active" : ""}`}
            to="/marvel"
          >
            Marvel
          </NavLink>

          <NavLink            
            end
            className={({isActive}) => `nav-item nav-link ${isActive ? "active" : ""}`}
            to="/dc"
          >
            DC
          </NavLink>

          <NavLink            
            end
            className={({isActive}) => `nav-item nav-link ${isActive ? "active" : ""}`}
            to="/search"
          >
            Search
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <span className="nav-item nav-link text-info">Juan</span>
          <button className="nav-item nav-link btn" onClick={handleLogout}>Logout</button>
        </ul>
      </div>
    </nav>
  );
};
