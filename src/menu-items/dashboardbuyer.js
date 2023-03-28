

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboardbuyer = {
    id: 'dashboard',
    title: 'General',
    type: 'group',
    children: [
        {
            id: '1',
            title: 'Dashboard',
            type: 'item',
            url: '/buyer/dashboard',
            breadcrumbs: false
        },
        {
            id: '2',
            title: 'Live Auction',
            type: 'item',
            url: '/buyer/liveauction',
            breadcrumbs: false
        },
        {
            id: '3',
            title: 'My Auction',
            type: 'item',
            url: '/buyer/myauction',
            breadcrumbs: false
        },
        {
            id: '4',
            title: 'Appointments',
            type: 'item',
            url: '/buyer/appointments',
            breadcrumbs: false
        },
    ]
};

export default dashboardbuyer;
