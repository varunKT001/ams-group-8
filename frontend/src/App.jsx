import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "../src/pages/user-login/user-login";
import AdminLogin from "../src/pages/admin-login/admin-login";
import AdminShared from "../src/pages/admin-shared/admin-shared";
import AdminDashboard from "../src/pages/admin-dashboard/admin-dashboard";
import AddNewUser from "../src/pages/add-new-user/add-new-user";
import UnregisterUser from "../src/pages/unregister-user/unregister-user";
import ViewAttendance from "../src/pages/view-attendance/view-attendance";
import EditUserProfile from "../src/pages/edit-user-profile/edit-user-profile";
import AdminProfile from "../src/pages/admin-profile/admin-profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="user-login" element={<UserLogin />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="admin-dashboard" element={<AdminShared />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-new-user" element={<AddNewUser />} />
          <Route path="unregister-user" element={<UnregisterUser />} />
          <Route path="view-attendance" element={<ViewAttendance />} />
          <Route path="edit-user-profile" element={<EditUserProfile />} />
          <Route path="admin-profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
