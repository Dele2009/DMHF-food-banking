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
} from "@heroui/react";
import ThemeToggler from "../../theme/toggler";
import { Link, useLocation } from "react-router-dom";
import ProfileToggle from "../../ui/ProfileToggle";
import { useAuth } from "../../../hooks/useAuth";

export const Logo = ({ size = 30 }: { size?: number }) => {
  return <Image src="/vite.svg" alt="logo" radius="none" height={size} />;
};

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
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
      classNames={{ wrapper: "!w-full !max-w-full lg:px-20" }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as={Link} to="/">
          <Logo size={20} />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index} isActive={item.path === currentPath}>
            <NavLink
              as={Link}
              aria-current="page"
              to={item.path}
              color={item.path !== currentPath ? "foreground" : undefined}
            >
              {item.label}
            </NavLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {!isAuthenticated ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <NavLink as={Link} to="/auth/sign-in">
                Sign In
              </NavLink>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                color="primary"
                to="/auth/sign-up"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <ProfileToggle
              firstname={user?.first_name as string}
              lastname={user?.last_name as string}
              email={user?.email as string}
            />
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarItem isActive={item.path === currentPath} key={index}>
            <NavLink
              className="w-full"
              color={item.path !== currentPath ? "foreground" : "warning"}
              as={Link}
              to={item.path}
              size="lg"
            >
              {item.label}
            </NavLink>
          </NavbarItem>
        ))}
        <NavbarMenuItem>
          <div className="flex justify-center">
            <NavLink
              className="w-full flex justify-center"
              color="warning"
              as={Link}
              to="/auth/sign-in"
            >
              Sign In
            </NavLink>
            <Button
              className="w-full"
              as={Link}
              color="warning"
              to="/auth/sign-up"
              variant="flat"
            >
              Sign Up
            </Button>
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Nav>
  );
}
