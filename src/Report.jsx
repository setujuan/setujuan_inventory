import React, { useEffect, useState } from "react";
import supabase from "./utils/supabaseClient.js";
import Navigation from "./utils/Navigation";

function Report() {
  const [barangMasuk, setBarangMasuk] = useState([]);
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [barang, setBarang] = useState([]);
  const [barangCount, setBarangCount] = useState([]);
  useEffect(() => {
    const fetchBarangMasuk = async () => {
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
        setBarangMasuk(data);
      }
    };
    const fetchBarangKeluar = async () => {
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
        .eq("aksi", "keluar");

      if (error) {
        console.error("Error fetching items:", error);
      } else {
        setBarangKeluar(data);
      }
    };

    const fetchBarang = async () => {
      const { data, error } = await supabase.from("barang").select("*");

      if (error) {
        console.error("Error fetching barang:", error);
      } else {
        setBarangCount(data.length);
        setBarang(data);
      }
    };

    fetchBarang();
    fetchBarangMasuk();
    fetchBarangKeluar();
  });
  return (
    <>
      <div className="bg-gray-300 flex flex-col items-center min-h-screen">
        <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen pt-8 px-4 overflow-y-auto pb-24">
          <div className="flex flex-col justify-center items-center mt-4 py-8 gap-2 border">
            <p className="text-lg">Total Barang</p>
            <p className="text-2xl font-medium">{barangCount}</p>
          </div>

          <div className="flex flex-col mt-4 py-4 gap-2 border w-full px-4">
            <div className="flex justify-between">
              <p className="">List Barang</p>
            </div>
            {barang.slice(0, 5).map((item) => (
              <div className="flex justify-between" key={item.barang_id}>
                <p className="">{item.nama}</p>
                <p className="">{item.kuantitas}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col mt-4 py-4 gap-2 border w-full px-4">
            <div className="flex justify-between">
              <p className="">List Barang Masuk</p>
            </div>

            {barangMasuk.map((item) => (
              <div className="flex justify-between" key={item.log_id}>
                <p className="">{item.barang.nama}</p>
                <p className=" font-bold">{item.kuantitas_berubah}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col mt-4 py-4 gap-2 border w-full px-4">
            <div className="flex justify-between">
              <p className="">List Barang Keluar</p>
            </div>
            {barangKeluar.map((item) => (
              <div className="flex justify-between" key={item.log_id}>
                <p className="">{item.barang.nama}</p>
                <p className=" font-bold">{item.kuantitas_berubah}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Navigation />
    </>
  );
}

export default Report;
