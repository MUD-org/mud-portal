import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { routes } from "./routes";

// App component with router setup
const PortalRouter = () => {
  return (
    <Router>
      <Routes>
        {
          routes.map((route) => 
            <Route key={route.path} path={route.path} element={<route.component/>}/>
          )
        }
      </Routes>
    </Router>
  );
};

export default PortalRouter;
