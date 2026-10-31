
import React from "react";

function NotificationPanel({
  notifications,
  onMarkRead,
  onClear
}) {

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (

    <div className="notification-panel">

      <div className="notification-heading">

        <div>
          <h3>Notifications</h3>
          <span>{unreadCount} unread</span>
        </div>

        <button onClick={onClear}>
          Clear all
        </button>

      </div>

      <div className="notification-list">

        {notifications.length > 0 ? (

          notifications.map((notification) => (

            <div
              key={notification.id}
              className={
                notification.read
                  ? "notification-item"
                  : "notification-item unread"
              }
            >

              <div>
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <span>{notification.time}</span>
              </div>

              {!notification.read && (

                <button
                  onClick={() => onMarkRead(notification.id)}
                >
                  Mark read
                </button>

              )}

            </div>

          ))

        ) : (

          <div className="empty-notifications">
            <p>No notifications available.</p>
          </div>

        )}

      </div>

    </div>

  );
}

export default NotificationPanel;
