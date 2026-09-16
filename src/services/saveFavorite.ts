import api from "./api";

export function saveFavorite(jobId: number) {
    return api("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ jobId }),
    });
}