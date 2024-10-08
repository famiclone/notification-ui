import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Notification from "../Notification";

const Notifications = () => {
  const { state, removeNotification, setShowLast } = useAppContext();
  const [isShow, setIsShow] = useState(false);
  const isUnread = state.notifications.some(n => n.status === "UNREAD");

  return <div className="notifications">
    <div>
      <button className={`button button--icon${isUnread ? ' button--unread' : ''}`} onClick={() => {
        setIsShow(!isShow);
      }}>
        <img src="assets/icons/bell.svg" width="24" height="24" alt="Notifications" />
      </button>

      {isShow && <div className="notification-block">
        {state.notifications.length === 0 && <div>
          <p>No notifications</p>
        </div>}
        {state.notifications.map((n: NotificationData) => (
          <Notification data={n} onClose={() => removeNotification(n.id)} />
        ))}
      </div>}
    </div>

    <div className="notification-block--float">
      {state.isShowLast && Boolean(state.notifications.length) && (
        <Notification data={state.notifications[state.notifications.length - 1]} onClose={() => {
          removeNotification(state.notifications[state.notifications.length - 1].id)
          setShowLast(false)
        }} />
      )}
    </div>
  </div>;
};

export default Notifications;
