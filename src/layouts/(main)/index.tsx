import { Outlet } from "react-router-dom";
import Navbar from "../../components/navigation/(main)/Navbar";

export default function MainLayout() {
     return (
          <>
               <Navbar />
               <Outlet/>
          </>
     )
}