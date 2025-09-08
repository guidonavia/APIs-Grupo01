import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Main from './layout/Main';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {!user ? <Login /> : <Main />}
    </div>
  );
}

export default App;