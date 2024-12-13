import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import AllBooks from "./pages/AllBooks/AllBooks";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home"
import { Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth.js";
import Favourites from "./components/Profile/Favourites.jsx";
import OrderHistory from "./components/Profile/OrderHistory.jsx";
import ProfileSettings from "./components/Profile/ProfileSettings.jsx";
import AllOrders from "./pages/AllOrders/AllOrders.jsx";
import AddBook from "./pages/AddBook/AddBook.jsx";
import UpdateBook from "./pages/UpdateBook/UpdateBook.jsx";

function App() {

  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  useEffect(() => {
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [])


  return (
    <>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/books" element={<AllBooks /> }></Route>
          <Route exact path="/cart" element={<Cart /> }></Route>
          <Route exact path="/login" element={<Login /> }></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/profile" element={<Profile />}>
            {role === "user" ? <Route index element={<Favourites />} ></Route> : <Route index element={<AllOrders />} ></Route>}
            {role === "admin" && <Route path="/profile/add-books" element={<AddBook />} ></Route>}
            <Route path="/profile/orderHistory" element={<OrderHistory />} ></Route>
            <Route path="/profile/settings" element={<ProfileSettings />} ></Route>
          </Route>
          <Route exact path="/view-book-details/:id" element={ <ViewBookDetails /> }></Route>
          <Route exact path="update-book/:id" element={ <UpdateBook /> }></Route>
        </Routes>
      <Footer />
    </>
  )
}

export default App
