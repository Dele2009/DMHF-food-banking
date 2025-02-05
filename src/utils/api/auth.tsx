import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axios } from "../../config/axios";

export const signIn = async (data: FormData) => {
  try {
    const response = await axios.post("/users", data);
    console.log(response);
    return response;
  } catch (err: AxiosError | any) {
    console.log(err);
    throw err;
  }
};

export const signUp = async (data: FormData) => {
  try {
    const response = await axios.post("/auth/users/", data);
    console.log(response);
    return response;
  } catch (err: AxiosError | any) {
    throw err;
  }
};

export const verifyOtp = async (data: FormData) => {
  try {
    const response = await axios.post("/auth/verify-otp/", data);
    console.log(response);
    return response;
  } catch (err: AxiosError | any) {
    throw err;
  }
};

export const resendOtp = async ({
  email,
  stateMessages,
}: {
  email: string;
  stateMessages: any;
}) => {
  const promise = axios.post("/auth/resend-otp", { email });
  toast.promise(
    promise,
    { ...stateMessages },
    {
      position: "top-center",
    }
  );
  try {
    const response = await promise;
    return response;
  } catch (err: AxiosError | any) {
    throw err;
  }
};
