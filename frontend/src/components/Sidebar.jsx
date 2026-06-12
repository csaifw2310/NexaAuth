import {
  NavLink
} from "react-router-dom";

export default function Sidebar() {

  return (

    <aside
      className="
      w-64
      min-h-[calc(100vh-72px)]
      bg-white
      border-r
      "
    >

      <div className="p-5">

        <nav className="space-y-2">

          <NavLink
            to="/"
            className="
            block
            p-3
            rounded-lg
            hover:bg-purple-50
            "
          >
            Home
          </NavLink>

          <NavLink
            to="/profile"
            className="
            block
            p-3
            rounded-lg
            hover:bg-purple-50
            "
          >
            Profile
          </NavLink>

        </nav>

      </div>

    </aside>

  );

}