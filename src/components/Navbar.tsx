export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800">
      <h1 className="text-xl font-bold">CampusFlow</h1>

      <button
        onClick={logout}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  )
}