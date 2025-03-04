import ProtectedRoute from "./Protected";
import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Main Pages
import HomePage from "./pages/(main)/home";
import AboutUsPage from "./pages/(main)/about";
import ActionPage from "./pages/(main)/action";
import PlanLegacyGiftsPage from "./pages/(main)/legacygifts";
// import Loader from "./pages/(main)/loader";
import SignUpPage from "./pages/(main)/signup";
import SignInPage from "./pages/(main)/signin";
import VerifyOtpPage from "./pages/(main)/otpverify";
import VerifyWithLinkPage from "./pages/(main)/verifywithlink";
import ContactPage from "./pages/(main)/contact";

// User Pages
import Dashboard from "./pages/(user)/dashboard";
import RequestHelpPage from "./pages/(user)/newRequest";
import ViewRequestsPage from "./pages/(user)/allRequests";
import ProfilePage from "./pages/(user)/profile";
import Contact_Help_RequestPage from "./pages/(user)/contact_help&feedback";
import UserMessages from "./pages/(user)/messages";

// Admin Pages
import PendingRequestsPage from "./pages/(admin)/pendingRequests";
import AllRequestsPage from "./pages/(admin)/allRequests";
import AdminDashboard from "./pages/(admin)/dashboard";
import AdminAuth from "./pages/(admin)/auth";

// Layouts
import MainLayout from "./layouts/(main)";
import AuthLayout from "./layouts/(main)/authlayout";
import MemberLayout from "./layouts/(user/admin)/MemberLayout";
import AdminLayout from "./layouts/(user/admin)/AdminLayout";



export const Router = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner
          color="warning"
          size="lg"
          classNames={{ base: "scale-[1.5]" }}
        />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="take-action" element={<ActionPage />} />
        <Route path="legacy-gifts" element={<PlanLegacyGiftsPage />} />
        <Route path="contact-us" element={<ContactPage />} />
        {/* <Route path="loading" element={<Loader />} /> */}
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="verify" element={<VerifyOtpPage />} />
        <Route path="verify/:token" element={<VerifyWithLinkPage />} />
      </Route>

      <Route
        path="/member"
        element={
          <ProtectedRoute type="user">
            <MemberLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/member/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="new-requests" element={<RequestHelpPage />} />
        <Route path="all-requests" element={<ViewRequestsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="help" element={<Contact_Help_RequestPage />} />
        <Route path="messages" element={<UserMessages />} />
      </Route>

      <Route path="/admin-panel" element={<Outlet />}>
        <Route path="auth" element={<AdminAuth />} />

        <Route
          path=""
          element={
            <ProtectedRoute type="admin">
             <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="requests/all" element={<AllRequestsPage />} />
          <Route path="requests/pending" element={<PendingRequestsPage />} />
          <Route path="settings/profile" element={<PendingRequestsPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
