import {APIProvider} from "./contexts/APIContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import {UserProvider} from "./contexts/UserContext";
import AppScaffolding from "./views/AppScaffolding";

function App() {
  return (
    <NotificationProvider>
      <UserProvider>
        <APIProvider>
          <AppScaffolding/>
        </APIProvider>
      </UserProvider>
    </NotificationProvider>
  );
}

export default App;