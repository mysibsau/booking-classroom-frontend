import React, { useEffect } from "react";
import { IconDanger, IconSuccess } from "../Icons";
import "./Notification.scss";
import { INotification, TPosition, useNotification } from "./useNotification";

interface IPropsItem {
    notification: INotification;
    position: TPosition;
}

interface IPropsContainer {
    position?: TPosition;
}

const NotificationItem: React.FC<IPropsItem> = ({ notification, position }) => {
    const { notificList, deleteNotific } = useNotification();

    useEffect(() => {
        const interval = setInterval(() => {
            if (notification.autoDelete && notificList.length && notificList.length) {
                deleteNotific(notification.id);
            }
        }, notification.autoDeleteTime);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={`notification ${position} ${notification.type}`} onClick={() => deleteNotific(notification.id)}>
            <div className="notification-image">
                {notification.type === "danger"
                    ? <IconDanger color={"white"} size={50} />
                    : notification.type === "success" && <IconSuccess color={"white"} size={50} />
                }
            </div>
            <div>
                <p className="notification-title">
                    {notification.title}
                </p>
                <p className="notification-message">
                    {notification.body}
                </p>
            </div>
        </div>
    );
};

const Notification: React.FC<IPropsContainer> = ({ position = "bottom-right" }) => {
    const { notificList } = useNotification();

    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    notificList.map((notification) =>
                        <NotificationItem notification={notification} position={position} key={notification.id} />
                    )
                }
            </div>
        </>
    );
};

export default Notification;