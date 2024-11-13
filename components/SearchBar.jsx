import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  //console.log(searchParams.get("page"));
  const handleInputChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());

    //console.log(params);
    if (e) {
      params.set("query", e.target.value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };
  //console.log(query);

  return (
    <form
      onSubmit={handleSearch}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar..."
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginRight: "8px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 12px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#0070f3",
          color: "white",
        }}
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
