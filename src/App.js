import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Dashboard from "./Dashboard.jsx";
import BarangKeluar from "./BarangKeluar.jsx";
import BarangKeluarForm from "./BarangKeluarForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/barang-keluar" element={<BarangKeluar />} />
        <Route path="/barang-keluar-form" element={<BarangKeluarForm />} />
      </Routes>
    </Router>
  );
}

export default App;
