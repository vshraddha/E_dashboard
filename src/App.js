import './App.css';
import Nav from "./components/Nav" 
import Footer from "./components/Footer"
import Signup from "./components/Signup"
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import Addproduct from './components/Addproduct';
import Productlist from './components/Productlist';
import Updateproduct from './components/Updateproduct';

import { BrowserRouter,Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
     

      
      <Routes>

        <Route element = {<PrivateComponent/>}>
     
        <Route path="/" element={<Productlist/>} />
        <Route path="/add" element={<Addproduct/>} />
        <Route path="/update/:id" element={<Updateproduct/>} />
        <Route path="/logout" element={<h1>Logout component</h1>} />
       

        </Route>

        
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>

      
      <Footer/>
     </BrowserRouter>
    </div>
  );
}

export default App;
