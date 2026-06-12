import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/authApi";
import AuthLayout from "../components/AuthLayout";

export default function VerifyResetOTP() {

  const navigate = useNavigate();

  const email =
    localStorage.getItem("resetEmail");

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [countdown, setCountdown] =
    useState(0);

  useEffect(() => {

    if (!email) {

      navigate(
        "/forgot-password"
      );

    }

  }, [email, navigate]);

  const handleVerify =
    async (e) => {

      e.preventDefault();

      setLoading(true);
      setError("");
      setMessage("");

      try {

        const res =
          await api.post(
            "/verify-reset-otp",
            {
              email,
              otp
            }
          );

        setMessage(
          res.data.message ||
          "OTP Verified Successfully"
        );

        localStorage.setItem(
          "resetOTP",
          otp
        );

        setTimeout(() => {

          navigate(
            "/reset-password"
          );

        }, 1500);

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "OTP Verification Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  const handleResendOTP =
    async () => {

      if (
        countdown > 0 ||
        resending
      ) {
        return;
      }

      setResending(true);
      setError("");
      setMessage("");

      try {

        const res =
          await api.post(
            "/forgot-password",
            {
              email
            }
          );

        setMessage(
          res.data.message ||
          "OTP Sent Successfully"
        );

        setCountdown(30);

        const timer =
          setInterval(() => {

            setCountdown(
              (prev) => {

                if (prev <= 1) {

                  clearInterval(
                    timer
                  );

                  return 0;

                }

                return prev - 1;

              }
            );

          }, 1000);

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to resend OTP"
        );

      } finally {

        setResending(false);

      }

    };

  return (

    <>
      {(loading || resending) && (

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
              {loading
                ? "Verifying OTP..."
                : "Sending OTP..."}
            </h3>

          </div>

        </div>

      )}

      <AuthLayout
        title="Verify OTP"
        subtitle="Enter the OTP sent to your email"
      >

        <h1
          className="
          text-[52px]
          font-bold
          text-[#343762]
          mb-8
          "
        >
          Verify OTP
        </h1>

        <p className="text-gray-500">
          Verification code sent to
        </p>

        <p
          className="
          font-semibold
          text-[#343762]
          mb-10
          "
        >
          {email}
        </p>

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
          onSubmit={handleVerify}
          className="space-y-8"
        >

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            required
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
            placeholder="Enter 6-digit OTP"
            className="
            w-full
            border-b
            border-gray-300
            pb-3
            outline-none
            text-lg
            tracking-[8px]
            text-center
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
              ? "Verifying..."
              : "Verify OTP"}
          </button>

        </form>

        <div
          className="
          mt-8
          text-center
          "
        >

          <p className="text-gray-500">
            Didn't receive the OTP?
          </p>

          <button
            type="button"
            onClick={handleResendOTP}
            disabled={
              countdown > 0 ||
              resending
            }
            className="
            mt-2
            text-purple-600
            font-semibold
            hover:underline
            disabled:text-gray-400
            "
          >
            {countdown > 0
              ? `Resend OTP in ${countdown}s`
              : "Resend OTP"}
          </button>

        </div>

      </AuthLayout>

    </>

  );

}