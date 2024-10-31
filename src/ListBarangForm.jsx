import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./utils/supabaseClient.js";

function ListBarangForm() {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [kuantitas, setKuantitas] = useState("");
  const [gambar, setGambar] = useState(null);
  const [error, setError] = useState("");

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  //   if (file && allowedTypes.includes(file.type)) {
  //     setGambar(file);
  //     setError("");
  //   } else {
  //     setGambar(null); // Set gambar to null if no valid file is selected
  //     setError("Hanya file PNG, JPG, atau JPEG yang diperbolehkan.");
  //     event.target.value = null; // reset input file
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nama || !kuantitas) {
      setError("Please fill in all fields");
      return;
    }

    const { error: insertError } = await supabase.from("barang").insert([
      {
        nama: nama,
        kuantitas: parseInt(kuantitas), // Ensure kuantitas is an integer
      },
    ]);

    if (insertError) {
      console.error("Error inserting log entry:", insertError);
      setError(`Failed to insert data: ${insertError.message}`);
      console.log("Data yang dikirim:", {
        nama,
        kuantitas: parseInt(kuantitas),
      });
    } else {
      navigate("/barang"); // Redirect to barang masuk list
    }
  };

  return (
    <div className="bg-gray-300 flex flex-col items-center min-h-screen">
      <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen pt-8 px-4 overflow-y-auto">
        <div className="border-b pb-4">
          <a href="/barang">Back</a>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-2xl">Tambah Barang</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nama">Nama Produk</label>
            <input
              type="text"
              placeholder="Input Nama"
              className="input input-bordered"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="stok">Stok Produk</label>
            <input
              type="number"
              placeholder="Stok Produk"
              className="input input-bordered"
              value={kuantitas}
              onChange={(e) => setKuantitas(e.target.value)}
              required
            />
          </div>
          {/* <input
            type="file"
            className="file-input file-input-bordered w-full mt-4"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleFileChange}
          /> */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button type="submit" className="btn btn-primary w-full mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListBarangForm;
