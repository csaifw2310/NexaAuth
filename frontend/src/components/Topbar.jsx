import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Topbar() {

  const [open, setOpen] =
    useState(false);

  const navigate =
    useNavigate();

  const {
    user,
    logout
  } = useAuth();

  const handleLogout =
    async () => {

      await logout();

      navigate("/login");

    };

  return (

    <header
      className="
      bg-white
      shadow-sm
      border-b
      sticky
      top-0
      z-50
      "
    >

      <div
        className="
        max-w-full
        px-6
        py-4
        flex
        items-center
        justify-between
        "
      >

        <h1
          className="
          text-2xl
          font-bold
          text-[#343762]
          "
        >
          NexaCode
        </h1>

        <div className="relative">

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="
            flex
            items-center
            gap-3
            "
          >

            <div
              className="
              w-10
              h-10
              rounded-full
              bg-gradient-to-r
              from-purple-400
              to-purple-700
              text-white
              flex
              items-center
              justify-center
              font-bold
              "
            >
              {user?.name?.charAt(0)}
            </div>

            <span
              className="
              font-medium
              text-[#343762]
              "
            >
              {user?.name}
            </span>

          </button>

          {open && (

            <div
              className="
              absolute
              right-0
              mt-3
              w-52
              bg-white
              rounded-xl
              shadow-lg
              overflow-hidden
              "
            >

              <Link
                to="/profile"
                className="
                block
                px-4
                py-3
                hover:bg-gray-100
                "
              >
                View Profile
              </Link>

              <button
                onClick={
                  handleLogout
                }
                className="
                w-full
                text-left
                px-4
                py-3
                text-red-500
                hover:bg-gray-100
                "
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </header>

  );

}