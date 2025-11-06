import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Body() {
  return (
    <div>
    <Navbar />
    <Outlet />
    <Footer />
    </div>
  )
}