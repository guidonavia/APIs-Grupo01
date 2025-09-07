import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Main, Navigator, Sidebar } from "./layout/index"
import { useGlobalContext } from "./context/context"
import CheckoutPage from "./components/CheckoutPage"

function App() {
  const { state } = useGlobalContext()

  return (
    <Router>
      <div className="App">
        <Navigator />
        <Sidebar isShowing={state.showSidebar} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App