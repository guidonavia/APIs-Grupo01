import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter} from "react-router-dom"
import App from "./app/App"
import "./assets/styles/index.css"
import { AppProvider } from "./context/context"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
)
