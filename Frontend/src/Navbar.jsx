import { useSelector ,useDispatch} from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "./utils/userSlice";
import { removeFeed } from "./utils/feedSlice";

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try{
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      alert("Logged out successfully");
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate("/login");
    }catch(err){
      console.error("Logout failed:", err);
    }
  }
  return (
    <div className="navbar bg-neutral shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">devConnect</Link>
      </div>

      {user && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mx-5">
            <>
              <span className="text-white mt-3 mr-5">Hello, {user.firstName}</span>

              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={user.photoUrl}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link onClick={handleLogout}>Logout</Link></li>
              </ul>
            </>
          </div>
        </div>
      )}
    </div>
  );
}
