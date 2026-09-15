import { useEffect, useState } from "react";
import Card from "../Card/Card";
import type { News } from "../../types/news";
import { useNavigate } from "react-router";

type FeaturedNewsProps = {
    news: News[];
};

function FeaturedNews({ news }: FeaturedNewsProps) {
    const navigate = useNavigate()
    
    const [featuredNews, setFeaturedNews] = useState<News[]>([]);

    // Bland nyhederne tilfældigt og vis højst tre af dem som featured news
    useEffect(() => {
        const shuffledNews = [...news].sort(() => Math.random() - 0.5);
        setFeaturedNews(shuffledNews.slice(0, 3));
    }, [news]);

    return (
        <section>
            {featuredNews.map((item) => {

                return (
                    <Card key={item.id} title={item.title} onClick={() => navigate("/news")} >
                        <img
                            src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                            alt={item.title}
                        />
                        <p>{item.content}</p>
                    </Card>
                );
            })}
        </section>
    );
}

export default FeaturedNews;