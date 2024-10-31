import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx";
import BarangKeluar from "./BarangKeluar.jsx";
import BarangKeluarForm from "./BarangKeluarForm.jsx";
import BarangMasuk from "./BarangMasuk.jsx";
import BarangMasukForm from "./BarangMasukForm.jsx";
import ListBarang from "./ListBarang.jsx";
import ListBarangForm from "./ListBarangForm.jsx";
import EditListBarangForm from "./ListBarangFormEdit.jsx";
import Report from "./Report.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["inventory", "user", "manajemen"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barang-keluar"
          element={
            <ProtectedRoute allowedRoles={["inventory", "user"]}>
              <BarangKeluar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barang-keluar-form"
          element={
            <ProtectedRoute allowedRoles={["inventory", "user"]}>
              <BarangKeluarForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barang-masuk"
          element={
            <ProtectedRoute allowedRoles={["inventory"]}>
              <BarangMasuk />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barang-masuk-form"
          element={
            <ProtectedRoute allowedRoles={["inventory"]}>
              <BarangMasukForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barang"
          element={
            <ProtectedRoute allowedRoles={["inventory", "user", "manajemen"]}>
              <ListBarang />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barang-form"
          element={
            <ProtectedRoute allowedRoles={["inventory"]}>
              <ListBarangForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barang-form-edit"
          element={
            <ProtectedRoute allowedRoles={["inventory"]}>
              <EditListBarangForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute allowedRoles={["inventory", "manajemen"]}>
              <Report />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
