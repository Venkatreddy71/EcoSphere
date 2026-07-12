import {
  Leaf,
  Users,
  ShieldCheck,
  Trophy,
} from "lucide-react";

const cards = [
  {
    title: "Environmental",
    value: "82",
    icon: Leaf,
    color: "bg-green-500",
  },
  {
    title: "Social",
    value: "74",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Governance",
    value: "91",
    icon: ShieldCheck,
    color: "bg-purple-500",
  },
  {
    title: "Overall ESG",
    value: "84",
    icon: Trophy,
    color: "bg-orange-500",
  },
];

export default function Dashboard() {
  return (
    <div>

      <div className="grid grid-cols-4 gap-6">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow p-6"
          >

            <div
              className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center text-white`}
            >
              <card.icon size={28} />
            </div>

            <h2 className="mt-5 text-slate-500">

              {card.title}

            </h2>

            <p className="text-4xl font-bold mt-2">

              {card.value}

            </p>

          </div>
        ))}

      </div>

      <div className="mt-10 grid grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-xl font-bold">

            AI Recommendation

          </h2>

          <p className="mt-5 text-slate-600">

            Reduce electricity usage in Engineering
            department to improve ESG score by 8%.

          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-xl font-bold">

            Department Rankings

          </h2>

          <ul className="mt-5 space-y-3">

            <li>🥇 HR - 92</li>
            <li>🥈 IT - 88</li>
            <li>🥉 Finance - 84</li>

          </ul>

        </div>

      </div>

    </div>
  );
}