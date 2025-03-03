import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import {
  FaUsers as Users,
  FaFile as FileText,
  FaCheckCircle as CheckCircle,
  FaExclamationTriangle as AlertTriangle,
  FaUserShield as UserShield,
  //   FaCog as Settings,
} from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Stats Section */}
      <Card>
        <CardHeader>
          <p className="font-bold text-lg">Total Users</p>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <Users className="inline-block text-primary text-7xl" />
            <span className="inline-block text-2xl font-bold">1,245</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-bold text-lg">Total Admins</p>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <UserShield className="inline-block text-primary text-7xl" />
            <span className="inline-block text-2xl font-bold">15</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-bold text-lg">Total Help Requests</p>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <FileText className="inline-block text-primary text-7xl" />
            <span className="inline-block text-2xl font-bold">567</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-bold text-lg">Resolved Requests</p>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <CheckCircle className="inline-block text-green-500 text-7xl" />
            <span className="inline-block text-2xl font-bold">432</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <p className="font-bold text-lg">Pending Requests</p>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <AlertTriangle className="inline-block text-yellow-500 text-7xl" />
            <span className="inline-block text-2xl font-bold">135</span>
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <Card>
          <CardHeader>
            <p className="font-bold text-lg">Quick Actions</p>
          </CardHeader>
          <CardBody className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button color="primary">Add New Admin</Button>
            <Button color="secondary">View Users</Button>
            <Button color="success">Manage Requests</Button>
            <Button color="danger">Resolve Issues</Button>
            <Button color="warning">System Settings</Button>
            <Button color="default">View Reports</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
