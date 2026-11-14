import api from "../api/axios"
import type { User } from "../types"

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const res = await api.post("/register", data)
  return res.data
}

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post<{ access_token: string }>("/login", data)
  localStorage.setItem("token", res.data.access_token)
  return res.data
}

export const getMe = async () => {
  const res = await api.get<User>("/me")
  return res.data
}

export const logout = () => {
  localStorage.removeItem("token")
  window.location.href = "/login"
}
