import { Outlet } from "react-router-dom";
import Navbar from "../../components/navigation/(main)/Navbar";
import Footer from "../../components/navigation/(main)/Footer";

export default function MainLayout() {
     return (
          <>
               <Navbar />
               <Outlet/>
               <Footer/>
          </>
     )
}