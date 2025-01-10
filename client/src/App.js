import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Invoice from './components/InvoiceCompenets/InvoiceContainer';
import InvoiceContainer from './components/InvoiceCompenets/InvoiceContainer';
import Navbar from './components/Navbar';
import InvoiceForm from './components/InvoiceCompenets/InvoiceForm';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />}> </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/invoice" element={<InvoiceContainer />}></Route>
      
     
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
