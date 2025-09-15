import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Sidebar } from "./index"
import { useGlobalContext } from "../context/context"
import CheckoutPage from "../components/CheckoutPage"
import SellPage from "../components/SellPage"
import ProductPage from "./ProductPage"
import HomePage from "./HomePage"


const Home = () => {
  const { state } = useGlobalContext()
  
  return (
    <Router>
      <div className="App">
        <Sidebar isShowing={state.showSidebar} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/sell" element={<SellPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Home