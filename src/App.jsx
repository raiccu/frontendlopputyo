import './App.css'
import { Link, Outlet } from 'react-router-dom';

function App() {

  

  return (
    <div className="App">
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/CustomerList"}>Customers</Link>
        <Link to={"/TrainingList"}>Training</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
