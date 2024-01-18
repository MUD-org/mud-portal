import { SocketProvider } from "./contexts/SocketContext";
import HomePage from "./views/HomePage";
import { UserProvider } from '@mud-portal/frontend/src/contexts/UserContext';
import { APIProvider } from '@mud-portal/frontend/src/contexts/APIContext';

function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <APIProvider>
          <HomePage/>
        </APIProvider>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;