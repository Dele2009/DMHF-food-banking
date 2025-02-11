import { useState, useEffect } from "react";
import { IconType } from "react-icons";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, Link as SideBarLink } from "@heroui/react";

export interface LinkType {
  name: string;
  icon: IconType;
  path?: string;
  dropdown?: LinkType[];
}

interface SidebarPropType {
  isOpen: boolean;
  links: LinkType[];
}

function DashboardSidebar({ isOpen, links }: SidebarPropType) {
  const { pathname } = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  useEffect(() => {
    const current = pathname.split("/")[2];
    setCurrentPath(current);
  }, [pathname]);
  const toggleDropdown = (menu: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };

  return (
    <div
      className={`fixed left-0 pt-14 z-30 h-screen w-64 bg-black border-r border-white/20 text-white shadow-lg transition-transform duration-300 ease-in-out lg:relative ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="relative h-[97%]">
        <nav className="h-full mt-4 flex flex-col space-y-4  p-4 overflow-y-auto">
          {links.map((link, index) => {
            if (link.dropdown) {
              return (
                <div key={index} className="relative">
                  <Button
                    variant={
                      currentPath === link.name.toLowerCase() ? "solid" : "flat"
                    }
                    color="warning"
                    className="w-full flex items-center justify-between text-white"
                    onPress={() => toggleDropdown(link.name.toLowerCase())}
                  >
                    <span className="flex items-center gap-2 text-md">
                      <link.icon size={20} /> {link.name}
                    </span>
                    <FiChevronDown
                      size={20}
                      className={`transition-transform ${
                        openDropdowns.includes(link.name.toLowerCase())
                          ? "rotate-180"
                          : "rotate-0"
                      }`}
                    />
                  </Button>
                  {openDropdowns.includes(link.name.toLowerCase()) && (
                    <Card isBlurred className="mt-2 first-line: p-1 space-y-2">
                      {link.dropdown.map((dropLink, index) => (
                        <SideBarLink
                          as={Link}
                          key={index}
                          to={dropLink.path || "#"}
                          className="flex items-center px-4 py-2 "
                        >
                          <dropLink.icon size={18} className="mr-2" />{" "}
                          {dropLink.name}
                        </SideBarLink>
                      ))}
                    </Card>
                  )}
                </div>
              );
            } else {
              return (
                <Button
                  as={Link}
                  key={index}
                  to={link.path || "#"}
                  variant={currentPath === link.path ? "solid" : "flat"}
                  color="warning"
                  className="w-full flex items-center justify-start gap-2 text-md text-white"
                  onPress={() => toggleDropdown(link.name.toLowerCase())}
                >
                  <link.icon size={20} /> {link.name}
                </Button>
              );
            }
          })}
        </nav>
        <div className="w-full absolute bottom-0 left-0 border-t border-white/20 p-4">
          <a
            href="#"
            className="flex items-center px-4 py-2 text-white bg-[#ff0000] rounded-md"
          >
            <FiLogOut className="mr-3" size={20} /> Logout
          </a>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
