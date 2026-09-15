import { type FormEvent, useState } from "react";
import Button from "../Button/Button";
import SearchIcon from "../../assets/icons/icons8-search-50.svg"
import styles from "./SearchBar.module.scss";

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
        <section className={styles.searchSection}>
            <h1>Søg frivilligt arbejde:</h1>

            <form onSubmit={handleSubmit}>
                <img src={SearchIcon} alt="" />

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
        </section>
    );
}

export default SearchBar;