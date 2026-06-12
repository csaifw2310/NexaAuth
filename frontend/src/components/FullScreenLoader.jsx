export default function FullScreenLoader() {

  return (

    <div
      className="
      fixed
      inset-0
      bg-white
      flex
      items-center
      justify-center
      z-50
      "
    >

      <div
        className="
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

        <h2
          className="
          text-lg
          font-semibold
          text-[#343762]
          "
        >
          Loading...
        </h2>

      </div>

    </div>

  );

}