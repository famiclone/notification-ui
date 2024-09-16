import { useCallback, useEffect, useState } from "react";
import { WSClient, HTTPClient } from "../../api/client";
import { useAppContext } from "../../context/AppContext";
import Header from "../Header"
import ItemList from "../ItemList";
import NotifyDialog from "../NotifyDialog";

const App = () => {
  const { state, setNotifications, setDevices, setTasks, setDialogOpen, setShowLast, playSound, updateTask, deleteTask, closeStartUpDialog } = useAppContext();
  const [httpClient, setHttpClient] = useState<HTTPClient | null>(null);

  const handleMessage = useCallback((data: string) => {
    const parsedData = JSON.parse(data);
    parsedData.status = "UNREAD";
    setNotifications(parsedData);
    setShowLast(true);
    playSound();
  }, [setNotifications, playSound, setShowLast]);

  useEffect(() => {
    if (state.isStartUp) {
      return;
    }
    const wsClient = new WSClient("localhost:5050", handleMessage);
    return () => {
      wsClient.ws.close();
    };
  }, []);

  useEffect(() => {
    if (state.isStartUp) {
      return;
    }

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
    <dialog open={state.isStartUp}>
      <h3>Warning</h3>
      <p>You need to start the <a rel="noreferrer" target="_blank" href="https://github.com/99994433552/websockets-notify">server</a> first.</p>
      <button className="button" onClick={closeStartUpDialog}>Server is running</button>
    </dialog>

    {!state.isStartUp && (
      <>
        <Header />
        <main>
          <div className="dashboard-container">
            {httpClient && (
              <div className="dashboard-container-left">
                <ItemList items={state.devices} />
                <div style={{ display: "flex", flexFlow: "column", gap: "1rem" }}>
                  <ItemList items={state.tasks} />
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button className="button" onClick={() => updateTask(httpClient)}>Update Task</button>
                    <button className="button" onClick={() => deleteTask(httpClient)}>Delete Task</button>
                  </div>
                </div>
              </div>
            )}
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

        </main>
      </>
    )};
  </div>;
};

export default App;
