import styled from 'styled-components';

const Search = ({ search, setSearch }) => {
  return (
    <SearchInput
      type="text"
      placeholder="Buscar productos..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

const SearchInput = styled.input`
  padding: 1rem;
  margin-left: 1rem;
  width: 400px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.3rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ff6b00;
    box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.1);
  }

  &::placeholder {
    color: #666565ff;
  }

  @media (max-width: 768px) {
    width: 200px;
  }
`;

export default Search;
