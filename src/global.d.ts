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

  type DeviceData = {}

  type TaskData = {}

  type AppStateType = {
    notifications: Array<NotificationData>;
    devices: Array<DeviceData>;
    tasks: Array<TaskData>;
    isDialogOpen: boolean;
  };

  type Action<Payload> = { type: string; payload: Payload };
  type Payload = any[];
}

export { };
