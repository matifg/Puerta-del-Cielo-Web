import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

const MainLayout: React.FC = () => (
  <div>
    <Navbar />
    <main className="pt-20">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;