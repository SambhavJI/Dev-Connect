import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state) => state.user);

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
                <li><Link to="/logout">Logout</Link></li>
              </ul>
            </>
          </div>
        </div>
      )}
    </div>
  );
}
