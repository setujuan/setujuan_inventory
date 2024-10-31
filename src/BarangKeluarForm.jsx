import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./utils/supabaseClient"; // Import your Supabase client

function BarangKeluarForm() {
  const navigate = useNavigate();
  const [barangOptions, setBarangOptions] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date
  const [error, setError] = useState("");

  // Load barang data when the component mounts
  useEffect(() => {
    const fetchBarangOptions = async () => {
      const { data, error } = await supabase
        .from("barang")
        .select("barang_id, nama");
      if (error) {
        console.error("Error fetching barang:", error);
      } else {
        setBarangOptions(data);
      }
    };
    fetchBarangOptions();
  }, []);

  // Get user_id from session
  const session = JSON.parse(localStorage.getItem("session"));
  const userId = session?.user_id;

  // Handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBarang || !quantity) {
      setError("Please fill in all fields");
      return;
    }

    // Retrieve current quantity from barang table
    const { data: barangData, error: fetchError } = await supabase
      .from("barang")
      .select("kuantitas")
      .eq("barang_id", selectedBarang)
      .single();

    if (fetchError) {
      console.error("Error fetching barang quantity:", fetchError);
      setError("Failed to retrieve barang data");
      return;
    }

    // Calculate new quantity by subtracting the outgoing amount
    const newQuantity = barangData.kuantitas - quantity;

    if (newQuantity < 0) {
      setError("Insufficient stock for this item");
      return;
    }

    // Update the barang quantity in the barang table
    const { error: updateError } = await supabase
      .from("barang")
      .update({ kuantitas: newQuantity })
      .eq("barang_id", selectedBarang);

    if (updateError) {
      console.error("Error updating barang quantity:", updateError);
      setError("Failed to update barang data");
      return;
    }

    // Insert into log table
    const { error: insertError } = await supabase.from("log").insert([
      {
        user_id: userId,
        barang_id: selectedBarang,
        aksi: "keluar",
        kuantitas_berubah: quantity,
        tanggal: date,
      },
    ]);

    if (insertError) {
      console.error("Error inserting log entry:", insertError);
      setError("Failed to insert data");
    } else {
      navigate("/barang-keluar"); // Redirect on success
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
          <a href="/barang-keluar">Back</a>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-2xl">Barang Keluar</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="produk">Pilih Produk</label>
            <select
              className="select select-bordered"
              onChange={(e) => setSelectedBarang(e.target.value)}
              required
            >
              <option disabled selected>
                Pilih produk...
              </option>
              {barangOptions.map((barang) => (
                <option key={barang.barang_id} value={barang.barang_id}>
                  {barang.nama}
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
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="date">Pilih Date</label>
            <input
              type="date"
              className="input input-bordered"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder={formattedDateForPlaceholder}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="btn btn-primary w-full mt-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BarangKeluarForm;
