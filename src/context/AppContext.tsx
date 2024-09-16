import { createContext, useContext, useReducer } from "react";

type AppContextType = {
  state: AppStateType;
  removeNotification: (id: string) => void;
  setNotifications: (data: NotificationData) => void;
  setDevices: (data: DeviceData[]) => void;
  setTasks: (data: TaskData[]) => void;
  setDialogOpen: (isOpen: boolean) => void;
}

const AppContext = createContext({} as AppContextType);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = {
    notifications: [],
    devices: [],
    tasks: [],
    isDialogOpen: false
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
        return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
      case "SET_DIALOG_OPEN":
        return { ...state, isDialogOpen: action.payload };
      default:
        return state;
    }
  }

  function removeNotification(id: string) {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
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

  return <AppContext.Provider value={{
    state,
    removeNotification,
    setNotifications,
    setDevices,
    setTasks,
    setDialogOpen
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
