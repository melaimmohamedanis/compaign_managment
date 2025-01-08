import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/pages/Register';
import Home from './components/pages/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />}>
      
      </Route>
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
