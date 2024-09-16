import ReactDOM from 'react-dom/client';
import App from './components/App';
import AppContextProvider from './context/AppContext';
import './main.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
