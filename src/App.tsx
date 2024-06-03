import './App.css';


import { Route, Routes } from "react-router-dom";
import ShoppingCart from './pages/ShoppingCart';
import BuyNow from './pages/BuyNow';
import { Link } from 'react-router-dom'
function App() {
  return (
    <div className="w-full">
      {/* <ShoppingCart/> */}
      <Link to='/shopping'>Shopping Card</Link>
      <Link to='/buynow'>Buy now</Link>
      <Routes>
      <Route path='/shopping' element={<ShoppingCart/>}/>
        <Route path='/buynow' element={<BuyNow/>}/>
        /</Routes>

    </div>
  );
}

export default App;
