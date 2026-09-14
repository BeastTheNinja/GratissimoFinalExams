import api from "./api";

type NewsletterResponse = {
    message: string;
};

export function subscribeToNewsletter(email: string) {
    return api<NewsletterResponse>("/api/newsletter", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
}