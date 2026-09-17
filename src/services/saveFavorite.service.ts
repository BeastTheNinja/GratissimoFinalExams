import api from "./api";

export function saveFavorite(jobListingId: number) {
    return api("/api/favorites", {
        method: "POST",
        body: JSON.stringify({ jobListingId }),
    });
}