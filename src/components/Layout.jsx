import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar fixa */}
      <Sidebar />

      {/* Área principal */}
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
