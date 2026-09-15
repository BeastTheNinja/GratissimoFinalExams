import { type FormEvent, useState } from "react";
import Button from "../Button/Button";
import SearchIcon from "../../assets/icons/icons8-search-50.svg"

type SearchBarProps = {
    onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {



    const [search, setSearch] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSearch(search.trim());
    }

    return (
        <>
            <h1>Søg Frivilligt arbejde:</h1>
            <form onSubmit={handleSubmit}>
                <img src={SearchIcon} alt="søge ikon" />
                <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Hvad søger du efter?"
                />
                <Button type="submit">
                    Søg
                </Button>
            </form>

        </>
    );
}

export default SearchBar;