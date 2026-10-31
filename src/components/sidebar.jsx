
import React from "react";

function Sidebar({ activePage, onNavigate }) {

  const menuItems = [
    { name: "Dashboard"},
    { name: "Products"},
    { name: "Transactions"},
    { name: "Accounts"},
    { name: "Settings"}
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>EBANK</h2>
        <span>Banking Platform</span>
      </div>

      <nav className="sidebar-menu">

        <p className="menu-heading">MENU</p>

        {menuItems.map((item) => (

          <button
            key={item.name}
            type="button"
            className={`menu-item ${
              activePage === item.name ? "active" : ""
            }`}
            onClick={() => onNavigate(item.name)}
          >
            <span className="menu-icon">
              {item.icon}
            </span>

            <span>{item.name}</span>

          </button>

        ))}

      </nav>

      <div className="sidebar-footer">
        <p>EBANK Banking</p>
        <span>Version 1.0.0</span>
      </div>

    </aside>
  );
}

export default Sidebar;
