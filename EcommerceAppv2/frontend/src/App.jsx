import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Home from './layout/Home';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {!user ? <Login /> : <Home />}
    </div>
  );
}

export default App;

