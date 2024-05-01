import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/Place-Order/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/login-popup/LoginPopup'
import Verify from './pages/Verify/Verify'
import { useState } from 'react'
import MyOrders from './pages/My-orders/MyOrders'

function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/verify-order" element={<Verify />} />
          <Route path='my-orders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
