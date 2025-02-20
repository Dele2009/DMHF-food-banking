import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Card, Button, Avatar, Alert } from "@heroui/react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaLock,
  FaCheckCircle,
  FaCamera,
} from "react-icons/fa";
import Input from "../../components/ui/Input";

const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
const MAX_WIDTH = 1200; // Maximum allowed width (px)
const MAX_HEIGHT = 630; // Maximum allowed height (px)

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
    .min(10, "Phone number must be at least 10 characters long")
    .required("Phone number is required"),
  nin_number: yup
    .string()
    .min(11, "NIN number must be 11 characters long")
    .required("NIN number is required"),

  avatar: yup
    .mixed()
    .test("required", "File is required", (value) => {
      return value && Array.isArray(value) && value.length > 0;
    })
    .test("fileSize", "File size is too large", (value) => {
      return (
        value && value instanceof FileList && value[0]?.size <= FILE_SIZE_LIMIT
      );
    })
    .test("fileType", "Unsupported file format", (value) => {
      return value && SUPPORTED_FORMATS.includes((value as FileList)[0]?.type);
    }),
  // .test(
  //   "fileDimensions",
  //   "Image must be within 500x500 pixels",
  //   async (value) => {
  //     if (!value || (value as FileList).length === 0) return false;
  //     const file = (value as FileList)[0];

  //     // Read the image and get dimensions
  //     const dimensions = await getImageDimensions(file);
  //     console.log(dimensions);
  //     return (
  //       dimensions.width === MAX_WIDTH && dimensions.height === MAX_HEIGHT
  //     );
  //   }
  // ),
});

const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectURL = URL.createObjectURL(file);

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(objectURL);
    };

    img.onerror = () => reject(new Error("Failed to load image"));

    img.src = objectURL;
  });
};

const passwordSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  c_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type PersonalDetaisType = yup.InferType<typeof schema>;
type PasswordsType = yup.InferType<typeof passwordSchema>;

export default function ProfilePage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    register: passwordRegister,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const [avatar, setAvatar] = useState("");

  const selectedFile = watch("avatar") as FileList;

  // Update file preview
  useEffect(() => {
    (async () => {
      // reset avatar error by default

      if (selectedFile && selectedFile.length > 0) {
        const file = selectedFile[0];
        const dimensions = await getImageDimensions(file);
        console.log(dimensions);
        if (
          dimensions.width !== MAX_WIDTH &&
          dimensions.height !== MAX_HEIGHT
        ) {
          setError("avatar", {
            type: "fileDimensions",
            message: "Image must be within 500x500 pixels",
          });
          setValue("avatar", []);
          return;
        }
        clearErrors("avatar");
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    })();
  }, [selectedFile]);

  const onSubmit = (data: PersonalDetaisType) => {
    console.log("Updated User Details:", data);
  };
  const onPasswordSubmit = (data: PasswordsType) => {
    console.log("Updated User Details:", data);
  };

  return (
    <div className="p-6 max-w-5xl  mx-auto">
      <Card radius="sm" className="p-6 bg-[#1e1e1e] border-t-4 border-yellow-500 shadow-md mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-2xl text-yellow-500 font-bold">
            Personal Details
          </h1>
          <Alert
            color="danger"
            variant="faded"
            title={errors.avatar?.message}
            isVisible={!!errors.avatar}
            isClosable
            onClose={() => clearErrors("avatar")}
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative w-full mx-auto col-span-2">
              <Avatar
                src={avatar}
                size="lg"
                radius="md"
                alt="User Avatar"
                ignoreFallback={!!avatar}
                fallback={<FaUser size={70} />}
                className="w-full h-full max-h-full mx-auto object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-2 right-2 bg- p-3 rounded-full cursor-pointer"
              >
                <FaCamera className="text-yellow-500" size={20} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("avatar")}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 col-span-3">
              <Input
                label="First Name"
                startContent={<FaUser />}
                {...register("first_name")}
                errorMessage={errors.first_name?.message}
              />
              <Input
                label="Last Name"
                startContent={<FaUser />}
                {...register("last_name")}
                errorMessage={errors.last_name?.message}
              />
              <Input
                label="Email Address"
                startContent={<FaEnvelope />}
                {...register("email")}
                errorMessage={errors.email?.message}
              />
            </div>
          </div>
          <Input
            label="Phone Number"
            startContent={<FaPhone />}
            {...register("phone_number")}
            errorMessage={errors.phone_number?.message}
          />
          <Input
            label="NIN Number"
            startContent={<FaIdCard />}
            {...register("nin_number")}
            errorMessage={errors.nin_number?.message}
          />
          <Button fullWidth size="lg" color="warning" type="submit">
            Update Profile
          </Button>
        </form>
      </Card>
      <Card radius="sm" className="p-6 border-t-4 border-yellow-500 bg-[#1e1e1e] shadow-md mt-10">
        <form
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          className="space-y-4"
        >
          <h1 className="text-2xl text-yellow-500 font-bold">
            Change Password
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="New Password"
              type="password"
              startContent={<FaLock />}
              {...passwordRegister("password")}
              errorMessage={passwordErrors.password?.message}
            />
            <Input
              label="Confirm Password"
              type="password"
              startContent={<FaCheckCircle />}
              {...passwordRegister("c_password")}
              errorMessage={passwordErrors.c_password?.message}
            />
          </div>
          <Button fullWidth size="lg" color="warning" type="submit">
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  );
}
