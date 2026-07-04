import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import FloatingBackground from "../components/dashboard/FloatingBackground";
import GlassOverlay from "../components/dashboard/GlassOverlay";
import { useState } from "react";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
   <div className="min-h-screen text-white flex bg-[#090511] overflow-hidden">
       
      {/* <FloatingBackground />
      <GlassOverlay /> */}

      {/* Sidebar */}
      <Sidebar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

      {/* Main Content */}
    <div className="flex-1 flex flex-col relative z-10 min-h-screen xl:ml-[270px]">

        <Navbar
  setSidebarOpen={setSidebarOpen}
/>

      <main className="flex-1 p-4 md:p-6 xl:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default MainLayout;