import { useNavigate } from "react-router";
import type { Job } from "../../types/Jobs";
import styles from "./Category.module.scss";

type CategoryProps = {
    jobs: Job[];
};

function Category({ jobs }: CategoryProps) {
    const navigate = useNavigate();

    // Tæller hvor mange jobopslag der findes i hver kategori
    const categoryCounts: Record<string, number> = {};

    jobs.forEach((job) => {
        const categoryName = job.jobCategory.name;

        // Lægger ét til for hver kategori
        categoryCounts[categoryName] =
            (categoryCounts[categoryName] || 0) + 1;
    });

    // Sender brugeren til søgeresultaterne med den valgte kategori
    function showCategory(category: string) {
        const params = new URLSearchParams();
        params.set("category", category);

        navigate(`/searchresult?${params.toString()}`);
    }

    return (
        <section className={styles.categorySection}>
            <h2>Find job ved kategori</h2>

            <div className={styles.categoryGrid}>
                {Object.entries(categoryCounts).map(([category, count]) => (
                    <button
                        key={category}
                        type="button"
                        className={styles.categoryButton}
                        onClick={() => showCategory(category)}
                    >
                        <span>{category}</span>
                        <span className={styles.categoryCount}>
                            {count}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default Category;