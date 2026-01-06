import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { use, useEffect } from "react";
import { addUser } from "./utils/userSlice";

export default function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (userData)  return;
    try {
      const res = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user data:", error);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}