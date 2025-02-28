import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Divider, addToast } from "@heroui/react";
import { Logo } from "../../components/navigation/(main)/Navbar";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaPhoneAlt,
  FaUserCircle,
  FaUserTag,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUp } from "../../utils/api/auth";
import { useAuth } from "../../hooks/useAuth";
import Carousel from "../../components/ui/Carousel";

const schema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, "Name must be at least 2 characters long")
    .required("First name is required"),
  last_name: yup
    .string()
    .min(2, "Name must be at least 2 characters long")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: yup
    .string()
    .min(10, "Phone number must be at least 11 characters long")
    .required("Phone number is required"),
  nin_number: yup
    .string()
    .min(11, "NIN number must be 11 characters long")
    .required("NIN number is required"),
  password: yup.string().required("Password is required"),
  c_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type SignInData = yup.InferType<typeof schema>;

export default function SignUpPage() {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isVerifyNin, setIsVerifyNin] = useState(false);
  const [ninValid, setNinValid] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
    getValues,
  } = useForm<SignInData>({
    resolver: yupResolver(schema),
  });

  const validatePassWord = (value: string) => {
    setPasswordErrors([]);
    if (value.length < 4) {
      setPasswordErrors((prev) => [
        ...prev,
        "Password must be 4 characters or more.",
      ]);
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      setPasswordErrors((prev) => [
        ...prev,
        "Password must include at least 1 upper case letter",
      ]);
    }
    if ((value.match(/[^a-z0-9]/gi) || []).length < 1) {
      setPasswordErrors((prev) => [
        ...prev,
        "Password must include at least 1 symbol.",
      ]);
    }
  };

  const handleNinValidation = async () => {
    setIsVerifyNin(true);
    try {
      // YW61FAEJSAJDG4NMTESHYJSG3PENY28T
      // const username = "MK_TEST_072244Y072";
      // const password = "YW61FAEJSAJDG4NMTESHYJSG3PENY28T";
      // const encodedCredentials = btoa(`${username}:${password}`);

      // const {
      //   data: { responseBody },
      // } = await axios.post(
      //   "https://sandbox.monnify.com/api/v1/auth/login",
      //   {}, // Request body (if any)
      //   {
      //     headers: {
      //       Authorization: `Basic ${encodedCredentials}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // const { accessToken } = responseBody;
      // console.log(accessToken);
      // const errorField
      const { c_password, password, ...otherFields } = getValues();
      Object.entries(otherFields).forEach(([key, value]) => {
        if (!value) {
          setError(
            key as keyof SignInData,
            { message: "This field is required for verification" },
            { shouldFocus: true }
          );
        } else {
          clearErrors(key as keyof SignInData);
        }
      });

      if (Array.from(Object.keys(errors)).length > 0) return;

      const {data} = await axios.post("/api/auth/verify-nin", {
        nin: otherFields.nin_number,
      });
      // toast.success("NIN is valid");
      addToast({
        description: data.message || "NIN is invalid",
        color: "danger",
      });
      console.log(data);
    } catch (error: AxiosError | any) {
      // toast.error(error.response.data.message || "NIN is invalid");
      addToast({
        description: error.response.data.message || error.message,
        color: "danger",
      });
      console.error(error);
    } finally {
      setIsVerifyNin(false);
    }
  };

  const onSubmit = async (Formdata: SignInData) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(Formdata).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const response = await signUp(formData);
      dispatch({ type: "SET_AUTH_EMAIL", payload: Formdata.email });
      reset();
      // toast.success(response.data.message);
      
      navigate("/auth/verify");
    } catch (error: any) {
      console.error(error);
      // toast.error(error.response?.data?.message || error.message);
      addToast({
        description: error.response.data.message || error.message,
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden h-screen grid grid-cols-1 lg:grid-cols-2 w-full place-items-center">
      <Carousel showArrows={false} autoPlay className="hidden lg:block h-full">
        <img
          src="https://img.freepik.com/free-photo/team-volunteers-stacking-hands_53876-30767.jpg"
          alt="Slide 1"
          className="w-full h-full object-cover"
        />
        <img
          src="/vite.svg"
          alt="Slide 2"
          className="w-full h-full object-cover bg-blue-400"
        />
        <img
          src="https://img.freepik.com/free-vector/line-style-volunteer-group-raising-hand-up-with-heart-vector_1017-48262.jpg"
          alt="Slide 3"
          className="w-full h-full object-cover"
        />
      </Carousel>
      <div className="w-full h-screen overflow-y-auto mx-auto flex flex-col justify-center items-center  px-10">
        <Link to="/" className="block mt-56 mb-10">
          <Logo size={45} />
        </Link>
        <h1 className="text-2xl font-extrabold text-center mb-6">
          Request Help from Divine Mandate Humanitarian Foundation
        </h1>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-400">
          Fill out the form below to request food or assistance. Our team will
          review your application and get back to you shortly.
        </p>
        <Form onSubmit={handleSubmit(onSubmit)} className="w-full p-6">
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Input
              isClearable
              isRequired
              fullWidth
              {...register("first_name")}
              errorMessage={errors.first_name?.message}
              isInvalid={!!errors.first_name}
              label="First Name"
              labelPlacement="inside"
              startContent={
                <FaUserCircle className="text-yellow-500 text-xl" />
              }
            />
            <Input
              isClearable
              isRequired
              fullWidth
              {...register("last_name")}
              errorMessage={errors.last_name?.message}
              isInvalid={!!errors.last_name}
              label="Last Name"
              labelPlacement="inside"
              startContent={
                <FaUserCircle className="text-yellow-500 text-xl" />
              }
            />
          </div>
          <Input
            isClearable
            isRequired
            className="mb-4"
            {...register("email")}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            label="Email Address"
            labelPlacement="inside"
            type="email"
            startContent={<FaEnvelope className="text-yellow-500 text-xl" />}
          />
          <Input
            isClearable
            isRequired
            className="mb-4"
            {...register("phone_number", { valueAsNumber: true })}
            errorMessage={errors.phone_number?.message}
            isInvalid={!!errors.phone_number}
            label="Phone No"
            labelPlacement="inside"
            startContent={<FaPhoneAlt className="text-yellow-500 text-xl" />}
          />
          <Input
            isRequired
            className="mb-4"
            {...register("nin_number")}
            errorMessage={errors.nin_number?.message}
            isInvalid={!!errors.nin_number}
            label="National ID Number (NIN)"
            labelPlacement="inside"
            startContent={<FaUserTag className="text-yellow-500 text-xl" />}
            endContent={
              <div className="flex items-center">
                <Button
                  type="button"
                  onPress={handleNinValidation}
                  isDisabled={isVerifyNin}
                  isLoading={isVerifyNin}
                  size="sm"
                  color="warning"
                  className="font-semibold text-black"
                >
                  Verify
                </Button>
              </div>
            }
          />
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Input
              isRequired
              onInput={(e) =>
                validatePassWord((e.target as HTMLInputElement).value)
              }
              {...register("password")}
              errorMessage={() => (
                <ul>
                  {errors.password && <li>{errors.password.message}</li>}
                  {passwordErrors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              )}
              isInvalid={passwordErrors.length > 0 || !!errors.password}
              label="Password"
              type={isVisible ? "text" : "password"}
              labelPlacement="inside"
              startContent={<FaLock className="text-yellow-500 text-xl" />}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEyeSlash className="text-2xl text-foreground pointer-events-none" />
                  ) : (
                    <FaEye className="text-2xl text-foreground pointer-events-none" />
                  )}
                </button>
              }
            />
            <Input
              isRequired
              {...register("c_password")}
              errorMessage={errors.c_password?.message}
              isInvalid={!!errors.c_password}
              label="Confirm Password"
              type={isConfirmVisible ? "text" : "password"}
              labelPlacement="inside"
              startContent={<FaLock className="text-yellow-500 text-xl" />}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setIsConfirmVisible((prev) => !prev)}
                >
                  {isConfirmVisible ? (
                    <FaEyeSlash className="text-2xl text-foreground pointer-events-none" />
                  ) : (
                    <FaEye className="text-2xl text-foreground pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>
          <Button
            fullWidth
            isLoading={loading}
            size="lg"
            type="submit"
            className="mb-4 text-black"
          >
            Submit Request
          </Button>
          <Divider className="!bg-foreground/20" />
          <div className="flex w-full justify-center items-center pb-5">
            <p className="text-md text-center">
              Already have an account?{" "}
              <Link
                className="text-yellow-400 hover:underline"
                to="/auth/sign-in"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
