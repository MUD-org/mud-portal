import { Route, Routes } from "react-router-dom";
import FeaturedElement from "../views/elements/FeaturedElement";

interface AppRouterProps {
}

const AppRouter: React.FC<AppRouterProps> = () => {
    return (
        <Routes>
            {/* This will prevent the app window from rendering */}
            <Route path="/client"/>
            {/* Normal routes */}
            <Route path="/featured" element={<FeaturedElement />}/>
        </Routes>
    );
};

export default AppRouter;