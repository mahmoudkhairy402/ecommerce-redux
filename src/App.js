//! Redux
import store from "./Redux/store";
import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
const Home = lazy(() => import("./pages/Home/Home"));
const Search = lazy(() => import("./pages/search/search"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const CategorProducts = lazy(() => import("./pages/category/category"));
const NotFound = lazy(() => import("./pages/notFound/notFound"));
const ProductDetails = lazy(() =>
  import("./pages/productDetails/ProductDetails")
);

const Loading = lazy(() => import("./components/loading/loading"));

function App() {
  return (
    <div className="app">
      <Suspense
        fallback={
          <div
            style={{ height: "100vh" }}
            className="d-flex justify-content-between align-items-center"
          >
            <Loading width={100} />
          </div>
        }
      >
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Routes>
              {["home", "/"].map((path, index) => (
                <Route path={path} element={<Home />} key={index} />
              ))}
              <Route path="cart" element={<Cart />} />{" "}
              <Route path="product/:productId" element={<ProductDetails />} />{" "}
              <Route path="/search/:searchItem" element={<Search />} />{" "}
              <Route path="*" element={<NotFound />} />{" "}
              <Route
                path="/categories/:category"
                element={<CategorProducts />}
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </Provider>
      </Suspense>
    </div>
  );
}

export default App;
