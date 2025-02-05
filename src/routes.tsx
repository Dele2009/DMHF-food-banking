import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/(main)/home";
import AboutUsPage from "./pages/(main)/about";
import ActionPage from "./pages/(main)/action";
import PlanLegacyGiftsPage from "./pages/(main)/legacygifts";
import Loader from "./pages/(main)/loader";
import SignUpPage from "./pages/(main)/signup";
import SignInPage from "./pages/(main)/signin";
import VerifyOtpPage from "./pages/(main)/otpverify";
import VerifyWithLinkPage from "./pages/(main)/verifywithlink";

import MainLayout from "./layouts/(main)";
import AuthLayout from "./layouts/(main)/authlayout";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="take-action" element={<ActionPage />} />
        <Route path="legacy-gifts" element={<PlanLegacyGiftsPage />} />
        <Route path="loading" element={<Loader />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="verify" element={<VerifyOtpPage />} />
        <Route path="verify/:token" element={<VerifyWithLinkPage />} />
      </Route>
    </Routes>
  );
};
