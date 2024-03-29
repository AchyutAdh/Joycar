

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'General',
    type: 'group',
    children: [
        {
            id: '1',
            title: 'Dashboard',
            type: 'item',
            url: '/seller/dashboard',
            breadcrumbs: false
        }, 
        {
            id: '2',
            title: 'Evaluate',
            type: 'item',
            url: '/seller/evaluate',
            breadcrumbs: false
        },
        {
            id: '3',
            title: 'Car List',
            type: 'item',
            url: '/seller/carlist',
            breadcrumbs: false
        },
        {
            id: '4',
            title: 'Appointments',
            type: 'item',
            url: '/seller/appointments',
            breadcrumbs: false
        }
    ]
};

export default dashboard;
