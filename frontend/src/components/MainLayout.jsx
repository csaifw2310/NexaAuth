import Sidebar from "../components/Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ children }) {

  return (

    <div className="min-h-screen bg-[#f5f6fa]">

      <Topbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>

  );

}