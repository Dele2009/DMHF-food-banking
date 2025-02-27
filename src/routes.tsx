import { Routes, Route, Navigate } from "react-router-dom";

// Main Pages
import HomePage from "./pages/(main)/home";
import AboutUsPage from "./pages/(main)/about";
import ActionPage from "./pages/(main)/action";
import PlanLegacyGiftsPage from "./pages/(main)/legacygifts";
import Loader from "./pages/(main)/loader";
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

// Layouts
import MainLayout from "./layouts/(main)";
import AuthLayout from "./layouts/(main)/authlayout";
import MemberLayout from "./layouts/(user)/MemberLayout";

import ProtectedRoute from "./Protected";
import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

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
        <Spinner color="warning" size="lg" classNames={{base: "scale-[1.5]"}} />
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
        <Route path="loading" element={<Loader />} />
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
          <ProtectedRoute>
            <MemberLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/member/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="requests/new" element={<RequestHelpPage />} />
        <Route path="requests/all" element={<ViewRequestsPage />} />
        <Route path="settings/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};
