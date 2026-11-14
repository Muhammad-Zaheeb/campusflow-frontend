import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import "./index.css"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2500,
          className: "!rounded-xl !bg-slate-900 !text-white !text-sm dark:!bg-white dark:!text-slate-900",
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
