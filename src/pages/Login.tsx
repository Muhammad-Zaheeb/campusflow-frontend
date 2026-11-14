import { useState, type FormEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import PasswordInput from "../components/PasswordInput"
import SlowServerHint from "../components/SlowServerHint"
import { loginUser } from "../services/authService"
import { getErrorMessage } from "../utils/errors"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const registeredEmail = (location.state as { email?: string } | null)?.email

  const [email, setEmail] = useState(registeredEmail ?? "")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await loginUser({ email, password })
      navigate("/dashboard", { replace: true })
    } catch (err) {
      setError(getErrorMessage(err, "Login failed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Log in"
      subtitle="Your assignments and deadlines are waiting."
      footer={
        <>
          New to CampusFlow?{" "}
          <Link to="/register" className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
            Create an account
          </Link>
        </>
      }
    >
      {registeredEmail && !error && (
        <p className="mb-6 border-l-2 border-pen py-1 pl-3 text-sm text-ink">
          Account created. Log in with your new password.
        </p>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <p role="alert" className="border-l-2 border-redpen py-1 pl-3 text-sm text-redpen">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            className="input"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <PasswordInput
            id="password"
            required
            autoComplete="current-password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus={Boolean(registeredEmail)}
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      {loading && <SlowServerHint />}
    </AuthLayout>
  )
}
