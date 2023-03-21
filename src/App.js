import './App.css';
import { Routes, Route } from "react-router-dom"; 
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
      <Route path="/" element={ <HomePage/> }/>
      <Route path="/signup" element={ <SignUp/> }/>
      <Route path="/login" element={ <Login/> }/>
    </Routes>
    <Footer/>
    </div>
  );
}
export default App;