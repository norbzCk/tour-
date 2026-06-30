import { useTheme } from "../../context/ThemeContext";

function SearchBar({
  value,
  onChange,
  placeholder,
}) {
  const { isDark } = useTheme();
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
      w-full
      md:w-96
      p-3
      rounded-xl
      border
      focus:outline-none
      focus:ring-2
      focus:ring-green-500
      ${isDark ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-slate-200 bg-white text-gray-900"}
      `}
    />
  );
}

export default SearchBar;
