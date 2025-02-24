import React from "react";
import { Card, Button, Alert, Progress, Avatar } from "@heroui/react";
import {
  FaUserFriends,
  FaClock,
  FaPlusCircle,
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
    const { user } = useAuth();

  const assistanceRequested = true; // Simulated state, replace with actual logic
  const daysRemaining = 89; // Simulated countdown, replace with actual logic
  const progressPercentage = ((90 - daysRemaining) / 90) * 100; // Simulated progress

  return (
    <div className="p-6 space-y-6">
      {/* User Welcome Section */}
      <div className="flex items-center space-x-4 bg-[#1e1e1e] p-6 rounded-lg shadow-md">
        <Avatar  src="/user-avatar.jpg" size="lg" alt="User Avatar" />
        <div>
          <h2 className="text-xl font-semibold">Welcome Back, {user?.first_name} {user?.last_name}</h2>
          <p className="text-gray-400">Here's an overview of your requests.</p>
        </div>
      </div>

      {/* Assistance Status Alert */}
      {assistanceRequested && (
        <Alert color="warning" className="mb-6">
          You have an active
          assistance request. You can request again in {daysRemaining} days.
        </Alert>
      )}

      {/* Request Progress */}
      <Card className="p-6 bg-[#1e1e1e] shadow-md">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaClock /> Time Until Next Request
        </h2>
        <p className="text-gray-400 mb-2">
          You can request again once the countdown reaches zero.
        </p>
        <Progress value={progressPercentage} color="warning" />
        <p className="text-sm text-gray-400 mt-2">
          {daysRemaining} days remaining
        </p>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-[#DD9520]/30 hover:bg-[#DD9520]/50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaUserFriends /> Total Requests
          </h2>
          <p className="text-2xl font-bold">12</p>
        </Card>
        <Card className="p-6 bg-[#DD9520]/30 hover:bg-[#DD9520]/50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaCheckCircle /> Approved Requests
          </h2>
          <p className="text-2xl font-bold">5</p>
        </Card>
        <Card className="p-6 bg-[#DD9520]/30 hover:bg-[#DD9520]/50">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaTimesCircle /> Rejected Requests
          </h2>
          <p className="text-2xl font-bold">2</p>
        </Card>
      </div>

      {/* Request Assistance Section */}
      <Card className="p-6 bg-[#1e1e1e] shadow-md text-center">
        {!assistanceRequested ? (
          <>
            <h2 className="text-lg font-semibold">Need Assistance?</h2>
            <p className="text-gray-400 mb-4">
              Submit a new request and our team will review it.
            </p>
            <Button size="lg" color="warning">
              Request Assistance
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold">Request Pending</h2>
            <p className="text-gray-400">
              You can submit a new request once the waiting period is over.
            </p>
          </>
        )}
      </Card>
    </div>
  );
}
