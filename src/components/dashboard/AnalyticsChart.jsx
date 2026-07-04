import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", users: 320 },
  { day: "Tue", users: 420 },
  { day: "Wed", users: 510 },
  { day: "Thu", users: 460 },
  { day: "Fri", users: 700 },
  { day: "Sat", users: 640 },
  { day: "Sun", users: 830 },
];

export default function AnalyticsChart() {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#2b2240"
          />

          <XAxis
            dataKey="day"
            stroke="#9CA3AF"
          />

          <YAxis stroke="#9CA3AF" />

          <Tooltip
  contentStyle={{
    backgroundColor: "#0F0A1C",
    border: "1px solid #7C3AED",
    borderRadius: "16px",
    color: "#fff",
  }}
/>

          <Line
  type="monotone"
  dataKey="users"
  stroke="#A855F7"
  strokeWidth={4}
  dot={{
    r: 5,
    fill: "#A855F7",
    strokeWidth: 2,
    stroke: "#ffffff",
  }}
  activeDot={{
    r: 8,
    fill: "#C084FC",
  }}
/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}