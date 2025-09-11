const Search = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ padding: "0.5rem", marginLeft: "1rem" }}
    />
  );
};

export default Search;
