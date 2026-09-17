import useFetch from "../../hooks/useFetch";
import type { Job } from "../../types/Jobs";
import type { User } from "../../types/user";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import { Cookies } from "react-cookie";
import styles from "./MyAnnouncement.module.scss";
import { delAnnonce } from "../../services/delAnnonce.service";

const cookies = new Cookies();

function MyAnnouncement() {
    const {
        data: announcements,
        loading,
        error,
        refetch,
    } = useFetch<Job[]>("/api/job-listings");

    // bruges til at vise kun egne annoncer.
    const user = cookies.get<User>("user");

    // API'et returnerer alle annoncer, derfor filtreres de på ejerens userId.
    const myAnnouncements = announcements?.filter(
        (announcement) => announcement.userId === user?.id
    );

    if (loading) {
        return <Loading message="Henter dine annoncer..." />;
    }

    if (error) {
        return <p>Der opstod en fejl.</p>;
    }

    // Giver brugeren tydelig feedback hvis der ikke findes egne annoncer.
    if (!myAnnouncements || myAnnouncements.length === 0) {
        return <p>Du har ikke oprettet nogen annoncer endnu.</p>;
    }

    const handleDeleteAnnouncement = async (jobListingId: number) => {
        try {
            await delAnnonce(jobListingId);
            await refetch();
        } catch (error) {
            console.error("Fejl ved sletning af annonce:", error);
        }
    };

    return (
        <section className={styles.announcements}>
            {myAnnouncements.map((announcement) => (
                <article className={styles.card} key={announcement.id}>
                    <h2>{announcement.title}</h2>
                    <div className={styles.info}>
                        <p>{announcement.organization}</p>
                        <p>{announcement.city}</p>
                    </div>
                    <p className={styles.description}>{announcement.description}</p>

                    <Button
                        type="button"
                        variant="danger"
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                    >
                        Slet
                    </Button>
                </article>
            ))}
        </section>
    );
}

export default MyAnnouncement;