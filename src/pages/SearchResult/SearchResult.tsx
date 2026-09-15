import { useSearchParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import type { Job } from "../../types/Jobs";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState } from "react";
import type { FilterData } from "../../types/Filter";
import Filter from "../../components/Filter/Filter";

function SearchResult() {

    // Henter og opdaterer søgeparametrene fra URL'en
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState<FilterData>({
        region: "",
        category: "",
        workType: "",
        workHome: "",
        period: "",
    });

    const queryString = searchParams.toString();

    // Bygger API-endpointet ud fra de aktuelle søgeparametre
    const endpoint = `/api/job-listings${queryString ? `?${queryString}` : ""
        }`;

    // Samler søgetekst og filtre og gemmer dem i URL'en
    function handleSearch(query: string) {
        const params = new URLSearchParams();

        if (query) {
            params.set("q", query);
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });

        setSearchParams(params);
    }

    // Henter jobs fra API'et ud fra de valgte URL-parametre
    const {
        data: jobs,
        loading,
        error,
    } = useFetch<Job[]>(endpoint);

    const regions = [
        ...new Set((jobs ?? []).map((job) => job.region.name)),
    ];

    const categories = [
        ...new Set((jobs ?? []).map((job) => job.jobCategory.name)),
    ];

    const workTypes = [
        ...new Set((jobs ?? []).map((job) => job.workType.type)),
    ];

    if (loading) {
        return <p>Henter jobs...</p>;
    }

    if (error) {
        return <p>Der opstod en fejl.</p>;
    }

    return (
        <>
            <section>
                
                <SearchBar onSearch={handleSearch} />
                <Filter
                    values={filters}
                    regions={regions}
                    categories={categories}
                    workTypes={workTypes}
                    onChange={setFilters}
                    onReset={() =>
                        // Nulstiller både filtrene og søgeparametrene i URL'en
                        setFilters({
                            region: "",
                            category: "",
                            workType: "",
                            workHome: "",
                            period: "",
                        })
                    }
                />
            </section>

            {!jobs || jobs.length === 0 ? (
                <p>Ingen resultater fundet.</p>
            ) : (
                jobs.map((job) => (
                    <article key={job.id}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p>{job.organization}</p>
                        <p>
                            {job.city} -  {job.jobCategory.name} - {job.workType.type}
                        </p>
                    </article>
                ))
            )}
        </>
    );
}

export default SearchResult;