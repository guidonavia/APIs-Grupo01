import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Main, Navigator, Sidebar } from "./index"
import { useGlobalContext } from "../context/context"
import CheckoutPage from "../components/CheckoutPage"
//import SellPage from "../components/SellPage"
import { useState } from "react"

const Home = () => {
  const { state } = useGlobalContext()
  const [search, setSearch] = useState("")

  return (
    <Router>
      <div className="App">
        <Navigator search={search} setSearch={setSearch}/>
        <Sidebar isShowing={state.showSidebar} />
        <Routes>
          <Route path="/" element={<Main search={search}/>} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* <Route path="/sell" element={<SellPage />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default Home