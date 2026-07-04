import {
  TrendingUp,
  Activity,
  Clock3,
  ArrowUpRight,
} from "lucide-react";
import AnalyticsChart from "./AnalyticsChart";

export default function AnalyticsSection() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* Chart */}

      <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Analytics Overview
            </h2>

            <p className="text-gray-400 mt-1">
              AI usage this month
            </p>

          </div>

          <TrendingUp className="text-violet-400"/>
        </div>

        <div className="mt-8 h-72 rounded-2xl bg-gradient-to-b from-violet-500/10 to-transparent border border-dashed border-violet-500/20 flex items-center justify-center">

                   <AnalyticsChart />


        </div>

      </div>

      {/* Recent Activity */}

      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-violet-500/40 hover:shadow-[0_0_35px_rgba(139,92,246,.25)] transition-all duration-300">

        <div className="flex items-center justify-between">

          <h2 className="text-xl font-bold">
            Recent Activity
          </h2>

          <Activity size={20}/>
        </div>

        <div className="mt-8 space-y-6">

          {[
            "Generated AI Image",
            "Created Video",
            "Chat Completed",
            "Generated React Code",
            "PDF Summarized",
          ].map((item, index) => (

            <div
              key={index}
              className="flex items-start gap-4"
            >

              <div className="w-11 h-11 rounded-2xl bg-violet-600/20 flex items-center justify-center">

                <Clock3 size={18}/>

              </div>

              <div className="flex-1">

                <h4 className="font-medium">
                  {item}
                </h4>

                <p className="text-sm text-gray-400">

                  2 hours ago

                </p>

              </div>

              <ArrowUpRight size={16}/>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}