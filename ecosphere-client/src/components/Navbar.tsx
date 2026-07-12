import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white h-20 shadow flex items-center justify-between px-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">

          ESG Dashboard

        </h1>

        <p className="text-slate-500">

          Welcome back 👋

        </p>

      </div>

      <div className="flex items-center gap-5">

        <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">

          <Search size={18} />

          <input
            placeholder="Search..."
            className="bg-transparent outline-none ml-2"
          />

        </div>

        <Bell size={24} />

        <UserCircle2 size={36} />

      </div>

    </header>
  );
}