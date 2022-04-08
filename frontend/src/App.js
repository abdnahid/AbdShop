import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import ProductPage from "./components/pages/ProductPage";
import CartPage from "./components/pages/CartPage";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import UserProfile from "./components/pages/UserProfile";
import LoginRegister from "./components/pages/LoginRegister";
import Checkout from "./components/pages/Checkout";
import Order from "./components/pages/Order";
import UserList from "./components/pages/UserList";
import UserEditAdmin from "./components/pages/UserEditAdmin";
import ProductList from "./components/pages/ProductList";
import ProductEditAdmin from "./components/pages/ProductEditAdmin";
import OrderListAdmin from "./components/pages/OrderListAdmin";

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
              <Route exact path='/order/:id' element={<Order/>}/>
              <Route exact path='/admin/userlist' element={<UserList/>}/>
              <Route exact path='/admin/productList' element={<ProductList/>}/>
              <Route exact path='/admin/orderList' element={<OrderListAdmin/>}/>
              <Route exact path='/admin/user/:id' element={<UserEditAdmin/>}/>
              <Route exact path='/admin/products/:id' element={<ProductEditAdmin/>}/>
            </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
