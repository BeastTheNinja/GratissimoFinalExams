import { useEffect, useState } from "react";
import type { Testimony } from "../../types/Testimonies";
import { GoDot, GoDotFill } from "react-icons/go";
import styles from "./TestimoniesSlider.module.scss";

type TestimoniesSliderProps = {
    testimonies: Testimony[];
};

function TestimoniesSlider({
    testimonies,
}: TestimoniesSliderProps) {
    // Holder styr på hvilken testimony der vises
    const [currentIndex, setCurrentIndex] = useState(0);

    // Skifter automatisk til næste testimony hvert 5. sekund
    useEffect(() => {
        if (testimonies.length <= 1) {
            return;
        }

        const interval = setInterval(() => {
            // Starter forfra, når den sidste testimony er vist
            setCurrentIndex((previousIndex) =>
                previousIndex === testimonies.length - 1
                    ? 0
                    : previousIndex + 1
            );
        }, 5000);

        // Stopper intervallet, når komponenten fjernes
        return () => clearInterval(interval);
    }, [testimonies.length]);

    // Viser ingenting, hvis der ikke er hentet nogen testimonies
    if (testimonies.length === 0) {
        return null;
    }
    // Den aktive testimony, som skal vises
    const currentTestimony = testimonies[currentIndex];

    return (
        <section className={styles.slider}>
            <article className={styles.testimony}>
                <h2>{currentTestimony.title}</h2>

                <p className={styles.content}>
                    {currentTestimony.content}
                </p>

                <p className={styles.author}>
                    {currentTestimony.name}
                </p>
            </article>

            <div className={styles.dots}>
                {testimonies.map((testimony, index) => (
                    <button
                        key={testimony.id}
                        type="button"
                        aria-label={`Vis testimony ${index + 1}`}
                        onClick={() => setCurrentIndex(index)}
                    >
                        {index === currentIndex ? (
                            <GoDotFill />
                        ) : (
                            <GoDot />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default TestimoniesSlider;