declare global {
  enum NotificationType {
    SUCCESS = 'Success',
    INFO = 'Info',
    ALERT = 'Alert'
  }

  type NotificationStatus = 'READ' | 'UNREAD';

  type NotificationData = {
    type: NotificationType;
    message: string;
    url: string;
    id: string;
    status: NotificationStatus;
    date: string;
  }

  type DeviceData = {
    id: number;
    name: string;
    online: boolean;
  }

  type TaskData = {
    name: string;
    status: string;
    id: number;
  }

  type AppStateType = {
    notifications: Array<NotificationData>;
    devices: Array<DeviceData>;
    tasks: Array<TaskData>;
    isDialogOpen: boolean;
    isShowLast: boolean;
    isStartUp: boolean;
  };

  type Action<Payload> = { type: string; payload: Payload };
  type Payload = any[];
}

export { };
