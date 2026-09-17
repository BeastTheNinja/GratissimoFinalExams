import type { Job } from "./Jobs";

export type Favorite = {
    id: number;
    userId: number;
    jobListingId: number;
    jobListing: Job;
};