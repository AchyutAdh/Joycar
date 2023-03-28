import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import AuthRole from 'views/pages/authentication/authentication3/AuthRole';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
   
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <AuthRole />
        },
        {
            path: '/login/buyer',
            element: <AuthLogin3 />
        },
        {
            path: '/login/seller',
            element: <AuthLogin3 />
        },
        {
            path: '/register',
            element: <AuthRegister3 />
        }
    ]
};

export default AuthenticationRoutes;
