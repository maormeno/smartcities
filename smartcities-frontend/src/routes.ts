import Emergencies from "./pages/Emergencies";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {FC} from "react";

interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const appRoutes: Array<Route> = [
    {
        key: 'emergencies-route',
        title: 'Emergencies',
        path: '/emergencies',
        enabled: true,
        component: Emergencies
    },
    {
        key: 'register-route',
        title: 'Register',
        path: '/register',
        enabled: true,
        component: Register
    },
    {
        key: 'login-route',
        title: 'Login',
        path: '/',
        enabled: true,
        component: Login
    },

]