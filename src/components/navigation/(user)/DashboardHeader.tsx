import { FiMenu } from "react-icons/fi";
import ProfileToggle from "../../ui/ProfileToggle";
import NotificationDropdown from "../../ui/Notification";
import { Logo } from "../(main)/Navbar";

function DashboardHeader({ toggleSidebar, isOpen }: { toggleSidebar: () => void; isOpen: boolean; }) {
  return (
    <>
      <header className="fixed z-40 flex h-16 w-full items-center justify-between text-white bg-black px-6 lg:px-11 border-b border-white/20">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none lg:hidden"
          >
            <FiMenu size={24} />
          </button>
          <Logo size={40} />
        </div>
        <div className="flex items-center space-x-1">
          <NotificationDropdown />
          <ProfileToggle/>
        </div>
      </header>
    </>
  );
}

export default DashboardHeader;
