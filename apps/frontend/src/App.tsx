import PortalRouter from "./router";
import {APIProvider} from "./contexts/APIContext";
import {UserProvider} from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <APIProvider>
        <PortalRouter />
      </APIProvider>
    </UserProvider>
  );
}

export default App;