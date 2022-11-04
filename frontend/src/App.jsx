import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserSharedLayout, UserLogin } from './pages/User';
import {
  AdminSharedLayout,
  AdminLogin,
  MiniDrawerLayout,
  TodayAttendance,
  ViewAttendance,
} from './pages/Admin';
import UnRegisterUser from './pages/Admin/Dashboard/UnRegisterUser';
import RegisterNewUser from './pages/Admin/Dashboard/RegisterNewUser';
import EditUserProfile from './pages/Admin/Dashboard/EditUserProfile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='user' element={<UserSharedLayout />}>
          <Route path='login' element={<UserLogin />} />
        </Route>
        <Route path='admin' element={<AdminSharedLayout />}>
          <Route path='login' element={<AdminLogin />} />
          <Route path='dashboard' element={<MiniDrawerLayout />}>
            <Route index element={<TodayAttendance />} />
            <Route path='attendance' element={<ViewAttendance />} />
            <Route path='register' element={<RegisterNewUser />} />
            <Route path='un-register' element={<UnRegisterUser />} />
            <Route path='edit' element={<EditUserProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
