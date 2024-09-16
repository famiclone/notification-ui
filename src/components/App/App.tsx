import { useCallback, useEffect, useState } from "react";
import { WSClient, HTTPClient } from "../../api/client";
import { useAppContext } from "../../context/AppContext";
import Header from "../Header"
import ItemList from "../ItemList";
import NotifyDialog from "../NotifyDialog";

const App = () => {
  const { state, setNotifications, setDevices, setTasks, setDialogOpen } = useAppContext();
  const [httpClient, setHttpClient] = useState<HTTPClient | null>(null);

  const handleMessage = useCallback((data: string) => {
    const parsedData = JSON.parse(data);
    parsedData.status = "UNREAD";
    setNotifications(parsedData);
  }, [setNotifications]);

  useEffect(() => {
    const wsClient = new WSClient("localhost:5050", handleMessage);
    return () => {
      wsClient.ws.close();
    };
  }, [handleMessage]);

  useEffect(() => {
    const client = new HTTPClient();
    setHttpClient(client);

    async function fetchData() {
      const devices = await client.getDevices();
      const tasks = await client.getTasks();
      setDevices(devices);
      setTasks(tasks);
    }

    fetchData();

    const i = setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      clearInterval(i);
    };
  }, []);

  return <div className="app-container">
    <Header />
    <main>
      <div className="dashboard-container">
        <ItemList items={state.devices} />
        <ItemList items={state.tasks} />
        <div className="empty"></div>
      </div>

      <NotifyDialog
        isOpen={state.isDialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={async (e: React.FormEvent) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const message = formData.get("message") as string;
          await httpClient?.sendMessage(message);
          setDialogOpen(false);
        }}
      />
      <div>
      </div>
    </main>
  </div>;
};

export default App;
