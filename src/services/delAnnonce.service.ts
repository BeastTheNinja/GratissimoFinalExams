import api from "./api";

export function delAnnonce(jobListingId: number) {
    return api("/api/job-listings", {
        method: "DELETE",
        body: JSON.stringify({ jobListingId }),
    });
}