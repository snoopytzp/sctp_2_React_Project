type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <input
      className="search-input"
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      placeholder="Search contacts..."
    />
  );
}

export default SearchBar;
