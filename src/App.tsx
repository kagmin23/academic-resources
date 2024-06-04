import './App.css';


import { Route, Routes } from "react-router-dom";
import Contact from './pages/Contact'
import ShoppingCart from './pages/ShoppingCart';
import BuyNow from './pages/BuyNow';
import { Link } from 'react-router-dom'
function App() {
  return (
    <div className="w-full">
      {/* <ShoppingCart/> */}
      <Link to='/shopping' className='mr-6'>Shopping Card</Link>
      <Link to='/buynow'  className='mr-6'>Buy now</Link>
      <Link to='/contact'  className='mr-6'>Contact</Link>
      <Routes>
      <Route path='/shopping' element={<ShoppingCart/>}/>
        <Route path='/buynow' element={<BuyNow/>}/>
        <Route path='/contact' element={<Contact/>}/>

        /</Routes>

    </div>
  );
}

export default App;
