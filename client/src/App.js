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
import ReadCSV from './components/InvoiceCompenets/ReadCSV';
import UserRoute from './components/AuthPages/UserRoute';
import Campaigns from './components/pages/Campaigns';
import ReadCSV_exemple from './components/InvoiceCompenets/ReadCSV_exemple';
import DashboardMain from './components/Dashboard/DashboardMain';
import InvoiceDashboard from './components/Dashboard/InvoiceDashboard';
import PublicRoute from './components/AuthPages/PublicRoute';
import AdminRoute from './components/AuthPages/AdminRoute';
/*
<Routes>
<Route path='/' element={<UserRoute/>}>
<Route path="/" element={<Home />} />
</Route>*/
function App() {
  return (
    <BrowserRouter>
   
        <Routes>
      
       //home
        <Route path="/" element={<PublicRoute />}>  
        <Route path="/" element={<Home/>}/></Route>

    
      <Route path="/register" element={<PublicRoute />}>  
        <Route path="/register" element={<Register/>}/></Route>


      <Route path="/login" element={<PublicRoute />}>  
        <Route path="/login" element={<Login/>}/></Route>
      
      <Route path="/invoices" element={<UserRoute />}>  
      <Route path="/invoices" element={<InvoiceContainer/>}/></Route> 


      <Route path="/compaigns" element={<AdminRoute />}></Route>
      <Route path="/dashboard" element={<DashboardMain />}></Route>
         

      <Route path="/dashboard/invoices" element={<AdminRoute />}>  
      <Route path="/dashboard/invoices" element={<InvoiceDashboard/>}/></Route> 

      <Route path="/dashboard/invoices/:id" element={<AdminRoute />}>  
      <Route path="/dashboard/invoices/:id" element={<InvoiceForm/>}/></Route> 

      
     
    </Routes>
  </BrowserRouter>
   
  );
}

export default App;
