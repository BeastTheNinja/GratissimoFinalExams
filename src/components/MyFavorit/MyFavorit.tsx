import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import type { Favorite } from "../../types/favorite";
import Button from "../Button/Button";
import styles from "../JobList/JobList.module.scss";
import { removeFavorite } from "../../services/removeFavorite.service";

function MyFavorit() {
    // Henter brugerens gemte favoritter fra API'et.
    const {
        data: favorites,
        loading,
        error,
        refetch,
    } = useFetch<Favorite[]>("/api/favorites");

    async function handleRemoveFavorite(favoriteId: number) {
        try {
            await removeFavorite(favoriteId);
            await refetch();
        } catch (error) {
            console.error("Fejl ved fjernelse af favorit:", error);
        }
    }

    // Gemmer id'et på den favorit, der aktuelt er foldet ud.
    // Kun én favorit kan være åben ad gangen.
    const [openFavoriteId, setOpenFavoriteId] = useState<number | null>(null);

    // Åbner en favorit eller lukker den, hvis den allerede er åben.
    function toggleFavorite(favoriteId: number) {
        setOpenFavoriteId((currentId) =>
            currentId === favoriteId ? null : favoriteId
        );
    }

    if (loading) {
        return <p>Henter favoritter...</p>;
    }

    if (error) {
        return <p>Kunne ikke hente favoritter.</p>;
    }

    if (!favorites || favorites.length === 0) {
        return <p>Du har ikke gemt nogen favoritter endnu.</p>;
    }


    return (
        <section className={styles.jobList}>

            {favorites.map((favorite) => {
                const job = favorite.jobListing;
                const isOpen = openFavoriteId === favorite.id;

                return (
                    <article key={favorite.id}>
                        <div className={styles.cardHeader}>
                            <h2>{job.title}</h2>
                        </div>

                        <div className={styles.cardInfo}>
                            <p>{job.organization}</p>
                            <p>{job.city}</p>
                        </div>

                        <p>
                            {job.description.length > 82
                                ? `${job.description.slice(0, 82)}...`
                                : job.description}
                        </p>

                        <div className={styles.buttons}>
                            <Button
                                type="button"

                                onClick={() => toggleFavorite(favorite.id)}
                            >
                                {isOpen ? "Luk" : "Åben"}
                            </Button>
                            <Button
                                type="button"
                                variant="danger"
                                onClick={() => handleRemoveFavorite(favorite.id)}
                            >
                                Fjern
                            </Button>
                        </div>

                        {isOpen && (
                            <div className={styles.details}>
                                <p>Kategori: {job.jobCategory.name}</p>
                                <p>Arbejdstid: {job.workType.type}</p>
                                <p>Hjemmearbejde: {job.workHome}</p>
                                <p>Adresse: {job.address}</p>
                                <p>Postnummer: {job.zipcode}</p>
                                <h3>Beskrivelse</h3>
                                <p>{job.description}</p>
                            </div>
                        )}
                    </article>
                );
            })}
        </section>
    );
}

export default MyFavorit;