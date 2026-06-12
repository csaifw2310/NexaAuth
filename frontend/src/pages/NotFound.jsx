import { Link } from "react-router-dom";

export default function NotFound() {

  return (

    <div
      className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      bg-[#f8f9fc]
      px-6
      "
    >

      <h1
        className="
        text-8xl
        font-bold
        text-purple-600
        "
      >
        404
      </h1>

      <h2
        className="
        text-3xl
        font-semibold
        text-[#343762]
        mt-4
        "
      >
        Page Not Found
      </h2>

      <p
        className="
        text-gray-500
        mt-3
        text-center
        max-w-md
        "
      >
        The page you are looking for doesn't exist
        or may have been moved.
      </p>

      <Link
        to="/"
        className="
        mt-8
        px-6
        py-3
        rounded-lg
        bg-gradient-to-r
        from-purple-400
        via-purple-500
        to-purple-700
        text-white
        font-semibold
        hover:opacity-90
        "
      >
        Go To Dashboard
      </Link>

    </div>

  );

}