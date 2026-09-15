import type { Job } from "../../types/Jobs";
import Button from "../Button/Button";
import Favorit from "../../assets/icons/icons8-favorite-100.svg"
import { useState } from "react";
import styles from "./JobList.module.scss"
import Toaster from "../Toaster/Toaster";
import { isLoggedIn } from "../../services/auth.service";

type JobListProps = {
    jobs: Job[];
};

function JobList({ jobs }: JobListProps) {

    // Viser en besked, når brugeren gemmer et job
    const [toast, setToast] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);
    // Begrænser antallet af viste jobs, da pagination ikke er en del af opgaven
    const visibleJobs = jobs.slice(0, 20);

    function formatDate(date: string) {
        const [, month, day] = date.split("T")[0].split("-");

        return `${day}/${month}`;
    }
    // Holder styr på hvilket job der er foldet ud
    const [openJobId, setOpenJobId] = useState<number | null>(null);

    function toggleJob(jobId: number) {
        setOpenJobId((currentId) =>
            currentId === jobId ? null : jobId
        );
    }

    async function handleSave() {
        const loggedIn = await isLoggedIn();

        if (!loggedIn) {
            setToast({
                message: "Du skal være logget ind for at gemme et job.",
                type: "error",
            });

            return;
        }

        setToast({
            message: "Jobbet er gemt.",
            type: "success",
        });
    }

    return (
        <section>
            {jobs.length === 0 ? (
                <p>Ingen resultater fundet.</p>
            ) : (
                visibleJobs.map((job) => {
                    const isOpen = openJobId === job.id;

                    return (
                        <article key={job.id}>
                            <div className={styles.cardHeader}>
                                <h2>{job.title}</h2>
                                <p>{formatDate(job.createdAt)}</p>
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
                                    onClick={() => toggleJob(job.id)}
                                >
                                    {isOpen ? "Luk" : "Åben"}
                                </Button>

                                <Button type="button" onClick={handleSave}>
                                    Gem <img src={Favorit} alt="Favorit ikon" />
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
                })

            )}

            {toast && (
                <Toaster
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </section>
    );
}

export default JobList;