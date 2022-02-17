import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import ProductPage from "./components/pages/ProductPage";
import CartPage from "./components/pages/CartPage";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import UserProfile from "./components/pages/UserProfile";
import LoginRegister from "./components/pages/LoginRegister";
import Checkout from "./components/pages/Checkout";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <LoginRegister/>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/product/:id' element={<ProductPage />} />
              <Route exact path='/cart/:id' element={<CartPage />} />
              <Route exact path='/cart' element={<CartPage />} />
              <Route exact path='/profile' element={<UserProfile />} />
              <Route exact path='/shipping' element={<Checkout/>}/>
            </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
