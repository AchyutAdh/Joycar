import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import LiveAuction from 'views/dashboardbuyer/LiveAuction';
import LiveAuctionDetails from 'views/dashboardbuyer/LiveAuctionDetails';
import MyBids from 'views/dashboardbuyer/MyBids';
import AccountSettings from 'views/AccountSettings';
import Appointments from 'views/dashboardbuyer/Appointments';


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
        },
        {
            path: 'liveauction',
            element: <LiveAuction />
        },
        {
            path: 'liveauction/:id',
            element: <LiveAuctionDetails />
        },
        {
            path: 'mybids',
            element: <MyBids />
        },
        {
            path: 'appointments',
            element: <Appointments />
        },
        {
            path: 'account',
            element: <AccountSettings />
        }
    ]
};

export default BuyerRoutes;
