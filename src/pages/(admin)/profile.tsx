import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Card,
  Button,
  Avatar,
  Alert,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  Skeleton,
  addToast,
} from "@heroui/react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaLock,
  FaCheckCircle,
  FaCamera,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import Input from "../../components/ui/Input";
import OtpModal from "../../components/ui/OtpModal";
import { BiFile } from "react-icons/bi";
import CameraCapture from "../../components/ui/CameraCapture";
import { dataUrlToFile } from "../../utils/app/text";
import { axios } from "../../config/axios";
import { AxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";

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
  // nin_number: yup
  //   .string()
  //   .min(11, "NIN number must be 11 characters long")
  //   .required("NIN number is required"),

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
type UserDetails = Omit<PersonalDetaisType, "avatar">;

export default function ProfilePage() {
  const { user, dispatch } = useAuth();
  const [defaultData, setDefaultData] = useState<UserDetails | null>(null);

  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const {
    isOpen: isPictureModalOpen,
    onOpenChange: onOpenPictureModalChange,
    onOpen: onOpenPictureModal,
    onClose: onClosePictureModal,
  } = useDisclosure();
  const {
    isOpen: isCaptureModalOpen,
    onOpenChange: onOpenCaptureModalChange,
    onOpen: onOpenCaptureModal,
    onClose: onCloseCaptureModal,
  } = useDisclosure();
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    setValue,
    getValues,
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

  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState<string[]>([]);
  const [profileError, setProfileError] = useState("");

  //Fetch Initial Details
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setProfileError("");
      try {
        const { data } = await axios.get("/auth/users/me/");
        const { profile_pic, nin_number, ...otherDetails } = data;
        setAvatar(
          profile_pic
          ? `${import.meta.env.VITE_UPLOADS_API_URL}/${profile_pic}`
          : ""
        );
        Object.entries(otherDetails).forEach(([key, value]) => {
          setValue(key as keyof UserDetails, value as string);
        });
        console.log(data);
        setIsLoading(false);
        setProfileError("");
      } catch (error: AxiosError | any) {
        console.error(error);
        setProfileError(error?.response?.data?.message || error.message);
      }
    })();
  }, []);

  const togglePasswords = (type: string) =>
    setVisiblePassword((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );

  const selectedFile = watch("avatar") as FileList;

  // Update file preview
  useEffect(() => {
    (async () => {
      // reset avatar error by default

      if (selectedFile && selectedFile.length > 0) {
        onClosePictureModal();
        onCloseCaptureModal();
        const file = selectedFile[0];
        // const dimensions = await getImageDimensions(file);
        // console.log(dimensions);
        // if (
        //   dimensions.width !== MAX_WIDTH &&
        //   dimensions.height !== MAX_HEIGHT
        // ) {
        //   setError("avatar", {
        //     type: "fileDimensions",
        //     message: "Image must be within 500x500 pixels",
        //   });
        //   setValue("avatar", []);
        //   return;
        // }
        // clearErrors("avatar");
        const url = URL.createObjectURL(file);
        setAvatar(url);
      }
    })();
  }, [selectedFile]);

  const onSubmit = async () => {
    setIsSubmitting(true);
    console.log("Updated User Details:", getValues());
    const { avatar: profile_pic, ...others } = getValues();

    const formData = new FormData();
    Object.entries(others).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (profile_pic) {
      formData.append("profile_pic", profile_pic[0]);
    }

    try {
      const { data } = await axios.patch("/auth/users/me/", formData);
      console.log(data);
      addToast({
        description: "Profile updated successfully",
        color: "success",
      });
      const { profile_pic, nin_number, ...otherDetails } = data;
      const profileUrl = profile_pic
        ? `${import.meta.env.VITE_UPLOADS_API_URL}/${profile_pic}`
        : profile_pic;
      setAvatar(profileUrl);
      console.log(profileUrl);
      Object.entries(otherDetails).forEach(([key, value]) => {
        setValue(key as keyof UserDetails, value as string);
      });

      // UPDATE USER STATE
      const user = JSON.parse(Cookies.get("user") || "null");
      const updatedUser = {
        ...user,
        ...otherDetails,
        profile_pic: profileUrl,
      };
      Cookies.set("user", JSON.stringify(updatedUser));
      dispatch({ type: "UPDATE_PROFILE", payload: updatedUser });
    } catch (err: AxiosError | any) {
      console.error(err);
      addToast({
        description: err?.response?.data?.message || err.message,
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const onPasswordSubmit = (data: PasswordsType) => {
    console.log("Updated User Details:", data);
    onOpen();
  };

  return (
    <div className="max-w-5xl  mx-auto">
      <Card
        radius="sm"
        className="p-4 bg-[#1e1e1e] border-t-4 border-yellow-500 shadow-md mt-10"
      >
        <div className="space-y-4">
          <h1 className="text-2xl text-yellow-500 font-bold">
            Personal Details
          </h1>
          <Alert
            color="danger"
            variant="faded"
            title={profileError}
            isVisible={Boolean(profileError)}
            isClosable
            onClose={() => setProfileError("")}
          />
          {isLoading ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="w-full h-[250px] sm:h-[400px] md:h-auto mx-auto md:col-span-2">
                  <Skeleton className="w-full h-full max-h-full mx-auto rounded-xl" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:col-span-3">
                  <Skeleton className="w-full h-[60px] max-h-full mx-auto rounded-xl" />
                  <Skeleton className="w-full h-[60px] max-h-full mx-auto rounded-xl" />
                  <Skeleton className="w-full h-[60px] max-h-full mx-auto rounded-xl" />
                </div>
              </div>
              <Skeleton className="w-full h-[60px] max-h-full mx-auto rounded-xl" />
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative w-full h-[250px] sm:h-[400px] md:h-auto mx-auto md:col-span-2">
                  <Avatar
                    src={avatar || undefined}
                    size="lg"
                    radius="md"
                    alt="User Avatar"
                    ignoreFallback={!!avatar}
                    fallback={<FaUser size={70} />}
                    className="w-full h-full max-h-full mx-auto object-cover"
                  />
                  <button
                    onClick={onOpenPictureModal}
                    disabled={isSubmitting}
                    className="absolute bottom-2 right-2 bg-[#1e1e1e] p-3 rounded-full cursor-pointer"
                  >
                    <FaCamera className="text-yellow-500" size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 md:col-span-3">
                  <Input
                    isDisabled={isSubmitting}
                    label="First Name"
                    startContent={<FaUser />}
                    {...register("first_name")}
                    errorMessage={errors.first_name?.message}
                  />
                  <Input
                    isDisabled={isSubmitting}
                    label="Last Name"
                    startContent={<FaUser />}
                    {...register("last_name")}
                    errorMessage={errors.last_name?.message}
                  />
                  <Input
                    isDisabled={isSubmitting}
                    label="Email Address"
                    startContent={<FaEnvelope />}
                    {...register("email")}
                    errorMessage={errors.email?.message}
                  />
                </div>
              </div>
              <Input
                isDisabled={isSubmitting}
                label="Phone Number"
                startContent={<FaPhone />}
                {...register("phone_number")}
                errorMessage={errors.phone_number?.message}
              />
              {/* <Input
                              isDisabled={isSubmitting}

                label="NIN Number"
                startContent={<FaIdCard />}
                {...register("nin_number")}
                errorMessage={errors.nin_number?.message}
              /> */}
              <Button
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                fullWidth
                size="lg"
                color="warning"
                onPress={onSubmit}
              >
                Update Profile
              </Button>
            </>
          )}
        </div>
        {/* <div className="space-y-4">
          <h1 className="text-2xl text-yellow-500 font-bold">
            Personal Details
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="w-full h-[250px] sm:h-[400px] md:h-auto mx-auto md:col-span-2">
              <Skeleton className="w-full h-full max-h-full mx-auto rounded-md" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:col-span-3">
              <Skeleton className="w-full h-[60px] max-h-full mx-auto rounded-md" />
              <Skeleton className="w-full h-[60px] max-h-full mx-auto rounded-md" />
              <Skeleton className="w-full h-[60px] max-h-full mx-auto rounded-md" />
            </div>
          </div>
          <Skeleton className="w-full h-[60px] max-h-full mx-auto rounded-md" />

          <Button fullWidth size="lg" color="warning" type="submit">
            Update Profile
          </Button>
        </div> */}
      </Card>
      <Card
        radius="sm"
        className="p-4 border-t-4 border-yellow-500 bg-[#1e1e1e] shadow-md mt-10"
      >
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
              type={visiblePassword.includes("password") ? "text" : "password"}
              startContent={<FaLock />}
              {...passwordRegister("password")}
              isInvalid={!!passwordErrors.password}
              errorMessage={passwordErrors.password?.message}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={() => togglePasswords("password")}
                >
                  {visiblePassword.includes("password") ? (
                    <FaEyeSlash className="text-2xl text-foreground pointer-events-none" />
                  ) : (
                    <FaEye className="text-2xl text-foreground pointer-events-none" />
                  )}
                </button>
              }
            />
            <Input
              label="Confirm Password"
              type={
                visiblePassword.includes("c_password") ? "text" : "password"
              }
              startContent={<FaCheckCircle />}
              {...passwordRegister("c_password")}
              isInvalid={!!passwordErrors.c_password}
              errorMessage={passwordErrors.c_password?.message}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={() => togglePasswords("c_password")}
                >
                  {visiblePassword.includes("c_password") ? (
                    <FaEyeSlash className="text-2xl text-foreground pointer-events-none" />
                  ) : (
                    <FaEye className="text-2xl text-foreground pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>
          <Button fullWidth size="lg" color="warning" type="submit">
            Update Password
          </Button>
        </form>
      </Card>
      <OtpModal
        authDetails={{ email: "mdkmdkmdvkm@dmvkd.com" }}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
      <Modal
        isDismissable={false}
        size="lg"
        backdrop="blur"
        placement="center"
        onOpenChange={onOpenPictureModalChange}
        isOpen={isPictureModalOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Change Profile Picture</ModalHeader>
              <ModalBody>
                <div className="w-full grid grid-cols-1  md:grid-cols-2 gap-4 p-5">
                  <label
                    // onClick={onClose}
                    htmlFor="avatar-upload"
                    className="block space-y-3 w-[100%] cursor-pointer rounded-md border border-yellow-500 p-3"
                  >
                    <div className="w-fit mx-auto">
                      <BiFile size={45} className="text-yellow-500" />
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register("avatar")}
                      />
                    </div>
                    <p className="text-center text-yellow-500">
                      Pick from files
                    </p>
                  </label>
                  <div
                    onClick={() => {
                      onOpenCaptureModal();
                      onClose();
                    }}
                    className="rounded-md space-y-3 w-[100%] cursor-pointer border border-yellow-500 p-3"
                  >
                    <div className="w-fit mx-auto">
                      <FaCamera size={45} className="text-yellow-500" />
                    </div>
                    <p className="text-center text-yellow-500">Take a selfie</p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isDismissable={false}
        size="lg"
        placement="center"
        onOpenChange={onOpenCaptureModalChange}
        isOpen={isCaptureModalOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Capture New Profile Photo</ModalHeader>
              <ModalBody>
                <CameraCapture
                  onCapture={(url, filename) => {
                    const file = dataUrlToFile(url, filename);
                    setValue("avatar", [file]);
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
