import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from '../redux/store.jsx'
import App from './App.jsx'
import { UserProvider } from "../components/UserContext";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <UserProvider>
    <App />
  </UserProvider>,
  </Provider>,
)
