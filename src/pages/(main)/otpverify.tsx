import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addToast, InputOtp, Tooltip } from "@heroui/react";
import { Logo } from "../../components/navigation/(main)/Navbar";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import Button from "../../components/ui/Button";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { verifyOtp, resendOtp } from "../../utils/api/auth";
import { maskMail } from "../../utils/app/text";
import { createCountdown } from "../../utils/app/time";
import { axios } from "../../config/axios";

const schema = yup.object().shape({
  email: yup.string().email("Invalid Details Provided"),
  otp: yup.string().required("OTP is required"),
});

type OtpData = yup.InferType<typeof schema>;

export default function VerifyOtpPage() {
  const { authEmail } = useAuth();
  const waitTime = 120;
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(waitTime);
  const [countDown, setCountDown] = useState("");
  const [maskedEmail,setMaskedEmail] = useState('')

  
  const navigate = useNavigate();
  useEffect(() => {
    if (!authEmail) {
      // toast.error();
      addToast({
        title: "Field Error",
        description: "Please sign up to verify your email",
        color: "danger",
      });
      navigate("/auth/sign-up");
    } else {
      setMaskedEmail(maskMail(authEmail as string))
    }
  }, [authEmail]);
  

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

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<OtpData>({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: "",
      email: authEmail as string | undefined,
    },
  });

  const handleResend = async () => {
    try {
      const { data } = await resendOtp({
        email: authEmail as string,
        stateMessages: {
          pending: "Resending OTP...",
          success: "Email sent successfully",
          error: "Failed to resend OTP",
        },
      });
      setSeconds(waitTime + 120);
      console.log(data.message);
    } catch (err: AxiosError | any) {
      console.log(err);
    }
  };

  const onSubmit = async (verifydata: OtpData) => {
    setLoading(true);
    if (errors.email) {
      // toast.error(errors.email.message);
      addToast({
        title: "Field Error",
        description: errors.email.message,
        color: "danger",
      });
      return;
    }
    try {
      const formData = new FormData();
      Object.entries(verifydata).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const { data } = await verifyOtp(formData);
      console.log(data);
      reset();
      navigate("/auth/sign-in");
      // toast.success(data.message);
      addToast({
        title: "OTP Status",
        description: data.message,
        color: "success",
      });
      
    } catch (err: AxiosError | any) {
      console.error(err);
      // toast.error(err.response?.data.message || err.message);
      addToast({
        title: "OTP Status",
        description: err.response?.data.message || err.message,
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full max-w-md mx-auto min-h-screen flex flex-col justify-center items-center py-16">
      <Link to="/" className="block mb-10">
        <Logo size={45} />
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white/10 dark:backdrop-filter backdrop-blur-lg p-6 shadow-lg rounded-md"
      >
        <p className="text-center text-sm md:text-md mb-8 text-gray-600 dark:text-gray-400">
          We just sent an authentication code via email to{" "}
          <em>{maskedEmail}</em>, Provide it below to proceed
        </p>
        <InputOtp
          fullWidth
          variant="bordered"
          size="lg"
          classNames={{
            segmentWrapper: "!flex justify-between items-center !w-full",
            segment: "dark:!text-white !w-14 !h-14 !min-w-8 !min-h-8",
          }}
          {...register("otp")}
          errorMessage={errors.otp?.message}
          isInvalid={!!errors.otp}
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
                Resend
              </button>
            </Tooltip>
          </p>
          <p className="font-semibold">{countDown}</p>
        </div>
        <Button
          fullWidth
          isLoading={loading}
          size="lg"
          type="submit"
          className="mb-4 text-black"
        >
          Verify
        </Button>
      </form>
    </div>
  );
}
