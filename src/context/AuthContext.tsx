//
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  addToast,
} from "@heroui/react";
import {
  FaSignOutAlt,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { AxiosError } from "axios";
import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { axios } from "../config/axios";
import Cookies from "js-cookie";
import { isTokenExpired } from "../utils/app/time";

export type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
  profile_pic: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  authEmail: string | null;
  signOut: () => Promise<void>;
  LogoutModal: React.FC;
  openLogoutModal: () => void;
  dispatch: React.Dispatch<any>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  authEmail: null,
  signOut: async () => {},
  LogoutModal: () => null,
  openLogoutModal: () => {},
  dispatch: () => {},
});

const initialState = {
  isAuthenticated: false,
  user: null,
  authEmail: null,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_AUTH_EMAIL":
      return {
        ...state,
        authEmail: action.payload,
      };
    case "SIGN_IN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        authEmail: null,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        user: action.payload,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [state, dispatch] = useReducer(reducer, initialState);
  const removeUser = () => {
    Cookies.remove("user");
    Cookies.remove("token");
  };

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user") || "null");
    const token = JSON.parse(Cookies.get("token") || "null");
    if (user && !isTokenExpired(token.access)) {
      dispatch({ type: "SIGN_IN", payload: user });
    } else {
      removeUser()
    }
  }, []);

  const signOut = async () => {
    // try {
      // const response = await axios.post("/");
      // const response = await new Promise(resolve=> setTimeout(resolve, 3000))
      // console.log(response.data);
      // toast.success("Sign out successful");
      removeUser()
      dispatch({ type: "SIGN_OUT" });
      addToast({
        title: "Logout Status",
        description: "Sign out successful",
        color: "success",
      });
      onClose()
      // window.location.href = "/auth/sign-in";
    // } catch (err: AxiosError | any) {
    //   console.log(err.response?.data);
    //   // toast.error(err.response?.data.message);
    //   addToast({
    //     title: "Logout Status",
    //     description: err.response?.data.message || err.message,
    //     color: "danger",
    //   });
    // }
  };

  const LogoutModal = () => {
    return (
      <Modal
        backdrop="blur"
        isDismissable={false}
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        size="md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="text-center">
                <div className="flex justify-center items-center size-24 mx-auto mb-4 rounded-full bg-[#ff0000]/20">
                  <FaExclamationTriangle className="text-[#ff0000] text-5xl" />
                </div>
                <p className="text-gray-400 text-md">
                  Are you sure you want to log out?
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-center gap-4">
                <Button
                  size="lg"
                  variant="bordered"
                  startContent={<FaTimesCircle className="" />}
                  color="default"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  size="lg"
                  color="danger"
                  startContent={<FaSignOutAlt className="" />}
                  onPress={signOut}
                >
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        signOut,
        LogoutModal,
        openLogoutModal: onOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
