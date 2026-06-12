import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FullScreenLoader from "./FullScreenLoader";

export default function PublicRoute({
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
    ? (
      <Navigate
        to="/"
        replace
      />
    )
    : children;

}