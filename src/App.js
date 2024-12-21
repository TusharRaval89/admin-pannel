import logo from "./logo.svg";
import "./App.css";
import Drawer from "./Components/Drawer";
import DemoDrawer from "./Components/Drawer";
import SubCategory from "./Pages/SubCategory";
import QA from "./Pages/QA";
import { Navigate, Route, Routes } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import Category from "./Pages/Category";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <ToastContainer theme="dark"/>

      <Routes>
      <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin">
          <Route index element={<DashBoard />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="category" element={<Category />} />
          <Route path="subcategory" element={<SubCategory />} />
          <Route path="qa" element={<QA />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
