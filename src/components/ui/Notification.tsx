import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Tooltip,
} from "@heroui/react";
import { BiSolidMessage, BiBell, BiUserPlus } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";

import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaExclamationCircle,
  FaHeart,
} from "react-icons/fa";

const sampleNotifications = [
  {
    id: 1,
    type: "info",
    message: "New message from Lana Byrd.",
    details: "Hey, what's up? All set for the presentation?",
    time: "a few moments ago",
  },
  {
    id: 2,
    type: "success",
    message: "Jese leos started following you.",
    details: "You have a new follower!",
    time: "10 minutes ago",
  },
  {
    id: 3,
    type: "warning",
    message: "Bonnie Green is requesting to upgrade the Flowbite Plan.",
    details: "Approve or decline the request.",
    time: "32 minutes ago",
  },
  {
    id: 4,
    type: "danger",
    message: "Joseph Mcfall and 141 others love your story.",
    details: "See it and view more stories.",
    time: "44 minutes ago",
  },
];

type Notification = (typeof sampleNotifications)[0];
/**{
    id: number;
    type: string;
    message: string;
    details: string;
    time: string;
} */
const NotificationDropdown = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpenNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    onOpen();
    deleteNotification(notification.id);
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const iconTypes: Record<Notification["type"], JSX.Element> = {
    info: <FaInfoCircle className="text-blue-500" size={30} />,
    success: <FaCheckCircle className="text-green-500" size={30} />,
    warning: <FaExclamationTriangle className="text-yellow-500" size={30} />,
    danger: <FaExclamationCircle className="text-red-500" size={30} />,
  };

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div className="transition-background hover:bg-[#1e1e1e] relative rounded-full p-2 cursor-pointer">
            <BiBell className="text-yellow-500" size={35} />
            <div className="absolute top-0 right-1 scale-80">
              <Chip radius="md" color="danger" size="sm">
                <span className="font-bold">{notifications.length}</span>
              </Chip>
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Notifications"
          className="w-full  md:w-[420px] p-2 shadow-lg"
        >
          <>
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <>
                  <DropdownItem
                    key={notif.id}
                    onPress={() => handleOpenNotification(notif)}
                  >
                    <div className="flex items-center justify-start gap-3 p-1">
                      {iconTypes[notif.type]}
                      <div>
                        <p className="font-medium">{notif.message}</p>
                        <small className="text-gray-500">{notif.time}</small>
                      </div>
                    </div>
                  </DropdownItem>
                  {index + 1 !== notifications.length && (
                    <DropdownItem key={index * 5}>
                      <Divider />
                    </DropdownItem>
                  )}
                </>
              ))
            ) : (
              <DropdownItem key="">No new notifications</DropdownItem>
            )}
          </>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Notification Details</ModalHeader>
              <ModalBody>
                <div className="w-fit m-auto">
                  {iconTypes[selectedNotification?.type as string]}
                </div>
                <p className="mt-2 font-semibold">
                  {selectedNotification?.message}
                </p>
                <p className="mt-1 text-gray-600">
                  {selectedNotification?.details}
                </p>
                <small className="text-gray-500">
                  {selectedNotification?.time}
                </small>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotificationDropdown;
