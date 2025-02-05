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
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setDisabled] = useState(true);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    console.log(data);
  };

  return (
    <div className="min-h-screen w-full max-w-lg  mx-auto flex flex-col justify-center items-center py-16">
      <Link to="/" className="block mb-10">
        <Logo size={45} />
      </Link>
      <h1 className="text-2xl font-extrabold text-center mb-6">
        Sign In to Your Account
      </h1>
      <p className="text-center mb-8 text-gray-600 dark:text-gray-400">
        Enter your email and password to access your account. If you don't have
        an account, you can create one by clicking the link below.
      </p>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white/10 dark:backdrop-filter backdrop-blur-lg p-6 shadow-lg rounded-md"
      >
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
  );
}
