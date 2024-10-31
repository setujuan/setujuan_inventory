import React, { useEffect, useState } from "react";
import supabase from "./utils/supabaseClient.js";
import Navigation from "./utils/Navigation";
function BarangMasuk() {
  const now = new Date();

  // Format tanggal sesuai kebutuhan
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear()).slice(-2);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} - ${hours}.${minutes}`;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("log") // Replace with your actual table name
        .select(
          `
          log_id,
          barang_id,
          kuantitas_berubah,
          tanggal,
          barang (nama)  // Replace nama_barang with the actual name field in your barang table
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
  });

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
          <form action="" className="mt-4">
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </form>

          <a href="/barang-masuk-form" className="btn btn-primary mt-4">
            Input Barang Masuk
          </a>
          <div className="overflow-x-auto px-4 py-4 border mt-4">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className=" col-span-2">Product Name</th>
                  <th>Stock</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.log_id}>
                    <td>
                      <div className="flex gap-2 justify-center col-span-2">
                        {/* <img
                      src="/img/images.png"
                      alt=""
                      className="w-[24px] h-[24px] object-cover"
                    /> */}
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
          <div className="join justify-center items-center mt-4">
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="1"
              defaultChecked
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="2"
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="3"
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="4"
            />
          </div>
        </div>
      </div>
      <Navigation />
    </>
  );
}

export default BarangMasuk;
