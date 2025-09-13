import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter} from "react-router-dom"
import App from "./app/App"
import "./assets/styles/index.css"
import { AppProvider } from "./context/context"
import { AuthProvider } from "./context/AuthContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </AppProvider>
  </AuthProvider>
)
