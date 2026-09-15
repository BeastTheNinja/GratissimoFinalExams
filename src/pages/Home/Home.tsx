import { useState } from "react";
import { useNavigate } from "react-router";
import SearchBar from "../../components/SearchBar/SearchBar";
import Filter from "../../components/Filter/Filter";
import type { FilterData } from "../../types/Filter";
import type { Job } from "../../types/Jobs";
import useFetch from "../../hooks/useFetch";
import Category from "../../components/Category/Category";
import type { News } from "../../types/news";
import FeaturedNews from "../../components/FeaturedNews/FeaturedNews";
import type { Testimony } from "../../types/Testimonies";
import TestimoniesSlider from "../../components/TestimoniesSlider/TestimoniesSlider";

function Home() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterData>({
    region: "",
    category: "",
    workType: "",
    workHome: "",
    period: "",
  });


  const { data: jobs } = useFetch<Job[]>("/api/job-listings");
  const { data: news } = useFetch<News[]>("/api/articles");
  const { data: testimonies } = useFetch<Testimony[]>("/api/testimony")

  // Henter værdier fra jobopslagene og fjerner dubletter til filterets dropdown-menuer
  const regions = [...new Set(
    (jobs ?? []).map((job) => job.region.name)
  )];


  const categories = [...new Set(
    (jobs ?? []).map((job) => job.jobCategory.name)
  )];


  const workTypes = [...new Set(
    (jobs ?? []).map((job) => job.workType.type)
  )];

  function handleSearch(query: string) {

    const params = new URLSearchParams();


    if (query) params.set("q", query);


    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    navigate(`/searchresult?${params.toString()}`);
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
      <section>
        <Category jobs={jobs ?? []} />
      </section>
      <section>
        <FeaturedNews news={news ?? []} />
      </section>
      <section>
        <TestimoniesSlider testimonies={testimonies ?? []} />
      </section>
    </>
  );
}

export default Home;