import { redirect, useNavigate } from "react-router-dom";

function BarangKeluarForm() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Redirect ke halaman /barang-keluar
    navigate("/barang-keluar");
  };
  const now = new Date();

  // Format tanggal sesuai kebutuhan untuk input type="date" (yyyy-mm-dd)
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  // Format tanggal untuk default value input date
  const formattedDateForInput = `${year}-${month}-${day}`;

  // Format tanggal sesuai kebutuhan untuk placeholder (dd/mm/yy - hh.mm)
  const shortYear = String(year).slice(-2);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const formattedDateForPlaceholder = `${day}/${month}/${shortYear} - ${hours}.${minutes}`;

  return (
    <div className="bg-gray-300 flex flex-col items-center min-h-screen">
      <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen pt-8 px-4 overflow-y-auto">
        <div className="border-b pb-4">
          <a href="/barang-keluar">Back</a>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-2xl">Barang Keluar</p>
        </div>
        <form action="" className="mt-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="produk">Pilih Produk</label>
            <select className="select select-bordered">
              <option disabled selected>
                Sirup ABC
              </option>
              <option>Sirup ABC</option>
              <option>Sirup ABC</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="quantity">Pilih Quantity</label>
            <input
              type="text"
              placeholder="Tambah Quantity"
              className="input input-bordered"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="date">Pilih Date</label>
            <input
              type="date"
              className="input input-bordered"
              defaultValue={formattedDateForInput} // Nilai default untuk input date
              placeholder={formattedDateForPlaceholder} // Placeholder jika diperlukan
            />
          </div>
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-2"
            type="button"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BarangKeluarForm;
