import { Routes, Route, HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import TreatmentDetail from "./pages/TreatmentDetail";
import AddProduct from "./pages/AddProduct";

import Register from "./pages/Register";
import Services from "./pages/Services";
import NavbarContext from "./contexts/NavbarContext";
import { useNavbarModel } from "./hooks/useNavbar";
import Footer from "./pages/Footer";
import AddService from "./pages/AddService";
import NotFound from "./pages/NotFound";
import AdminImages from "./pages/AdminImages";
import AdminInfo from "./pages/AdminInfo";
function App() {
  const value = useNavbarModel();
  return (
    <HashRouter>
      <NavbarContext.Provider value={value}>
        <main className="max-w-[1520px] min-w-[320px] m-0 w-full">
          <Navbar />
          <Routes>
            {/* Esto debe de ir en todas las direcciones del navbar */}
            {/* <Route path="/home" element={<Landing to={"/home"} />} /> */}
            <Route exact path="/" element={<Landing to={"/"} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin-images" element={<AdminImages/>} />
            <Route path="/admin-info" element={<AdminInfo/>} />
            <Route path="/services" element={<Services to={"/services"} />} />
            <Route path="/list-products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/detail-treatment/:id/"
              element={<TreatmentDetail />}
            />
            <Route path="/detail-product/:name/" element={<ProductDetails />} />
            <Route path="/detail-treatment" element={<TreatmentDetail />} />
            <Route path="/add-service" element={<AddService />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <Footer />
        </main>
      </NavbarContext.Provider>
    </HashRouter>
  );
}
export default App;
