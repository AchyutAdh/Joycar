import HomeLayout from 'layout/HomeLayout';
import About from 'pages/About';
import Contact from 'pages/Contact';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';




// ==============================|| AUTHENTICATION ROUTING ||============================== //

const HomeRoutes = {
    path: '/',
    element: <HomeLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/about',
            element: <About />
        },
        {
            path: '/contact',
            element: <Contact />
        },
        {
            path: '*',
            element: <NotFound />
        },
    ]
};

export default HomeRoutes;
