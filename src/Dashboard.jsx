import Navigation from "./utils/Navigation";
import React, { useEffect, useState } from "react";
import supabase from "./utils/supabaseClient.js";
function Dashboard() {
  // total items
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [userRole, setUserRole] = useState("");

  // Out of stock items
  const [outOfStockCount, setOutOfStockCount] = useState(0);

  // Less stock items
  const [lowStockCount, setLowStockCount] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    // Get the user role from session storage
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      setUserRole(session.role); // Assuming the role is stored in session under 'role'
    }
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from("barang") // Replace with your actual table name
        .select("*");

      if (error) {
        console.error("Error fetching items:", error);
      } else {
        // setItems(data);

        // // Calculate total quantity
        // const total = data.reduce((acc, item) => acc + (item.quantity || 0), 0);
        // setTotalQuantity(total);
        setItems(data);
        setTotalItems(data.length);
      }
    };

    const StockEmpty = async () => {
      const { data, error } = await supabase
        .from("barang") // Replace with your actual table name
        .select("*")
        .eq("kuantitas", 0);

      if (error) {
        console.error("Error fetching items:", error);
      } else {
        setOutOfStockCount(data.length);
      }
    };

    const fetchLowStockItems = async () => {
      const { data, error } = await supabase
        .from("barang") // Replace with your actual table name
        .select("*")
        .gt("kuantitas", 0) // Filters items where quantity is more than 3
        .lt("kuantitas", 3); // Filters items where quantity is less than 3

      if (error) {
        console.error("Error fetching low-stock items:", error);
      } else {
        setLowStockItems(data);
        setLowStockCount(data.length); // Counts the number of low-stock items
      }
    };

    fetchLowStockItems();
    fetchItems();
    StockEmpty();
  }, []);

  return (
    <>
      <div className="bg-gray-300 flex flex-col items-center min-h-screen">
        <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen pt-8 px-4 overflow-y-auto pb-24">
          <div className="flex flex-col">
            <p className="text-2xl">Hello Nauval</p>
            <p className="text-lg font-light text-gray-500">
              Let's complete all the task
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            {/* Conditional rendering for "Barang Keluar" */}
            {userRole === "user" && (
              <a href="/barang-keluar-form" className="w-full">
                <div className="flex flex-col items-center justify-center py-4 border gap-2 ">
                  <p>Barang Keluar</p>
                  <img
                    src="/icon/barangKeluar.png"
                    alt=""
                    className="w-[48px]"
                  />
                </div>
              </a>
            )}

            {/* Conditional rendering for "Barang Masuk" */}
            {userRole === "inventory" && (
              <>
                <a href="/barang-masuk-form" className="w-full">
                  <div className="flex flex-col items-center justify-center py-4 border gap-2">
                    <p>Barang Masuk</p>
                    <img
                      src="/icon/barangMasuk.png"
                      alt=""
                      className="w-[48px]"
                    />
                  </div>
                </a>
                <a href="/barang-keluar-form" className="w-full">
                  <div className="flex flex-col items-center justify-center py-4 border gap-2 ">
                    <p>Barang Keluar</p>
                    <img
                      src="/icon/barangKeluar.png"
                      alt=""
                      className="w-[48px]"
                    />
                  </div>
                </a>
              </>
            )}
          </div>

          <div className="flex flex-col justify-center items-center mt-4 py-8 gap-2 border">
            <p className="text-lg">Total Barang</p>
            <p className="text-2xl font-medium">{totalItems}</p>
          </div>

          <div className="flex gap-2 mt-4">
            <div className="flex flex-col justify-center items-center py-8 gap-2 border w-full">
              <p className="text-lg">Total Barang Habis</p>
              <p className="text-2xl font-medium">{outOfStockCount}</p>
            </div>
            <div className="flex flex-col justify-center items-center py-8 gap-2 border w-full">
              <p className="text-lg text-center">Barang Hampir Habis</p>
              <p className="text-2xl font-medium">{lowStockCount}</p>
            </div>
          </div>

          <div className="flex flex-col mt-4 py-4 gap-2 border w-full px-4">
            <div className="flex justify-between">
              <p className="">List Barang Hampir Habis</p>
              <a href="/barang" className=" underline">
                Lihat Stok
              </a>
            </div>
            {lowStockItems.map((item) => (
              <div className="flex justify-between" key={item.id}>
                <p className="">{item.nama}</p>
                <p className=" font-bold">{item.kuantitas}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Navigation />
    </>
  );
}

export default Dashboard;
