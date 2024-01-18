import {APIProvider} from "./contexts/APIContext";
import {UserProvider} from "./contexts/UserContext";
import AppScaffolding from "./views/AppScaffolding";

function App() {
  return (
    <UserProvider>
      <APIProvider>
        <AppScaffolding/>
        
      </APIProvider>
    </UserProvider>
  );
}

export default App;