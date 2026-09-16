import { useEffect, useState } from "react";
import Card from "../Card/Card";
import type { News } from "../../types/news";
import { useNavigate } from "react-router";
import styles from "./FeaturedNews.module.scss";

type FeaturedNewsProps = {
    news: News[];
};

function FeaturedNews({ news }: FeaturedNewsProps) {
    const navigate = useNavigate()

    const [featuredNews, setFeaturedNews] = useState<News[]>([]);

    // Listen kopieres først så den originale news-array ikke ændres
    // når nyhederne blandes
    useEffect(() => {
        const shuffledNews = [...news].sort(() => Math.random() - 0.5);
        setFeaturedNews(shuffledNews.slice(0, 3));
    }, [news]);

    function formatDate(date: string) {
        const [, month, day] = date.split("T")[0].split("-");

        return `${day}/${month}`;
    }

    return (
        <section className={styles.featuredSection}>
            <h1>Udvalgte nyheder</h1>

            <div className={styles.featuredGrid}>
                {featuredNews.map((item) => (
                    <Card
                        key={item.id}
                        onClick={() =>
                            navigate("/news", {
                                state: { selectedNews: item },
                            })
                        }
                    >
                        <img
                            src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                            alt={item.title}
                        />

                        <div className={styles.cardContent}>
                            <p>
                                {formatDate(item.createdAt)} af {item.author}
                            </p>

                            <p>
                                {item.content.length > 82
                                    ? `${item.content.slice(0, 82)}...`
                                    : item.content}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}

export default FeaturedNews;