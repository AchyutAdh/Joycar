import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ListCar from 'views/dashboard/ListCar';
import ListForm from 'views/dashboard/ListForm';
import AccountSettings from 'views/AccountSettings';


// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/seller',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'carlist',
            element: <ListCar />
        },
        {
            path: 'carlist/create',
            element: <ListForm />
        },
        {
            path: 'account',
            element: <AccountSettings />
        }
    ]
};

export default MainRoutes;
