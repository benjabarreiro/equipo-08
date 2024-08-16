import "./App.css";
import MainLayout from "./components/MainLayout/MainLayout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CategoriesPage from "./pages/CategoriesPage";
import DetailPage from "./pages/DetailPage";
import AdminPage from "./pages/AdminPage";
import RegisterUser from "./pages/RegisterUser";
import UserLogin from "./pages/UserLogin";
import ConfirmationScreen from "./pages/ConfirmationScreen";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminProtectedRoutes } from "./components/AdminProtectedRoutes";
import BookingPage from "./pages/BookingPage";
import "react-day-picker/dist/style.css";
import { ProductDetailProvider } from "./contexts/ProductDetailContext";
import { BookingProvider } from "./contexts/BookingContext";
import { UserProtectedRoutes } from "./components/UserProtectedRoutes";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import { SearchProvider } from "./contexts/SearchContext";
import { HomeProvider } from "./contexts/HomeContext";
import ManageCities from "./pages/ManageCities";
import ManageCategories from "./pages/ManageCategories";
import MyBookingsPage from "./pages/MyBookingsPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HomeProvider>
          <SearchProvider>
            <ProductDetailProvider>
              <BookingProvider>
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/category/:vehicleTypeId/:vehicleTypeName"
                      element={<CategoriesPage />}
                    />
                    <Route path="/detail/:id" element={<DetailPage />} />

                    <Route
                      path="/registrar-usuario"
                      element={<RegisterUser />}
                    />
                    <Route path="/iniciar-sesion" element={<UserLogin />} />
                    <Route
                      path="/pantalla-confirmacion"
                      element={<ConfirmationScreen />}
                    />
                    <Route
                      path="/success-booking"
                      element={<BookingConfirmationPage />}
                    />
                    <Route element={<AdminProtectedRoutes />}>
                      <Route path="/admin" element={<AdminPage />} />
                      <Route
                        path="/admin/manage-cities"
                        element={<ManageCities />}
                      />
                      <Route
                        path="/admin/manage-categories"
                        element={<ManageCategories />}
                      />
                    </Route>
                    <Route element={<UserProtectedRoutes />}>
                      <Route path="/booking" element={<BookingPage />} />
                      <Route path="/my-bookings" element={<MyBookingsPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </MainLayout>
              </BookingProvider>
            </ProductDetailProvider>
          </SearchProvider>
        </HomeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
