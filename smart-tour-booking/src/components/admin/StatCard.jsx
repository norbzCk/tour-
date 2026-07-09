import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

function StatCard({ icon, title, value }) {
  const { isDark } = useTheme();
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`
      rounded-2xl
      shadow-sm
      hover:shadow-xl
      transition
      p-6
      ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white"}
      `}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className={isDark ? "text-gray-400" : "text-slate-500"}>
            {title}
          </p>

          <h2 className={`text-2xl md:text-4xl font-bold mt-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            {value}
          </h2>
        </div>

        <div className={`text-4xl ${isDark ? "text-green-400" : "text-green-600"}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;
