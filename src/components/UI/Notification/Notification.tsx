import React from "react";
import "./Notification.scss";
import NotificationItem from "./NotificationItem";
import { TNotification, useNotification } from "./useNotification";


export const AddToast = (title: string, description: string, type: TNotification) => {
    const { addNotification } = useNotification()
    addNotification(title, description, type)
}

const Notification = () => {
    const { position, toastList } = useNotification();

    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    toastList.map((toast) =>
                        <NotificationItem toast={toast} key={toast.id} />
                    )
                }
            </div>
        </>
    );
};

export default Notification;