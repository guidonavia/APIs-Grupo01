import { Main, Navigator, Sidebar } from "./index"
import { useGlobalContext } from "../context/context"

const Home = () => {
  const { state } = useGlobalContext()

  return (
    <div className="App">
      <Navigator />
      <Sidebar isShowing={state.showSidebar} />
      <Main />
    </div>
  )
}

export default Home