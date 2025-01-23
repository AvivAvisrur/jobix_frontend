import React from "react";
import { Outlet } from "react-router";

interface Dashboard {
  title: string;
  description?: string; // Optional prop
}

const Dashboard: React.FC<Dashboard> = ({ title, description }) => {
  return (
    <div>
      <header>Header</header>
      <aside>Sidebar</aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
