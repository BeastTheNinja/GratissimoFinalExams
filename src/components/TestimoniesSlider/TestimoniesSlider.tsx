import { useEffect, useState } from "react";
import type { Testimony } from "../../types/Testimonies";
import { GoDot, GoDotFill } from "react-icons/go";

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
        <section>
            <article>
                <h2>{currentTestimony.title}</h2>
                <p>{currentTestimony.content}</p>
                <p>{currentTestimony.name}</p>
            </article>

            <div>
                {testimonies.map((testimony, index) => (
                    <button
                        key={testimony.id}
                        type="button"
                        aria-label={`Vis testimony ${index + 1}`}
                        onClick={() => setCurrentIndex(index)}
                    >
                        {/* Den aktive prik udfyldes, mens de andre forbliver tomme */}
                        {index === currentIndex ? (
                            <GoDotFill size={12} color="#8B0808" />
                        ) : (
                            <GoDot size={12} color="#777" />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default TestimoniesSlider;