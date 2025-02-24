import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Divider } from "@heroui/react";
import { Logo } from "../../components/navigation/(main)/Navbar";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Carousel from "../../components/ui/Carousel";
import { useAuth } from "../../hooks/useAuth";
import { signIn } from "../../utils/api/auth";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function SignInPage() {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setDisabled] = useState(true);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const checkValues = () => {
    const values = watch();

    if (values.email && values.password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const onSubmit = async (Formdata: FormData) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(Formdata).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const { data } = await signIn(formData);
      console.log(data);
      const { access, refresh, ...userDetails } = data;
      Cookies.set("token", JSON.stringify({ access, refresh }));
      Cookies.set("user", JSON.stringify({ ...userDetails }));
      reset();
      dispatch({ type: "SIGN_IN", payload: { ...userDetails } });
      toast.success("Logged in sucessfully");
      navigate("/member/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.detail || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 gap-5 mx-auto w-full place-items-center">
      <Carousel
        showArrows={false}
        autoPlay
        className="hidden lg:block h-full"
      >
        <img
          src="https://img.freepik.com/free-photo/team-volunteers-stacking-hands_53876-30767.jpg"
          alt="Slide 1"
          className="w-full h-full object-cover bg-red-400"
        />
        <img
          src="/vite.svg"
          alt="Slide 2"
          className="w-full h-full object-cover bg-blue-400"
        />
        <img
          src="https://img.freepik.com/free-vector/line-style-volunteer-group-raising-hand-up-with-heart-vector_1017-48262.jpg"
          alt="Slide 3"
          className="w-full h-full object-cover bg-yellow-400"
        />
      </Carousel>
      <div className="w-full h-full px-5 mx-auto flex flex-col justify-center items-center py-5">
        <Link to="/" className="block mb-10">
          <Logo size={45} />
        </Link>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-6">
          <h1 className="w-full text-2xl font-extrabold text-center mb-6">
            Sign In to Your Account
          </h1>
          <p className="tex mb-8 text-gray-600 dark:text-gray-400">
            Enter your email and password to access your account. If you don't
            have an account, you can create one by clicking the link below.
          </p>
          <Input
            isClearable
            isRequired
            onValueChange={checkValues}
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
            isRequired
            onValueChange={checkValues}
            className="mb-4"
            {...register("password")}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
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
          <Button
            fullWidth
            // isDisabled={btnDisabled}
            isLoading={loading}
            size="lg"
            type="submit"
            className="mb-4 text-black"
          >
            SIgn In
          </Button>
          <Divider className="!bg-foreground/20" />
          <div className="flex w-full justify-center items-center">
            <p className="text-md text-center">
              Dont have an account with us?{" "}
              <Link
                className="text-yellow-400 hover:underline"
                to="/auth/sign-up"
              >
                Create an account
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
