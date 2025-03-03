import {
  Avatar,
  AvatarProps,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownProps,
  DropdownTrigger,
} from "@heroui/react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface ProfileToggleProps {
  avatarClassName?: string;
  dropDownProps?: Omit<DropdownProps, "children">;
}
const ProfileToggle = ({
  avatarClassName,
  dropDownProps,
}: ProfileToggleProps) => {
  const { openLogoutModal, user } = useAuth();
  return (
    <Dropdown {...dropDownProps} placement="bottom-end">
      <DropdownTrigger>
        <div className="flex cursor-pointer scale-85 rounded-full md:border-2 p-1.5 md:border-yellow-500 gap-3 justify-center items-center md:max-w-[150px]">
          <div className="w-auto md:w-[40px]">
            <Avatar
              isBordered
              as="div"
              className={`transition-transform font-bold block ${avatarClassName}`}
              color="primary"
              // name={`${firstname[0].toUpperCase()} ${lastname[0].toUpperCase()}`}
              size="md"
              src={user?.profile_pic || undefined}
            />
          </div>
          <span className="hidden md:inline-block md:truncate">
            Hi, {user?.first_name} {user?.last_name}
          </span>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="divider-1">
          <Divider />
        </DropdownItem>
        <DropdownItem key="dashboard">
          <Link to="/member/dashboard">My Dashboard</Link>
        </DropdownItem>
        <DropdownItem key="team_settings">
          <Link to="/member/settings/profile">Profile Settings</Link>
        </DropdownItem>
        {/* <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem> */}
        <DropdownItem key="help">
          <Link to="#">Help & Feedback</Link>
        </DropdownItem>
        <DropdownItem key="divider-2">
          <Divider />
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          <button
            onClick={openLogoutModal}
            className="w-full flex items-center px-4 py-2 text-white bg-[#ff0000] rounded-md"
          >
            <FiLogOut className="mr-3" size={20} /> Logout
          </button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileToggle;
