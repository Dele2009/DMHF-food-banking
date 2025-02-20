import { FiMenu } from "react-icons/fi";
import ProfileToggle from "../../ui/ProfileToggle";
import { BiBell } from "react-icons/bi";
import { Chip } from "@heroui/react";
import NotificationDropdown from "../../ui/Notification";

function DashboardHeader({ toggleSidebar, isOpen }: { toggleSidebar: () => void; isOpen: boolean; }) {
  return (
    <>
      <header className="fixed z-40 flex h-16 w-full items-center justify-between text-white bg-black px-6 border-b border-white/20">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none lg:hidden"
          >
            <FiMenu size={24} />
          </button>
          <h2 className="ml-4 text-xl font-bold">Dashboard</h2>
        </div>
        <div className="flex items-center space-x-4">
          {/* <div className="bg-[#1e1e1e] relative rounded-full p-3">
            <BiBell className="text-yellow-500" size={25} />
            <div className="absolute top-0 right-1 scale-80">
              <Chip radius="md" color="danger" size="sm">
                3
              </Chip>
            </div>
          </div> */}
          <NotificationDropdown/>
          <ProfileToggle firstname="John" lastname="Doe" email="test@g.com" />
          {/* <span className="">Welcome, John Doe</span> */}
        </div>
      </header>
    </>
  );
}

export default DashboardHeader;
