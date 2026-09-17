import api from "./api";
import type { User } from "../types/user";

export function UpdateUser(data: Partial<User>) {
    return api("/api/users", {
        method: "PATCH",
        body: JSON.stringify({ data }),
    });
}