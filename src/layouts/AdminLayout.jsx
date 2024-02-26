import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <p>admin Header</p>
      <Outlet></Outlet>
      <p>admin Footer</p>
    </div>
  );
};

export default AdminLayout;
