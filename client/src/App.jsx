import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/user/:id" element={<Navbar />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>}></Route>
      </Routes>
    </>
  );
};

export default App;
