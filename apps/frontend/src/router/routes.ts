import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";

export interface RouteItem {
  path: string;
  component: React.ComponentType;
}

export const routes: RouteItem[] = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/login',
    component: LoginPage
  }
];