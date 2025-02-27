import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  Tooltip,
  InputOtp,
  UseDisclosureProps,
  Button,
} from "@heroui/react";
import { resendOtp, verifyOtp } from "../../utils/api/auth";
import { AxiosError } from "axios";
import { toast, ToastOptions } from "react-toastify";
import { maskMail } from "../../utils/app/text";
import { createCountdown } from "../../utils/app/time";

interface OtpModalProps {
  authDetails: Record<string, string>;
  isOpen: UseDisclosureProps["isOpen"];
  onOpenChange: UseDisclosureProps["onChange"];
}

export default function OtpModal({
  authDetails,
  isOpen,
  onOpenChange,
}: OtpModalProps) {
  const [otp, setOtp] = useState("");
  const [waitTime, setWaitTime] = useState(120);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(waitTime);
  const [countDown, setCountDown] = useState("");

  const maskedEmail = maskMail(authDetails.email);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return --prev;
      });
      const timeString = createCountdown(seconds);
      setCountDown(timeString);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const handleResend = async () => {
    try {
      const { data } = await resendOtp({
        email: authDetails.email as string,
        stateMessages: {
          pending: "Resending OTP...",
          success: "Email sent successfully",
          error: "Failed to resend OTP",
        },
      });
      setWaitTime((prev)=>prev + 120);
      console.log(data.message);
    } catch (err: AxiosError | any) {
      console.log(err);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const messageSettings: ToastOptions = {
     position: "top-center"
    }
    if (!authDetails.email) {
      toast.error("Email address is required", messageSettings);
      return;
    }
    setLoading(true);
    try {
      const verifydata = {
        ...authDetails,
        otp,
      };
      console.log(verifydata);
       const formData = new FormData();
       Object.entries(verifydata).forEach(([key, value]) => {
         formData.append(key, value);
       });
       const { data } = await verifyOtp(formData);
       console.log(data);
       toast.success(data.message || "Otp verified successfully", messageSettings);
       setOtp("");
    } catch (err: AxiosError | any) {
      console.error(err);
      toast.error(err.response?.data.message || err.message, messageSettings);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isDismissable={false}
      size="lg"
      placement="center"
      onOpenChange={onOpenChange}
      isOpen={isOpen}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>
              <form onSubmit={onSubmit} className="w-full py-4">
                <p className="text-center text-sm md:text-md mb-8 text-gray-600 dark:text-gray-400">
                  We just sent an authentication code via email to{" "}
                  <em>{maskedEmail}</em>, Provide it below to proceed
                </p>
                <InputOtp
                  fullWidth
                  variant="bordered"
                  size="lg"
                  classNames={{
                    segmentWrapper:
                      "!flex justify-between items-center !w-full",
                    segment:
                      "!w-10 !h-10 sm:!w-14 sm:!h-14 min-w-8 min-h-8 border-yellow-500",
                  }}
                  value={otp}
                  onValueChange={(value) => setOtp(value)}
                  validate={(value) => {
                    if (!value) {
                      return "Otp is required";
                    }
                    if (value.length < 7) {
                      return "Otp is incomplete or invalid";
                    }
                    return true;
                  }}
                  length={7}
                />
                <div className="flex justify-between text-xs sm:text-sm md:text-md items-center w-full my-4">
                  <p>
                    Didn't recieve code?{" "}
                    <Tooltip
                      showArrow
                      content={
                        seconds > 0
                          ? "Can't regenerate code at the moment"
                          : "Recieve new code"
                      }
                      classNames={{
                        base: "before:bg-neutral-400 dark:before:bg-white",
                        content:
                          "py-2 px-4 shadow-xl text-black bg-gradient-to-br from-white to-neutral-400",
                      }}
                    >
                      <button
                        className="bg-transparent border-none text-yellow-400 disabled:text-yellow-100 underline"
                        onClick={handleResend}
                        disabled={seconds > 0}
                        type="button"
                      >
                        {seconds > 0
                          ? `Resend otp in ${countDown}`
                          : "Resend Otp"}
                      </button>
                    </Tooltip>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <Button
                    //    fullWidth
                    isLoading={loading}
                    size="lg"
                    type="button"
                    color="default"
                    onPress={onClose}
                    className="md:col-span-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    //    fullWidth
                    isLoading={loading}
                    size="lg"
                    type="submit"
                    color="warning"
                    className="md:col-span-3"
                  >
                    Verify
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
