import { useCallback, useState } from "react";

import { useRequest } from "./useRequest";

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { sendRequest: markAsReadRequest } = useRequest({
    url: "/api/notifications/mark-read",
    method: "post",
    body: {},
    onSuccess: () => {
      console.log("Marked notification");
    },
  });

  const { sendRequest: clearAllRequest } = useRequest({
    url: "/api/notifications/clear-all",
    method: "post",
    body: {},
    onSuccess: () => {
      console.log("Notifications cleared");
    },
  });

  const markAsRead = useCallback(
    async (id: string) => {
      await markAsReadRequest({ id });
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    },
    [markAsReadRequest]
  );

  const clearAll = useCallback(async () => {
    await clearAllRequest();
    setNotifications([]);
  }, [clearAllRequest]);

  return {
    notifications,
    markAsRead,
    clearAll,
  };
};
