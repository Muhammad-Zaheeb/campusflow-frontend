// Turns any API error into a readable message.
// FastAPI returns `detail` as a string for our own errors,
// and as a list of objects for validation (422) errors.
export function getErrorMessage(err: any, fallback = "Something went wrong"): string {
  const detail = err?.response?.data?.detail

  if (typeof detail === "string") return detail

  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0]
    const field = Array.isArray(first?.loc) ? first.loc[first.loc.length - 1] : ""
    const msg = typeof first?.msg === "string" ? first.msg.replace(/^Value error, /, "") : ""
    if (field === "email") return "Please enter a valid email address"
    if (field === "password") return msg || "Invalid password"
    return msg || fallback
  }

  if (!err?.response) return "Can't reach the server. It may be waking up, so try again in a few seconds."

  return fallback
}
