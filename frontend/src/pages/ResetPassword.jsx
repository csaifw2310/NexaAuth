import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/authApi";
import AuthLayout from "../components/AuthLayout";

export default function ResetPassword() {

  const navigate = useNavigate();

  const email =
    localStorage.getItem("resetEmail");

  const otp =
    localStorage.getItem("resetOTP");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {

    if (!email || !otp) {

      navigate(
        "/forgot-password"
      );

    }

  }, [email, otp, navigate]);

  const getPasswordStrength = () => {

    if (newPassword.length < 6)
      return {
        text: "Weak",
        color: "text-red-500"
      };

    if (newPassword.length < 10)
      return {
        text: "Medium",
        color: "text-yellow-500"
      };

    return {
      text: "Strong",
      color: "text-green-500"
    };

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");
      setMessage("");

      if (
        newPassword !==
        confirmPassword
      ) {

        setError(
          "Passwords do not match"
        );

        return;

      }

      setLoading(true);

      try {

        const res =
          await api.post(
            "/reset-password",
            {
              email,
              otp,
              newPassword
            }
          );

        setMessage(
          res.data.message ||
          "Password Reset Successful"
        );

        localStorage.removeItem(
          "resetEmail"
        );

        localStorage.removeItem(
          "resetOTP"
        );

        setTimeout(() => {

          navigate("/login");

        }, 2000);

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to reset password"
        );

      } finally {

        setLoading(false);

      }

    };

  const strength =
    getPasswordStrength();

  return (

    <>
      {loading && (

        <div
          className="
          fixed inset-0
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
              w-14 h-14
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
              Resetting Password...
            </h3>

          </div>

        </div>

      )}

      <AuthLayout
        title="Create New Password"
        subtitle="Choose a strong password for your account"
      >

        <h1
          className="
          text-[52px]
          font-bold
          text-[#343762]
          mb-10
          "
        >
          Reset Password
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

          <div>

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              required
              className="
              w-full
              border-b
              border-gray-300
              pb-3
              outline-none
              text-lg
              "
            />

            {newPassword && (

              <p
                className={`
                  mt-2 text-sm
                  ${strength.color}
                `}
              >
                Password Strength:
                {" "}
                {strength.text}
              </p>

            )}

          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            required
            className="
            w-full
            border-b
            border-gray-300
            pb-3
            outline-none
            text-lg
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
            disabled:opacity-50
            "
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>

      </AuthLayout>

    </>

  );

}