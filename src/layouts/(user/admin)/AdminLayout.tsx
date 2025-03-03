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
import { BiSolidUserAccount, BiSolidUserPlus, BiUserPlus } from "react-icons/bi";

export default function AdminLayout() {
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
      icon: FiHome,
      path: "dashboard",
    },
    {
      name: "Requests",
      icon: FiBookOpen,
      dropdown: [
        {
          name: "New Request",
          icon: BsCheckCircle,
          path: "requests/new",
        },
        {
          name: "All Requests",
          icon: BsHourglass,
          path: "requests/all",
        },
        {
          name: "Pending Requests",
          icon: BsHourglass,
          path: "requests/pending",
        },
      ],
    },
    {
      name: "Users",
      icon: FiUser,
      dropdown: [
        {
          name: "Add New User",
          icon: BiUserPlus,
          path: "users/new",
        },
        {
          name: "All Users",
          icon: BiSolidUserAccount,
          path: "users/all",
        }
      ],
    },
    {
      name: "Settings",
      icon: FiSettings,
      dropdown: [
        {
          name: "Profile",
          icon: FiUser,
          path: "settings/profile",
        },
      ],
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
