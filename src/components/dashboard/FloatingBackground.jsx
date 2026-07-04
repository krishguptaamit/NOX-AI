import { motion } from "framer-motion";

export default function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Glow 1 */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 14,
        }}
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px]"
      />

      {/* Glow 2 */}
      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 50, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
        }}
        className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-fuchsia-600/15 blur-[180px]"
      />

      {/* Glow 3 */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px]"
      />
    </div>
  );
}