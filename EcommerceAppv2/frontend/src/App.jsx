import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Layout from './layout';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {!user ? <Login /> : <Layout />}
    </div>
  );
}

export default App;