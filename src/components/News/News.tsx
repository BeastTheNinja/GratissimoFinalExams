import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import type { News } from "../../types/news";
import styles from "./News.module.scss"

type NewsLocationState = {
    selectedNews?: News;
};

function NewsArticle() {
    const location = useLocation();

    // Henter den artikel, der  blev sendt med fra FeaturedNews
    const routeState =
        location.state as NewsLocationState | null;

    const { data: news } =
        useFetch<News[]>("/api/articles");

    // Holder styr på den artikel, der vises øverst på siden
    const [selectedNews, setSelectedNews] =
        useState<News | null>(
            routeState?.selectedNews ?? null
        );

    // Opdaterer den valgte artikel, hvis navigationens state ændrer sig
    useEffect(() => {
        setSelectedNews(routeState?.selectedNews ?? null);
    }, [routeState?.selectedNews]);

    // Viser den valgte artikel og flytter brugeren til toppen af siden
    function handleNewsClick(article: News) {
        setSelectedNews(article);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    function formatDate(date: string) {
        const [, month, day] = date.split("T")[0].split("-");

        return `${day}/${month}`;
    }

    return (
        <main className={styles.container}>
            {selectedNews && (
                <section className={styles.featuredNews}>
                    <img
                        src={`${import.meta.env.VITE_API_URL}${selectedNews.imageUrl}`}
                        alt={selectedNews.title}
                    />
                    <h1>{selectedNews.title}</h1>
                    <h5> d. {formatDate(selectedNews.createdAt)} af {selectedNews.author}</h5>
                    <p>{selectedNews.content}</p>
                </section>
            )}

            <section className={styles.newsSection}>
                <h1>Alle nyheder</h1>

                <div className={styles.newsGrid}>
                    {(news ?? []).map((article) => (
                        <Card
                            key={article.id}
                            onClick={() => handleNewsClick(article)}
                        >
                            <img
                                src={`${import.meta.env.VITE_API_URL}${article.imageUrl}`}
                                alt={article.title}
                            />
                            <p>{formatDate(article.createdAt)} af {article.author}</p>
                            {/* Viser kun de første 82 tegn som en kort forhåndsvisning */}
                            <p>
                                {article.content.length > 82
                                    ? `${article.content.slice(0, 82)}...`
                                    : article.content}
                            </p>
                        </Card>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default NewsArticle;