import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EditIcon from '@mui/icons-material/Edit';
import TodayIcon from '@mui/icons-material/Today';

export const MiniDrawerList = [
  {
    name: `Today's attendance`,
    icon: <TodayIcon />,
    url: '/admin/dashboard',
  },
  {
    name: 'New user registration',
    icon: <AddCircleIcon />,
    url: '/admin/dashboard/register',
  },
  {
    name: 'Un-register user',
    icon: <PersonRemoveAlt1Icon />,
    url: '/admin/dashboard/un-register',
  },
  {
    name: 'View Attendance',
    icon: <ShowChartIcon />,
    url: '/admin/dashboard/attendance',
  },
  {
    name: 'Edit user profile',
    icon: <EditIcon />,
    url: '/admin/dashboard/edit',
  },
];
