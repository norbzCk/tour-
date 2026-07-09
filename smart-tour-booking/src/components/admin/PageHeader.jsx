import { useTheme } from "../../context/ThemeContext";

function PageHeader({
  title,
  subtitle
}) {
  const { isDark } = useTheme();
  return (
    <div className="mb-8">

      <h1 className={`
      text-2xl md:text-4xl
      font-bold
      ${isDark ? "text-white" : "text-slate-800"}
      `}>
        {title}
      </h1>

      <p className={`
      mt-2
      ${isDark ? "text-gray-400" : "text-slate-500"}
      `}>
        {subtitle}
      </p>

    </div>
  );
}

export default PageHeader;
