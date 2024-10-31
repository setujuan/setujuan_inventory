import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./utils/supabaseClient";

function BarangMasukForm() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the "barang" table
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("barang")
        .select("barang_id, nama");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct || !quantity || !date) {
      setError("Please fill in all fields");
      return;
    }

    // Update the barang table's stock and insert into log table
    const { data: barangData, error: fetchError } = await supabase
      .from("barang")
      .select("kuantitas")
      .eq("barang_id", selectedProduct)
      .single();

    if (fetchError) {
      console.error("Error fetching barang quantity:", fetchError);
      setError("Failed to retrieve barang data");
      return;
    }

    const newQuantity = barangData.kuantitas + parseInt(quantity);

    // Update barang quantity
    const { error: updateError } = await supabase
      .from("barang")
      .update({ kuantitas: newQuantity })
      .eq("barang_id", selectedProduct);

    if (updateError) {
      console.error("Error updating barang quantity:", updateError);
      setError("Failed to update barang data");
      return;
    }

    // Insert into log table
    const { error: insertError } = await supabase.from("log").insert([
      {
        user_id: 1, // Replace with actual user ID if available
        barang_id: selectedProduct,
        aksi: "masuk",
        kuantitas_berubah: quantity,
        tanggal: date,
      },
    ]);

    if (insertError) {
      console.error("Error inserting log entry:", insertError);
      setError("Failed to insert log data");
    } else {
      navigate("/barang-masuk"); // Redirect to barang masuk list
    }
  };
  const now = new Date();
  const formattedDateForPlaceholder = `${now
    .getDate()
    .toString()
    .padStart(2, "0")}/${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${String(now.getFullYear()).slice(-2)} - ${now
    .getHours()
    .toString()
    .padStart(2, "0")}.${now.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div className="bg-gray-300 flex flex-col items-center min-h-screen">
      <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen pt-8 px-4 overflow-y-auto">
        <div className="border-b pb-4">
          <a href="/barang-masuk">Back</a>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-2xl">Barang Masuk</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="produk">Pilih Produk</label>
            <select
              className="select select-bordered"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option disabled selected value="">
                Pilih Produk
              </option>
              {products.map((product) => (
                <option key={product.barang_id} value={product.barang_id}>
                  {product.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="quantity">Pilih Quantity</label>
            <input
              type="number"
              placeholder="Tambah Quantity"
              className="input input-bordered"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="date">Pilih Date</label>
            <input
              type="date"
              className="input input-bordered"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              defaultValue={formattedDateForPlaceholder}
            />
          </div>
          <button className="btn btn-primary w-full mt-2" type="submit">
            Submit
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default BarangMasukForm;
