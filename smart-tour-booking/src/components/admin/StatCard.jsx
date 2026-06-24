import { motion } from "framer-motion";

function StatCard({ icon, title, value }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="
      bg-white
      rounded-2xl
      shadow-sm
      hover:shadow-xl
      transition
      p-6
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-4xl text-green-600">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;