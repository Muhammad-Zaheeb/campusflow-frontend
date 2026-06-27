export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <div className="flex justify-between items-center px-4 sm:px-6 py-4 bg-gray-950 border-b border-gray-800">

      <h1 className="text-lg sm:text-xl font-bold">
        CampusFlow
      </h1>

      <button
        onClick={logout}
        className="bg-red-600 px-3 py-1 rounded text-sm"
      >
        Logout
      </button>

    </div>
  )
}