import PortalRouter from "./router";
import {APIProvider} from "./contexts/APIContext";
import {UserProvider} from "./contexts/UserContext";
import { SocketProvider } from "./contexts/SocketContext";

function App() {
  return (
    <UserProvider>
      <APIProvider>
        <SocketProvider>
          <PortalRouter />
        </SocketProvider>
      </APIProvider>
    </UserProvider>
  );
}

export default App;