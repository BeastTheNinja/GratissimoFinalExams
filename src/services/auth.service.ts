import api from "./api";

import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";

export function login(credentials: LoginCredentials) {
  return api<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function register(
  credentials: RegisterCredentials
) {
  return api<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function logout() {
  return api<void>("/auth/logout", {
    method: "POST",
  });
}

export async function isLoggedIn() {
  try {
    await api("/auth/me");

    return true;
  } catch {
    return false;
  }
}
