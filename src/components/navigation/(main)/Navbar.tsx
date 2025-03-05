import { useEffect, useState } from "react";
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as NavLink,
  Button,
  Image,
  Divider,
} from "@heroui/react";
import ThemeToggler from "../../theme/toggler";
import { Link, useLocation } from "react-router-dom";
import ProfileToggle from "../../ui/ProfileToggle";
import { useAuth } from "../../../hooks/useAuth";

export const Logo = ({ size = 30 }: { size?: number }) => {
  return <Image src="/logo-black.png" alt="logo" radius="none" height={size} />;
};

export default function Navbar() {
  const { isAuthenticated} = useAuth();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Take-action", path: "/take-action" },
    { label: "Legacy-gifts", path: "/legacy-gifts" },
    { label: "Contact-us", path: "/contact-us" },
  ];

  return (
    <Nav
      isBordered
      classNames={{ wrapper: "!w-full !max-w-full lg:px-10" }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarBrand as={Link} to="/">
          <Logo size={40} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={index}
            className="hidden lg:flex gap-4"
            isActive={item.path === currentPath}
          >
            <NavLink
              as={Link}
              aria-current="page"
              to={item.path}
              color={item.path !== currentPath ? "foreground" : "warning"}
            >
              {item.label}
            </NavLink>
          </NavbarItem>
        ))}
        <NavbarItem className="hidden lg:flex">
          <div className="w-0 h-[40px] border-r border-white/30 mx-5" />
        </NavbarItem>
        {!isAuthenticated ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                color="warning"
                to="/auth/sign-in"
                variant="bordered"
              >
                Sign In
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                color="warning"
                to="/auth/sign-up"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="flex">
            <ProfileToggle />
          </NavbarItem>
        )}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarItem isActive={item.path === currentPath} key={index}>
            <NavLink
              className="w-full"
              color={item.path !== currentPath ? "foreground" : "warning"}
              as={Link}
              to={item.path}
              onPress={() => setIsMenuOpen(false)}
              size="lg"
            >
              {item.label}
            </NavLink>
          </NavbarItem>
        ))}
        <NavbarMenuItem>
          <div className="flex gap-5 mt-5 justify-center">
            {!isAuthenticated && (
              <>
                {" "}
                <Button
                  className="w-full"
                  as={Link}
                  color="warning"
                  to="/auth/sign-in"
                  onPress={() => setIsMenuOpen(false)}
                  variant="bordered"
                >
                  Sign In
                </Button>
                <Button
                  className="w-full"
                  as={Link}
                  color="warning"
                  to="/auth/sign-up"
                  onPress={() => setIsMenuOpen(false)}
                  variant="flat"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Nav>
  );
}
