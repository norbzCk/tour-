function SearchBar({
  value,
  onChange,
  placeholder,
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
      w-full
      md:w-96
      p-3
      rounded-xl
      border
      border-slate-200
      focus:outline-none
      focus:ring-2
      focus:ring-green-500
      "
    />
  );
}

export default SearchBar;