import Navigation from "./utils/Navigation";
function Dashboard() {
  return (
    <>
      <div className="bg-gray-300 flex flex-col items-center min-h-screen">
        <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen pt-8 px-4 overflow-y-auto">
          <div className="flex flex-col">
            <p className="text-2xl">Hello Nauval</p>
            <p className="text-lg font-light text-gray-500">
              Let's complete all the task
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <a href="/barangKeluar" className="w-full">
              <div className="flex flex-col items-center justify-center py-4 border gap-2 ">
                <p>Barang Keluar</p>
                <img src="/icon/barangKeluar.png" alt="" className="w-[48px]" />
              </div>
            </a>
            <a href="/barangMasuk" className="w-full">
              <div className="flex flex-col items-center justify-center py-4 border gap-2">
                <p>Barang Masuk</p>
                <img src="/icon/barangMasuk.png" alt="" className="w-[48px]" />
              </div>
            </a>
          </div>

          <div className="flex flex-col justify-center items-center mt-4 py-8 gap-2 border">
            <p className="text-lg">Total Barang</p>
            <p className="text-2xl font-medium">124</p>
          </div>

          <div className="flex gap-2 mt-4">
            <div className="flex flex-col justify-center items-center py-8 gap-2 border w-full">
              <p className="text-lg">Total Barang</p>
              <p className="text-2xl font-medium">124</p>
            </div>
            <div className="flex flex-col justify-center items-center py-8 gap-2 border w-full">
              <p className="text-lg">Total Barang</p>
              <p className="text-2xl font-medium">124</p>
            </div>
          </div>

          <div className="flex flex-col mt-4 py-4 gap-2 border w-full px-4">
            <div className="flex justify-between">
              <p className="">List Barang Hampir Habis</p>
              <a href="stok" className=" underline">
                Lihat Stok
              </a>
            </div>
            <div className="flex justify-between">
              <p className="">ABC Squash</p>
              <p className=" font-bold">1</p>
            </div>
            <div className="flex justify-between">
              <p className="">Sirup BCA Putih</p>
              <p className=" font-bold">1</p>
            </div>
            <div className="flex justify-between">
              <p className="">Gula Putih 2KG</p>
              <p className=" font-bold">1</p>
            </div>
            <div className="flex justify-between">
              <p className="">Kopi Arabika Gayo 500gr</p>
              <p className=" font-bold">1</p>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </>
  );
}

export default Dashboard;
