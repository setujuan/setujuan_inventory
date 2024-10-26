import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx";
import BarangKeluar from "./BarangKeluar.jsx";
import BarangKeluarForm from "./BarangKeluarForm.jsx";
import BarangMasuk from "./BarangMasuk.jsx";
import BarangMasukForm from "./BarangMasukForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/barang-keluar" element={<BarangKeluar />} />
        <Route path="/barang-keluar-form" element={<BarangKeluarForm />} />
        <Route path="/barang-masuk" element={<BarangMasuk />} />
        <Route path="/barang-masuk-form" element={<BarangMasukForm />} />
      </Routes>
    </Router>
  );
}

export default App;
