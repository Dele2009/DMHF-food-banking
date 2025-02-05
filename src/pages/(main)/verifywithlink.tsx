import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "@heroui/react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import { FaCheckCircle, FaTimesCircle, FaRedo } from "react-icons/fa";
import { maskMail } from "../../utils/app/text";
import { axios } from "../../config/axios";

export default function VerifyWithLinkPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(""); // loading, success, error, expired
  const [userEmail, setUserEmail] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const verifyToken = async () => {
      setStatus("loading");
      try {
        const response = await axios.get(
          "/auth/verify-token/",
          {
            params: {
              token,
            },
          }
        );
        if (response.data.success) {
          setStatus("success");
          setUserEmail(response.data.message);
        } else {
          setStatus("expired");
        }

        if (response.data.success) {
          setStatus("success");
          setUserEmail(response.data.message);
        } else {
          setStatus("expired");
        }
      } catch (error) {
        console.error(error)
        //    if (retry < 1) {
        //      setRetry(retry + 1);
        //      verifyToken();
        //    } else {
        setStatus("error");
        //    }
      }
    };
    verifyToken();
  }, [token, retry]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-800 dark:text-gray-100 p-6">
      <Card className="w-full max-w-md text-center p-6 shadow-lg">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Spinner size="lg" />
            <p className="mt-4 text-lg">Verifying your account...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <FaCheckCircle className="text-green-500 text-5xl mb-4" />
            <h2 className="text-2xl font-semibold">Verification Successful</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Your account ({maskMail(userEmail)}) has been verified.
            </p>
            <Button className="mt-6" onPress={() => navigate("/auth/sign-in")}>
              Go to Login
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <FaTimesCircle className="text-red-500 text-5xl mb-4" />
            <h2 className="text-2xl font-semibold">Verification Failed</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              An error occurred while verifying your account.
            </p>
            <Button
              className="mt-6"
              onPress={() => setRetry((prev) => prev + 1)}
            >
              Retry
            </Button>
          </div>
        )}

        {status === "expired" && (
          <div className="flex flex-col items-center">
            <FaRedo className="text-yellow-500 text-5xl mb-4" />
            <h2 className="text-2xl font-semibold">Token Expired</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Your verification link has expired. Please request a new one.
            </p>
            <Button className="mt-6" onPress={() => axios.post("/auth/")}>
              Resend Verification Email
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
