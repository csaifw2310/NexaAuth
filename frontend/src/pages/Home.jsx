import MainLayout from "../components/MainLayout";
import useAuth from "../hooks/useAuth";

export default function Home() {

  const { user } = useAuth();

  return (

    <MainLayout>

      <div className="grid grid-cols-12 gap-6">

        {/* LEFT */}

        <div className="col-span-3">

          <div className="bg-white rounded-3xl shadow-md p-6">

            <div
              className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-gradient-to-r
              from-purple-400
              to-purple-700
              flex
              items-center
              justify-center
              text-white
              text-3xl
              font-bold
              "
            >
              {user?.name?.charAt(0)}
            </div>

            <h2
              className="
              text-center
              text-xl
              font-bold
              mt-4
              text-[#343762]
              "
            >
              {user?.name}
            </h2>

            <p
              className="
              text-center
              text-gray-500
              "
            >
              {user?.email}
            </p>

          </div>

        </div>

        {/* CENTER */}

        <div className="col-span-6">

          <div
            className="
            bg-white
            rounded-3xl
            shadow-md
            p-6
            mb-6
            "
          >

            <h2
              className="
              text-xl
              font-bold
              text-[#343762]
              mb-4
              "
            >
              Create Post
            </h2>

            <textarea
              placeholder="Share something..."
              className="
              w-full
              border
              rounded-xl
              p-4
              resize-none
              outline-none
              "
              rows="4"
            />

            <button
              className="
              mt-4
              px-6
              py-3
              rounded-xl
              text-white
              font-semibold
              bg-gradient-to-r
              from-purple-400
              via-purple-500
              to-purple-700
              "
            >
              Post
            </button>

          </div>

          <div
            className="
            bg-white
            rounded-3xl
            shadow-md
            p-6
            "
          >

            <h2
              className="
              text-xl
              font-bold
              text-[#343762]
              mb-4
              "
            >
              Recent Posts
            </h2>

            <p className="text-gray-500">
              No posts available yet.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="col-span-3">

          <div
            className="
            bg-white
            rounded-3xl
            shadow-md
            p-6
            "
          >

            <h2
              className="
              text-xl
              font-bold
              text-[#343762]
              mb-4
              "
            >
              Trending
            </h2>

            <ul className="space-y-3">

              <li>#Internships</li>

              <li>#Coding</li>

              <li>#AI</li>

              <li>#WebDevelopment</li>

            </ul>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}