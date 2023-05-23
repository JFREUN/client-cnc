import "./styles/stylesheet.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import PostDetails from "./pages/PostDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer progressStyle={{ backgroundColor: "#DBE9B7"}} icon={false}/>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignUp />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <Login />{" "}
            </IsAnon>
          }
        />
        <Route path="/gallery" element={<Gallery />} />
        <Route
          path="/profile/:userId"
          element={
            <IsPrivate>
              {" "}
              <Profile />{" "}
            </IsPrivate>
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <IsPrivate>
              {" "}
              <PostDetails />{" "}
            </IsPrivate>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
