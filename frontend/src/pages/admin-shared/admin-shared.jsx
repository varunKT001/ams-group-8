import React from "react";
import { Outlet } from "react-router-dom";
import Drawer from "../../components/drawer/drawer";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
const AdminShared = () => {
  const navBarItems = [
    {
      text: "Add New User ",
      icon: <PersonAddIcon />,
      url: "/admin-dashboard/add-new-user",
    },
    {
      text: "Unregister User ",
      icon: <PersonRemoveIcon />,
      url: "/admin-dashboard/unregister-user",
    },
    {
      text: "View Attendance ",
      icon: <CalendarTodayIcon />,
      url: "/admin-dashboard/view-attendance",
    },
    {
      text: "Edit User Profile",
      icon: <ManageAccountsIcon />,
      url: "/admin-dashboard/edit-user-profile",
    },
  ];
  return (
    <div>
      <Drawer navBarItems={navBarItems}>
        <Outlet />
      </Drawer>
    </div>
  );
};

export default AdminShared;
