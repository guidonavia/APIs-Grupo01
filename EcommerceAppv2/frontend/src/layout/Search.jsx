import styled from "styled-components";

const Search = ({ search, setSearch }) => {
  return (
    <SearchWrapper>
      <Icon viewBox="0 0 24 24" aria-hidden>
        <path
          d="M21 21l-4.35-4.35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="11"
          cy="11"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </Icon>
      <SearchInput
        type="text"
        placeholder="Buscar zapatillas, marcas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Buscar productos"
      />
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(255, 122, 24, 0.06),
    rgba(0, 0, 0, 0.03)
  );
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 122, 24, 0.12);
  box-shadow: 0 6px 18px rgba(255, 122, 24, 0.06);
`;

const Icon = styled.svg`
  width: 1.6rem;
  height: 1.6rem;
  color: #ff6b00;
  margin-left: 0.6rem;
`;

const SearchInput = styled.input`
  padding: 0.9rem 1rem 0.9rem 0.8rem;
  margin-left: 0.6rem;
  min-width: 220px;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  background: transparent;
  color: #111;
  outline: none;

  &::placeholder {
    color: #a1a1a1;
    font-weight: 600;
    letter-spacing: 0.4px;
  }

  @media (min-width: 768px) {
    min-width: 420px;
  }
`;

export default Search;
