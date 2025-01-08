import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Login from './components/pages/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />}> </Route>
      <Route path="/login" element={<Login />}></Route>
      
     
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
