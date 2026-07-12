import {
  LayoutDashboard,
  Leaf,
  Users,
  ShieldCheck,
  Trophy,
  FileText,
  Bot,
  Settings,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Environment",
    icon: Leaf,
  },
  {
    name: "Social",
    icon: Users,
  },
  {
    name: "Governance",
    icon: ShieldCheck,
  },
  {
    name: "Challenges",
    icon: Trophy,
  },
  {
    name: "Reports",
    icon: FileText,
  },
  {
    name: "AI Copilot",
    icon: Bot,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col">

      <div className="text-3xl font-bold p-8 border-b border-slate-700">

        EcoSphere

      </div>

      <div className="flex-1 px-4 py-6">

        {menus.map((menu) => (
          <button
            key={menu.name}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-emerald-600 transition-all mb-2"
          >
            <menu.icon size={22} />

            <span>{menu.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}