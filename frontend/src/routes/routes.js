import config from '~/config';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Products from '~/pages/Products';

// không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.products, component: Products },
];

// phải đăng nhập, nếu không sẽ đưa ra login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
