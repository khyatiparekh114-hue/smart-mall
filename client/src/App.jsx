import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ScanAndGo from './pages/ScanAndGo/ScanAndGo';
import PreBook from './pages/PreBook/PreBook';
import Cart from './pages/Cart/Cart';
import MyOrders from './pages/Orders/MyOrders';
import PreBookCart from './pages/PreBook/PreBookCart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/scan-and-go" element={<ScanAndGo />} />
      <Route path="/pre-book" element={<PreBook />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/pre-book-cart" element={<PreBookCart />} />
    </Routes>
  );
}

export default App;