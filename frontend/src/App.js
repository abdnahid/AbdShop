import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import ProductPage from "./components/pages/ProductPage";
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="section-padding">
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/product/:id' element={<ProductPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
