import api from "./api";
import type { CreateAnnonceData } from "../types/annonce";

export function createAnnonce(data: CreateAnnonceData) {
    return api("/api/job-listings", {
        method: "POST",
        body: JSON.stringify(data),
    });
}