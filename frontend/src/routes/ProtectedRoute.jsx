import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FullScreenLoader from "../components/FullScreenLoader";

export default function ProtectedRoute({
  children
}) {

  const {
    user,
    loading,
    initialized
  } = useAuth();

  if (
    loading ||
    !initialized
  ) {

    return (
      <FullScreenLoader />
    );

  }

  return user
    ? children
    : (
      <Navigate
        to="/login"
        replace
      />
    );

}