import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route path="/products" element={<PrivateRoute></PrivateRoute>} />
      <Route
        path="*"
        element={
          <h1 className="flex items-center justify-center absolute right-0 top-0 w-full h-full text-2xl font-bold text-gray-500">
            Not Founded Route
          </h1>
        }
      />
    </Routes>
  );
};
