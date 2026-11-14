import { useState } from "react"
import { Link } from "react-router-dom"
import api from "../api/axios"
import { getErrorMessage } from "../utils/errors"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError("")

    try {
      const res = await api.post("/login", {
        email,
        password,
      })

      localStorage.setItem("token", res.data.access_token)
      window.location.href = "/dashboard"
    } catch (err: any) {
      setError(getErrorMessage(err, "Login failed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">

      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl w-full max-w-sm mx-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-400 mb-3 text-center">{error}</p>}

        <input
          className="w-full p-3 mb-3 bg-gray-800 rounded"
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          autoComplete="current-password"
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 p-3 rounded transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-400">
          No account? <Link className="text-blue-400" to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}