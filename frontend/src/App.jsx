import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserSharedLayout, UserLogin, UserPrivateRoute } from './pages/User';
import {
  AdminSharedLayout,
  AdminLogin,
  MiniDrawerLayout,
  TodayAttendance,
  ViewAttendance,
  AdminPrivateRoute,
} from './pages/Admin';
import UnRegisterUser from './pages/Admin/Dashboard/UnRegisterUser';
import RegisterNewUser from './pages/Admin/Dashboard/RegisterNewUser';
import EditUserProfile from './pages/Admin/Dashboard/EditUserProfile';
import { useDispatch } from 'react-redux';
import { auth, fetchAllUsers } from './api/user';
import AdminProfile from './pages/Admin/Dashboard/Profile';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
    dispatch(fetchAllUsers());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='user' element={<UserSharedLayout />}>
          <Route path='login' element={<UserLogin />} />
        </Route>
        <Route path='admin' element={<AdminSharedLayout />}>
          <Route path='login' element={<AdminLogin />} />
          <Route
            path='dashboard'
            element={
              <AdminPrivateRoute>
                <MiniDrawerLayout />
              </AdminPrivateRoute>
            }
          >
            <Route index element={<TodayAttendance />} />
            <Route path='attendance' element={<ViewAttendance />} />
            <Route path='register' element={<RegisterNewUser />} />
            <Route path='un-register' element={<UnRegisterUser />} />
            <Route path='profile' element={<AdminProfile />} />
            <Route path='edit' element={<EditUserProfile />} />
            <Route path='edit/:id' element={<RegisterNewUser />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
