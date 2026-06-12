import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import api from "../api/authApi";

export default function Register() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        await api.post(
          "/register",
          form
        );

        localStorage.setItem(
          "verifyEmail",
          form.email
        );

        setTimeout(() => {

          navigate(
            "/verify-otp"
          );

        }, 1200);

      } catch (error) {

        setLoading(false);

        alert(
          error.response?.data
            ?.message ||
          error.message ||
          "Something went wrong"
        );

      }

    };

  return (

    <>
      {/* LOADER */}

      {
        loading && (

          <div
            className="
            fixed
            inset-0
            bg-black/40
            backdrop-blur-sm
            z-50
            flex
            items-center
            justify-center
            "
          >

            <div
              className="
              bg-white
              rounded-3xl
              p-10
              shadow-2xl
              flex
              flex-col
              items-center
              gap-5
              "
            >

              <div
                className="
                w-14
                h-14
                border-4
                border-purple-200
                border-t-purple-600
                rounded-full
                animate-spin
                "
              />

              <h2
                className="
                text-2xl
                font-bold
                text-[#343762]
                "
              >
                Creating Account...
              </h2>

              <p
                className="
                text-gray-500
                "
              >
                Sending verification OTP
              </p>

            </div>

          </div>

        )
      }

      <div
        className="
        min-h-screen
        bg-[#f2f2f2]
        flex
        items-center
        justify-center
        p-5
        "
      >

        <div
          className="
          w-full
          max-w-5xl
          bg-white
          rounded-[35px]
          overflow-hidden
          shadow-2xl
          flex
          "
        >

          {/* LEFT PANEL */}

          <div
            className="
            hidden
            md:flex
            w-[45%]
            bg-[#343762]
            text-white
            flex-col
            items-center
            justify-center
            px-10
            "
          >

            <div
              className="
              mb-16
              text-center
              "
            >

              <h1
                className="
                text-5xl
                font-bold
                "
              >
                LOGO
              </h1>

              <p
                className="
                text-sm
                text-gray-300
                mt-2
                "
              >
                Slogan here
              </p>

            </div>

            <h2
              className="
              text-6xl
              font-bold
              text-center
              leading-tight
              mb-8
              "
            >
              Start our
              <br />
              journey
            </h2>

            <p
              className="
              text-center
              text-gray-300
              leading-8
              max-w-sm
              "
            >
              Create your account and
              begin your experience
              with our platform.
            </p>

          </div>

          {/* RIGHT PANEL */}

          <div
            className="
            w-full
            md:w-[55%]
            px-10
            py-14
            "
          >

            <h1
              className="
              text-5xl
              font-bold
              text-[#343762]
              mb-12
              "
            >
              Sign Up
            </h1>

            <form
              onSubmit={
                handleSubmit
              }
              className="
              space-y-8
              "
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={
                  handleChange
                }
                required
                className="
                w-full
                border-b
                border-gray-300
                py-3
                outline-none
                bg-transparent
                focus:border-purple-500
                "
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={
                  handleChange
                }
                required
                className="
                w-full
                border-b
                border-gray-300
                py-3
                outline-none
                bg-transparent
                focus:border-purple-500
                "
              />

              <input
                type="password"
                name="password"
                placeholder="Choose Password"
                value={form.password}
                onChange={
                  handleChange
                }
                required
                className="
                w-full
                border-b
                border-gray-300
                py-3
                outline-none
                bg-transparent
                focus:border-purple-500
                "
              />

              <div
                className="
                flex
                items-center
                gap-3
                "
              >

                <input
                  type="checkbox"
                  required
                />

                <span
                  className="
                  text-sm
                  text-gray-600
                  "
                >
                  Agreed to Terms and
                  Conditions
                </span>

              </div>

              <button
                type="submit"
                disabled={
                  loading
                }
                className="
                px-12
                py-3
                text-white
                font-semibold
                rounded-md
                bg-gradient-to-r
                from-purple-400
                to-purple-600
                hover:opacity-90
                active:scale-95
                transition-all
                duration-150
                disabled:opacity-70
                disabled:cursor-not-allowed
                "
              >
                {
                  loading
                    ? "Creating..."
                    : "Register"
                }
              </button>

              <p
                className="
                text-gray-600
                "
              >

                Already a member?{" "}

                <Link
                  to="/login"
                  className="
                  text-purple-600
                  font-medium
                  hover:underline
                  "
                >
                  Login
                </Link>

              </p>

            </form>

          </div>

        </div>

      </div>

    </>
  );

}