import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import AllBooks from "./pages/AllBooks/AllBooks";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home"
import { Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import ViewBookDetails from "./components/ViewBookDetails/viewBookDetails.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth.js";

function App() {

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
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/view-book-details/:id" element={ <ViewBookDetails /> }></Route>
        </Routes>
      <Footer />
    </>
  )
}

export default App
