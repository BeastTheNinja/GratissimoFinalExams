import { useSearchParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import type { Job } from "../../types/Jobs";

function SearchResult() {

    const [searchParams] = useSearchParams();


    const queryString = searchParams.toString();


    const endpoint = `/api/job-listings${queryString ? `?${queryString}` : ""
        }`;

    // Henter jobs fra API'et ud fra de valgte URL-parametre
    const {
        data: jobs,
        loading,
        error,
    } = useFetch<Job[]>(endpoint);

    if (loading) {
        return <p>Henter jobs...</p>;
    }

    if (error) {
        return <p>Der opstod en fejl.</p>;
    }

    return (
        <section>
            <h1>Søgeresultater</h1>

            {!jobs || jobs.length === 0 ? (
                <p>Ingen resultater fundet.</p>
            ) : (
                jobs.map((job) => (
                    <article key={job.id}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p>{job.organization}</p>
                        <p>
                            {job.city} · {job.jobCategory.name} · {job.workType.type}
                        </p>
                    </article>
                ))
            )}
        </section>
    );
}

export default SearchResult;