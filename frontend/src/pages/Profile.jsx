import MainLayout from "../components/MainLayout";
import useAuth from "../hooks/useAuth";

export default function Profile() {

  const { user } =
    useAuth();

  return (

    <MainLayout>

      <div
        className="
        bg-white
        rounded-3xl
        shadow-md
        p-8
        max-w-3xl
        "
      >

        <h1
          className="
          text-4xl
          font-bold
          text-[#343762]
          mb-8
          "
        >
          My Profile
        </h1>

        <div className="space-y-5">

          <div>

            <label
              className="
              text-gray-500
              text-sm
              "
            >
              Full Name
            </label>

            <p
              className="
              text-lg
              font-medium
              "
            >
              {user?.name}
            </p>

          </div>

          <div>

            <label
              className="
              text-gray-500
              text-sm
              "
            >
              Email
            </label>

            <p
              className="
              text-lg
              font-medium
              "
            >
              {user?.email}
            </p>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}