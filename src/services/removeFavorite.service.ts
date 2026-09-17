import api from "./api";

export function removeFavorite(favoriteId: number) {
    return api(`/api/favorites/${favoriteId}`, {
        method: "DELETE",
    });
}