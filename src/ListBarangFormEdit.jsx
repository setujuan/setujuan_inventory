import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "./utils/supabaseClient.js";

function EditListBarangForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL
  const [barang, setBarang] = useState({ nama: "", kuantitas: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBarang = async () => {
      const { data, error } = await supabase
        .from("barang")
        .select("*")
        .eq("barang_id", id)
        .single(); // Fetch a single barang based on ID

      if (error) {
        console.error("Error fetching barang:", error);
      } else {
        setBarang(data); // Set the fetched barang data
      }
    };

    fetchBarang();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!barang.nama || !barang.kuantitas) {
      setError("Please fill in all fields");
      return;
    }

    const { error: updateError } = await supabase
      .from("barang")
      .update({
        barang_id: id,
        nama: barang.nama,
        kuantitas: parseInt(barang.kuantitas), // Ensure kuantitas is an integer
      })
      .eq("barang_id", id); // Update the barang by ID

    if (updateError) {
      console.error("Error updating barang:", updateError);
      setError(`Failed to update data: ${updateError.message}`);
    } else {
      navigate("/barang"); // Redirect to barang list
    }
  };

  return (
    <div className="bg-gray-300 flex flex-col items-center min-h-screen">
      <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen pt-8 px-4 overflow-y-auto">
        <div className="border-b pb-4">
          <a href="/barang">Back</a>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-2xl">Edit Barang</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nama">Nama Produk</label>
            <input
              type="text"
              placeholder="Input Nama"
              className="input input-bordered"
              name="nama"
              value={barang.nama} // Bind the input value
              onChange={(e) => setBarang({ ...barang, nama: e.target.value })} // Update state on change
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="stok">Stok Produk</label>
            <input
              type="text"
              placeholder="Stok Produk"
              className="input input-bordered"
              name="stok"
              value={barang.kuantitas} // Bind the input value
              onChange={(e) =>
                setBarang({ ...barang, kuantitas: e.target.value })
              } // Update state on change
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button className="btn btn-primary w-full mt-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditListBarangForm;
