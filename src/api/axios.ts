import axios from "axios"

// Set VITE_API_URL in a .env file to point at a local backend (see .env.example)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://campusflow-uoi7.onrender.com",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // A 401 from /login just means wrong credentials: let the form show the error.
    // Any other 401 means the session expired, so send the user back to login.
    const isLoginRequest = err.config?.url?.includes("/login")
    if (err.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(err)
  }
)

export default api
