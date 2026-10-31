
import React from "react";
import NotificationPanel from "./notificationpanel";

function Header({
  searchQuery,
  onSearchChange,
  showNotifications,
  onToggleNotifications,
  notifications = [],
  onMarkRead,
  onClearNotifications
}) {

  return (

    <header className="header">

      {/* Left Section */}
      <div className="header-left">

        <h1>Dashboard</h1>

        <p>
          Welcome back! Here's your banking overview.
        </p>

      </div>

      {/* Right Section */}
      <div className="header-right">

        {/* Search */}
        <div className="header-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search banking products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />

        </div>

        {/* Notifications */}
        <div className="notification-wrapper">

          <button
            type="button"
            className="notification-btn"
            onClick={onToggleNotifications}
            aria-label="Toggle notifications"
            aria-expanded={showNotifications}
          >

            🔔

            {notifications.some(
              (item) => !item.read
            ) && (
              <span className="notification-dot"></span>
            )}

          </button>

          {/* Notification Panel */}
          {showNotifications && (

            <NotificationPanel
              notifications={notifications}
              onMarkRead={onMarkRead}
              onClear={onClearNotifications}
            />

          )}

        </div>

        {/* User Profile */}
        <div className="user-profile">

          <div className="user-avatar">
            SM
          </div>

          <div className="user-info">

            <h4>Shamil</h4>

            <span>Customer</span>

          </div>

        </div>

      </div>

    </header>

  );

}

export default Header;
