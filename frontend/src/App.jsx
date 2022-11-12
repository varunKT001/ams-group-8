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
import { auth } from './api/user';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
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
            <Route path='edit' element={<EditUserProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
