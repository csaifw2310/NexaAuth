import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/authApi";
import AuthLayout from "../components/AuthLayout";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);
      setMessage("");
      setError("");

      try {

        const res =
          await api.post(
            "/forgot-password",
            {
              email
            }
          );

        localStorage.setItem(
          "resetEmail",
          email
        );

        setMessage(
          res.data.message ||
          "OTP Sent Successfully"
        );

        setTimeout(() => {

          navigate(
            "/verify-reset-otp"
          );

        }, 1500);

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to send OTP"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <>
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
            p-8
            rounded-3xl
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
              Sending OTP...
            </h3>

          </div>

        </div>

      )}

      <AuthLayout
        title="Forgot Password?"
        subtitle="We'll help you recover your account"
      >

        <h1
          className="
          text-5xl
          font-bold
          text-[#343762]
          mb-10
          "
        >
          Forgot Password
        </h1>

        {message && (

          <div
            className="
            bg-green-100
            text-green-700
            p-3
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
            p-3
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
            required
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="Enter your email"
            className="
            w-full
            border-b
            border-gray-300
            outline-none
            py-3
            bg-transparent
            focus:border-purple-500
            "
          />

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
              ? "Sending..."
              : "Send OTP"}
          </button>

        </form>

      </AuthLayout>

    </>

  );

}