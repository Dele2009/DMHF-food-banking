import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Chip,
  Divider,
} from "@heroui/react";
import { FaEnvelopeOpenText, FaUserCircle } from "react-icons/fa";

const messages = [
  {
    id: 1,
    sender: "Admin",
    subject: "Account Verification",
    preview: "Your account has been verified successfully.",
    message:
      "Hello, your account has been successfully verified. You can now access all features. ",
    time: "1h ago",
  },
  {
    id: 2,
    sender: "Support",
    subject: "Pending Help Request",
    preview: "Your help request is being reviewed.",
    message:
      "Dear user, your help request is currently under review. We will update you soon.",
    time: "3h ago",
  },
  {
    id: 3,
    sender: "Organization",
    subject: "Upcoming Event",
    preview: "Join us for an exclusive event this weekend.",
    message: "We are hosting an exclusive event for our users. Don't miss out!",
    time: "Yesterday",
  },
  {
    id: 4,
    sender: "Organization",
    subject: "Upcoming Event",
    preview: "Join us for an exclusive event this weekend.",
    message: "We are hosting an exclusive event for our users. Don't miss out!",
    time: "Yesterday",
  },
  {
    id: 8,
    sender: "Organization",
    subject: "Upcoming Event",
    preview: "Join us for an exclusive event this weekend.",
    message: "We are hosting an exclusive event for our users. Don't miss out!",
    time: "Yesterday",
  },
  {
    id: 3,
    sender: "Organization",
    subject: "Upcoming Event",
    preview: "Join us for an exclusive event this weekend.",
    message: "We are hosting an exclusive event for our users. Don't miss out!",
    time: "Yesterday",
  },
];

export default function UserMessages() {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);

  return (
    <div className="flex flex-nowrap h-full p-1">
      {/* Messages List */}
      <div className="w-3/12 overflow-auto max-h-full shadow-lg border-r border-white/20">
        <p className="text-lg text-white font-semibold">Messages</p>
        <div className="space-y-2">
          {messages.map((msg, index) => (
            <>
              <div
                key={index}
                className={`p-2 rounded-xl cursor-pointer flex items-center gap-3 transition-all hover:bg-warning mr-3 ${
                  selectedMessage.id === msg.id ? "bg-warning" : "bg-warning-50"
                }`}
                onClick={() => setSelectedMessage(msg)}
              >
                <Avatar
                  icon={<FaUserCircle />}
                  className="bg-gray-500 text-white"
                />
                <div>
                  <h3 className="font-semibold">{msg.sender}</h3>
                  <p className="text-sm text-gray-600">{msg.subject}</p>
                  <small className="text-xs text-gray-400">{msg.time}</small>
                </div>
              </div>
              {index !== messages.length - 1 && <Divider />}
            </>
          ))}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 max-h-full shadow-lg pt-10 pl-3">
        <div className="flex flex-col justify-between">
          <h2 className="text-lg font-semibold">{selectedMessage.subject}</h2>
          <Chip color="warning">{selectedMessage.sender}</Chip>
        </div>
        <div className="h-full w-full">
          <p className="text-gray-700 max-w-full flex flex-nowrap border overflow-auto h-full max-h-[60%] border-warning rounded-xl mt-4 p-3 break-words">
               {selectedMessage.message}
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <Button color="danger">Delete</Button>
            <Button color="primary" startContent={<FaEnvelopeOpenText />}>
              Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
