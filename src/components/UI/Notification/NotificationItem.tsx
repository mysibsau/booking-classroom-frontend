import React, { useEffect } from "react";
import { IconDanger, IconSuccess } from "../Icons";
import { INotification, useNotification } from "./useNotification";


interface IProps {
    toast: INotification
}

const NotificationItem: React.FC<IProps> = ({ toast }) => {
    const { autoDelete, autoDeleteTime, position, toastList, deleteToast } = useNotification();

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && toastList.length) {
                deleteToast(toast.id);
            }
        }, autoDeleteTime);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={`notification ${position} ${toast.type}`} onClick={() => deleteToast(toast.id)}>
            <div className="notification-image">
                {toast.type === "danger"
                    ? <IconDanger color={"white"} size={50} />
                    : toast.type === "success" && <IconSuccess color={"white"} size={50} />
                }
            </div>
            <div>
                <p className="notification-title">
                    {toast.title}
                </p>
                <p className="notification-message">
                    {toast.description}
                </p>
            </div>
        </div>
    );
};

export default NotificationItem;