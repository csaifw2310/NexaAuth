export default function AuthLayout({
  title,
  subtitle,
  children
}) {
  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-5">

      <div className="w-full max-w-5xl bg-white rounded-[35px] overflow-hidden shadow-2xl flex">

        <div className="hidden md:flex w-[45%] bg-[#343762] text-white flex-col items-center justify-center px-10">

          <div className="mb-16">
            <h1 className="text-5xl font-bold">
              LOGO
            </h1>

            <p className="text-sm mt-2 text-gray-300">
              Slogan here
            </p>
          </div>

          <h2 className="text-5xl font-bold text-center leading-tight mb-8">
            {title}
          </h2>

          <p className="text-center text-gray-300 leading-8 max-w-sm">
            {subtitle}
          </p>

        </div>

        <div className="w-full md:w-[55%] px-10 py-14">
          {children}
        </div>

      </div>

    </div>
  );
}