import { useEffect, useState } from "react";
import {
  FiHome,
  FiBookOpen,
  FiUser,
  FiSettings,
  FiStar,
  FiCheckCircle,
  FiBookmark,
} from "react-icons/fi";
import { BsCheckCircle, BsClock, BsHourglass } from "react-icons/bs";

import { Outlet } from "react-router-dom";
// import { useBreakpoint } from "../../hooks/useBreakpoint";
import DashboardSidebar, {
  LinkType,
} from "../../../components/navigation/(user)/DashboardSidebar";
import DashboardHeader from "../../../components/navigation/(user)/DashboardHeader";
import { UseBreakpoint } from "../../../hooks/useBreakpoint";
import { FaComments, FaFile, FaHandshake, FaHandshakeAltSlash, FaHandshakeSlash, FaHome, FaRegFileExcel, FaStar, FaUser } from "react-icons/fa";

export default function MemberLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [useBreakpoint, setUseBreakpoint] = useState<UseBreakpoint>({
    viewportWidth: 0,
    breakpoint: () => false,
  });
  useEffect(() => {
    import("../../../hooks/useBreakpoint")
      .then((module) => {
        const hooks = module.useBreakpoint();
        setUseBreakpoint(hooks);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const { viewportWidth, breakpoint } = useBreakpoint;

  const SidebarLinks: LinkType[] = [
    {
      name: "Dashboard",
      icon: FaHome,
      path: "dashboard",
    },

    {
      name: "New-Request",
      // icon: FaHandshakeAltSlash,
      icon: FaHandshake,
      path: "new-requests",
    },
    {
      name: "All-Requests",
      icon: FaFile,
      path: "all-requests",
    },
    {
      name: "Profile",
      icon: FaUser,
      path: "profile",
    },
    {
      name: "Help & Assistance",
      icon: FaStar,
      path: "help",
    },
    {
      name: "Messages",
      icon: FaComments,
      path: "messages",
    },
  ];

  useEffect(() => {
    setSidebarOpen(breakpoint("lg") ? true : false);
  }, [viewportWidth]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Sidebar Overlay */}
      {!breakpoint("lg") && isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Header */}
      <DashboardHeader toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar isOpen={isSidebarOpen} links={SidebarLinks} />

        {/* Content Area */}
        <main className="h-screen flex-auto overflow-y-auto p-6 pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
