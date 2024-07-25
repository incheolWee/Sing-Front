import React from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from "./SideBar";
import Header from "./Header";


const Layout = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
