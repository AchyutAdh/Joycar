import dashboard from './dashboard';
import dashboardbuyer from './dashboardbuyer';

const buyerMenuItems = {
    items: [dashboardbuyer]
};

const sellerMenuItems = {
    items: [dashboard]
};

const userType = localStorage.getItem('user');
let menuItems;

if (localStorage.getItem('access_token') !== null) {
    if (userType === 'buyer') {
        menuItems = buyerMenuItems;
    } else {
        menuItems = sellerMenuItems;
    }
}

export default menuItems;