import Home from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import Inventory2 from '@mui/icons-material/Inventory2';
import Discount from '@mui/icons-material/Discount';
import ListAltIcon from '@mui/icons-material/ListAlt';

export const SideBarData = [
    {
        title: 'Dashboard',
        icon: <Home />,
        link: '/admin',
    },
    {
        title: 'Khách hàng',
        icon: <People />,
        link: '/admin/users',
    },
    {
        title: 'Sản phẩm',
        icon: <Inventory2 />,
        link: '/admin/products',
    },
    {
        title: 'Khuyến mãi và Giảm giá',
        icon: <Discount />,
        link: '/admin/discount',
    },
    {
        title: 'Đơn hàng',
        icon: <ListAltIcon />,
        link: '/admin/orders',
    },
];
