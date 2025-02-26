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
  profile_picture: string;
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user") || "null");
    const token = JSON.parse(Cookies.get("token") || "null");
    if (user && !isTokenExpired(token.access)) {
      dispatch({ type: "SIGN_IN", payload: user });
    } else {
      Cookies.remove("user")
      Cookies.remove("token")
    }
  }, []);

  const signOut = async () => {
    try {
      const response = await axios.post("/");
      console.log(response.data);
      toast.success("Sign out successful");
      dispatch({ type: "SIGN_OUT" });
    } catch (err: AxiosError | any) {
      console.log(err.response?.data);
      toast.error(err.response?.data.message);
    }
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
                  // onPress={onConfirm}
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
