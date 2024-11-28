import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
