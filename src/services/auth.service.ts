import { Cookies } from "react-cookie";
import api from "./api";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  RegisterResponse,
} from "../types/auth";

const cookies = new Cookies();

export async function login(credentials: LoginCredentials) {
  const response = await api<AuthResponse>("/api/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  cookies.set("accessToken", response.accessToken);
  cookies.set("refreshToken", response.refreshToken);
  cookies.set("user", response.user);

  return response;
}

export async function refreshToken() {
  const token = cookies.get<string>("refreshToken");

  if (!token) {
    throw new Error("No refresh token available");
  }

  const response = await api<AuthResponse>("/api/refresh", {
    method: "POST",
    body: JSON.stringify({
      refreshToken: token,
    }),
  });

  cookies.set("accessToken", response.accessToken);
  cookies.set("refreshToken", response.refreshToken);

  return response;
}
export async function register(credentials: RegisterCredentials) {
  return api<RegisterResponse>("/api/users", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function isLoggedIn() {
  try {
    await api("/api/verify");
    return true;
  } catch {
    return false;
  }
}

export async function logout() {
  const refreshTokenValue = cookies.get<string>("refreshToken");

  try {
    await api("/api/logout", {
      method: "POST",
      body: JSON.stringify({
        refreshToken: refreshTokenValue,
      }),
    });
  } finally {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    cookies.remove("user");
  }
}