import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';


// dashboard routing
const DashboardBuyer = Loadable(lazy(() => import('views/dashboardbuyer/Default')));
// ==============================|| MAIN ROUTING ||============================== //

const BuyerRoutes = {
    path: '/buyer',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            element: <DashboardBuyer />
        }
    ]
};

export default BuyerRoutes;
