import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import { routes } from "./routes";

// Function to check if the user is authenticated
// const isAuthenticated = () => {
//   // Implement your session check logic here
//   return false; // Placeholder for session check
// };

// Protected Route component
// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   if (!isAuthenticated()) {
//     // Redirect to the login page if not authenticated
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// App component with router setup
const PortalRouter = () => {
  return (
    <Router>
      <Routes>
        {
          routes.map((route) => 
            <Route path={route.path} element={route.component()}/>
          )
        }
      </Routes>
    </Router>
  );
};

export default PortalRouter;
