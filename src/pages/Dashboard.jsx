import HeroSection from "../components/dashboard/HeroSection";
import StatsCards from "../components/dashboard/StatsCards";
import AIToolsGrid from "../components/dashboard/AIToolsGrid";
import AnalyticsSection from "../components/dashboard/AnalyticsSection";
import QuickActions from "../components/dashboard/QuickActions";
import RecentFiles from "../components/dashboard/RecentFiles";
import AIModels from "../components/dashboard/AIModels";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
   <motion.div
  className="space-y-8"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>

      <HeroSection />

      <StatsCards />

      <AIToolsGrid />

      <AnalyticsSection />

      <QuickActions />

       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <RecentFiles />

        <AIModels />

      </div>

    </motion.div>
  );
}