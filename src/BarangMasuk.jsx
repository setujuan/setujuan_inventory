import React, { useEffect, useState } from "react";
import supabase from "./utils/supabaseClient.js";
import Navigation from "./utils/Navigation";

function BarangMasuk() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const itemsPerPage = 5; // Jumlah item per halaman

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("log")
        .select(
          `
          log_id,
          barang_id,
          kuantitas_berubah,
          tanggal,
          barang (nama)
        `
        )
        .eq("aksi", "masuk");

      if (error) {
        console.error("Error fetching items:", error);
      } else {
        setItems(data);
      }
    };

    fetchItems();
  }, []);

  // Filter items berdasarkan search query
  const filteredItems = items.filter((item) =>
    item.barang.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hitung index awal dan akhir item untuk pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk pindah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="bg-gray-300 flex flex-col items-center min-h-screen">
        <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen pt-8 px-4 overflow-y-auto">
          <div className="flex flex-col">
            <p className="text-2xl">List Barang Masuk</p>
            <p className="text-lg font-light text-gray-500">
              Ini adalah list barang masuk kita
            </p>
          </div>

          {/* Input Search */}
          <form className="mt-4">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
          </form>

          <a href="/barang-masuk-form" className="btn btn-primary mt-4">
            Input Barang Masuk
          </a>

          <div className="overflow-x-auto px-4 py-4 border mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th className="col-span-2">Product Name</th>
                  <th>Stock</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.log_id}>
                    <td>
                      <div className="flex gap-2 justify-center col-span-2">
                        <p>{item.barang.nama}</p>
                      </div>
                    </td>
                    <td>{item.kuantitas_berubah}</td>
                    <td>{item.tanggal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <div className="join">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="join-item btn btn-sm"
              >
                «
              </button>

              <button className="join-item btn-sm">Page {currentPage}</button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage >= Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="join-item btn btn-sm"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </>
  );
}

export default BarangMasuk;
