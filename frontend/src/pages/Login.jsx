import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import api from "../api/authApi";
import AuthLayout from "../components/AuthLayout";

export default function Login() {

  const navigate = useNavigate();

  const { syncUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {

      // LOGIN API

      const res =
        await api.post(
          "/login",
          {
            email: form.email,
            password: form.password
          }
        );

      // REFRESH USER CONTEXT

      await syncUser();

      setMessage(
        res.data.message ||
        "Login Successful"
      );

      setTimeout(() => {

        navigate("/");

      }, 1200);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Invalid email or password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <>

      {/* LOADER */}

      {loading && (

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
            p-8
            shadow-2xl
            flex
            flex-col
            items-center
            gap-4
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

            <h3
              className="
              text-xl
              font-bold
              text-[#343762]
              "
            >
              Logging In...
            </h3>

            <p className="text-sm text-gray-500">
              Please wait while we verify your credentials
            </p>

          </div>

        </div>

      )}

      <AuthLayout
        title="Welcome Back"
        subtitle="Login and continue your journey"
      >

        <h1
          className="
          text-5xl
          font-bold
          text-[#343762]
          mb-10
          "
        >
          Login
        </h1>

        {message && (

          <div
            className="
            bg-green-100
            text-green-700
            px-4
            py-3
            rounded-lg
            mb-5
            "
          >
            {message}
          </div>

        )}

        {error && (

          <div
            className="
            bg-red-100
            text-red-700
            px-4
            py-3
            rounded-lg
            mb-5
            "
          >
            {error}
          </div>

        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="
            w-full
            border-b
            border-gray-300
            py-3
            outline-none
            bg-transparent
            focus:border-purple-500
            transition-all
            "
          />

          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="
            w-full
            border-b
            border-gray-300
            py-3
            outline-none
            bg-transparent
            focus:border-purple-500
            transition-all
            "
          />

          <div className="text-right">

            <Link
              to="/forgot-password"
              className="
              text-purple-600
              text-sm
              hover:underline
              "
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            py-4
            rounded-lg
            text-white
            font-semibold
            bg-gradient-to-r
            from-purple-400
            via-purple-500
            to-purple-700
            hover:opacity-90
            active:scale-95
            transition-all
            duration-200
            disabled:opacity-50
            "
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

        </form>

        {/* GOOGLE LOGIN */}

        <div className="mt-6">

          <button
            type="button"
            onClick={() => {

              window.location.href =
                "http://localhost:5000/api/auth/google";

            }}
            className="
            w-full
            border
            border-gray-300
            py-4
            rounded-lg
            font-medium
            hover:bg-gray-50
            active:scale-95
            transition-all
            "
          >
            Continue with Google
          </button>

        </div>

        <p
          className="
          mt-6
          text-center
          text-gray-600
          "
        >

          Don't have an account?

          <Link
            to="/register"
            className="
            ml-2
            text-purple-600
            font-medium
            hover:underline
            "
          >
            Register
          </Link>

        </p>

      </AuthLayout>

    </>

  );

}