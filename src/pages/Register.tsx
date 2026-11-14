import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthLayout from "../components/AuthLayout"
import PasswordInput from "../components/PasswordInput"
import SlowServerHint from "../components/SlowServerHint"
import { registerUser } from "../services/authService"
import { getErrorMessage } from "../utils/errors"

export default function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const tooShort = password.length > 0 && password.length < 8

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setLoading(true)
    try {
      await registerUser({ name, email, password })
      navigate("/login", { state: { email: email.trim().toLowerCase() } })
    } catch (err) {
      setError(getErrorMessage(err, "Registration failed"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Keep every assignment, quiz and deadline in one list."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <p role="alert" className="border-l-2 border-redpen py-1 pl-3 text-sm text-redpen">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="name" className="label">
            Full name
          </label>
          <input
            id="name"
            className="input"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
            minLength={8}
            maxLength={72}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={`mt-1.5 text-sm ${tooShort ? "text-redpen" : "text-pencil"}`}>
            {tooShort ? `${8 - password.length} more characters needed` : "Use 8 or more characters."}
          </p>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      {loading && <SlowServerHint />}
    </AuthLayout>
  )
}
