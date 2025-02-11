import { FiMenu } from "react-icons/fi";

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
          <span className="">Welcome, John Doe</span>
          <div className="flex size-10 items-center justify-center rounded-full bg-yellow-400 font-bold text-white">
            JD
          </div>
        </div>
      </header>
    </>
  );
}

export default DashboardHeader;
