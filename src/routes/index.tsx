import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import BarbershopDetails from "@/pages/barbershop-details/Barbershop-details";
import { Navigate } from "react-router-dom";
import { Login } from "@/pages/login";
import Bookings from "@/pages/bookings";
import { Signup } from "@/pages/login/signup";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Home />
          </>
        }
      />
      <Route
        path="/barbershop/:id"
        element={
          <>
            <BarbershopDetails />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/bookings"
        element={
          <PrivateRoute>
            <Bookings />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={
          <h1 className="flex items-center justify-center absolute right-0 top-0 w-full h-full text-2xl font-bold text-gray-500">
            {/*Not Found Route*/}
            {<Navigate to="/" />}
          </h1>
        }
      />
    </Routes>
  );
};
