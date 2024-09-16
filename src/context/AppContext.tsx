import { createContext, useContext, useReducer } from "react";
import { HTTPClient } from "../api/client";

type AppContextType = {
  state: AppStateType;
  removeNotification: (id: string | null) => void;
  setNotifications: (data: NotificationData) => void;
  setDevices: (data: DeviceData[]) => void;
  setTasks: (data: TaskData[]) => void;
  setDialogOpen: (isOpen: boolean) => void;
  setShowLast: (bool: boolean) => void;
  playSound: () => void;
  updateTask: (client: HTTPClient) => void;
  deleteTask: (client: HTTPClient) => void;
  closeStartUpDialog: () => void;
}

const AppContext = createContext({} as AppContextType);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = {
    notifications: [],
    devices: [],
    tasks: [],
    isDialogOpen: false,
    isShowLast: false,
    isStartUp: true
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: AppStateType, action: { type: string, payload: any }): AppStateType {
    switch (action.type) {
      case "SET_NOTIFICATIONS":
        return { ...state, notifications: [...state.notifications, action.payload] };
      case "SET_DEVICES":
        return { ...state, devices: action.payload };
      case "SET_TASKS":
        return { ...state, tasks: action.payload };
      case "REMOVE_NOTIFICATION":
        return { ...state, notifications: action.payload };
      case "SET_DIALOG_OPEN":
        return { ...state, isDialogOpen: action.payload };
      case "SET_SHOW_LAST": 
        return { ...state, isShowLast: action.payload };
      case "SET_STARTUP":
        return { ...state, isStartUp: action.payload };
      default:
        return state;
    }
  }

  function removeNotification(id: string | null) {
    if (!id) {
      return;
    }

    const notifications = state.notifications.filter((n: NotificationData) => n.id !== id);
    dispatch({ type: "REMOVE_NOTIFICATION", payload: notifications });
  }

  function setNotifications(data: NotificationData) {
    dispatch({ type: "SET_NOTIFICATIONS", payload: data });
  }

  function setDevices(data: DeviceData[]) {
    dispatch({ type: "SET_DEVICES", payload: data });
  }

  function setTasks(data: TaskData[]) {
    dispatch({ type: "SET_TASKS", payload: data });
  }

  function setDialogOpen(isOpen: boolean) {
    dispatch({ type: "SET_DIALOG_OPEN", payload: isOpen });
  }

  function setShowLast(bool: boolean) {
    dispatch({ type: "SET_SHOW_LAST", payload: bool});
  }

  function playSound() {
    const audio = new Audio("assets/sound/notification.wav");
    audio.play().catch(err => console.error(err));
  }

  function updateTask(client: HTTPClient) {
    if (state.tasks.length === 0) return
    const statusList = ['pending', 'in_progress', 'completed'];
    const id = state.tasks[Math.floor(Math.random() * state.tasks.length)].id;
    const status = statusList[Math.floor(Math.random() * statusList.length)];
    
    client.updateTask(id, status);
  }

  function deleteTask(client: HTTPClient) {
    if (state.tasks.length === 0) return;
    const id = state.tasks[Math.floor(Math.random() * state.tasks.length)].id;
    console.log(id);

    client.deleteTask(id);
  }

  function closeStartUpDialog() {
    dispatch({ type: "SET_STARTUP", payload: false });
  }

  return <AppContext.Provider value={{
    state,
    removeNotification,
    setNotifications,
    setDevices,
    setTasks,
    setDialogOpen,
    setShowLast,
    playSound,
    updateTask,
    deleteTask,
    closeStartUpDialog
  }}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useAppContext must be used within an AppContext.Provider");
  }

  return ctx;
}

export default AppContextProvider;
