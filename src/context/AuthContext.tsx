//
import { AxiosError } from "axios";
import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { axios } from "../config/axios";
import Cookies from "js-cookie";

export type UserType = {
  first_name: string;
  last_name: string;
  email: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  authEmail: string | null;
  signOut: () => Promise<void>;
  dispatch: React.Dispatch<any>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  authEmail: null,
  signOut: async () => {},
  dispatch: () => {},
});

const initialState = {
  isAuthenticated: false,
  user: null,
  authEmail: null,
};

function reducer(state: any, action: any) {
  console.log(action);

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
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user") || "null");
    if (user) {
      dispatch({type: "SIGN_IN", payload: user})
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

  return (
    <AuthContext.Provider value={{ ...state, dispatch, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
