import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import Navigation from "./utils/Navigation";
import { useState, useEffect } from "react";
import supabase from "./utils/supabaseClient.js";

function ListBarang() {
  const [barang, setBarang] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Get the user role from session storage
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      setUserRole(session.role); // Assuming the role is stored in session under 'role'
    }
    const fetchBarang = async () => {
      const { data, error } = await supabase.from("barang").select("*");

      if (error) {
        console.error("Error fetching barang:", error);
      } else {
        setBarang(data);
      }
    };

    fetchBarang();
  }, []);

  return (
    <>
      <div className="bg-gray-300 flex flex-col items-center min-h-screen">
        <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen pt-8 px-4 overflow-y-auto ">
          <div className="flex flex-col">
            <p className="text-2xl">List Barang</p>
            <p className="text-lg font-light text-gray-500">
              Ini adalah list barang kita
            </p>
            {/* <form action="" className="mt-4">
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
            </form> */}
            {userRole === "inventory" && (
              <a href="/barang-form" className="btn btn-primary mt-4">
                Input Barang
              </a>
            )}
          </div>
          <div className="overflow-x-auto px-4 py-4 border mt-4">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th className=" col-span-2">Product Name</th>
                  <th>Stock</th>
                  {userRole === "inventory" && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {barang.map((barang) => (
                  <tr>
                    <td key={barang.id}>{barang.nama}</td>
                    <td key={barang.id}>{barang.kuantitas}</td>
                    <td>
                      {userRole === "inventory" && (
                        <a
                          href={`/barang-form-edit/${barang.barang_id}`}
                          className="btn btn-outline btn-primary btn-sm"
                        >
                          <img
                            src="/icon/edit.png"
                            className="w-[16px]"
                            alt=""
                          />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Navigation />
    </>
  );
}

export default ListBarang;
