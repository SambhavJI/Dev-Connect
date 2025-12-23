import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.user);

  return (
    <div className="navbar bg-neutral shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">devConnect</a>
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
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </>
          </div>
        </div>
      )}
    </div>
  );
}
