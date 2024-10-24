function Dashboard() {
  return (
    <div className="bg-gray-300 flex flex-col items-center min-h-screen">
      <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen pt-8 px-4">
        <div className="flex flex-col">
          <p className="text-2xl">Hello Nauval</p>
          <p className="text-lg font-light text-gray-500">
            Let's complete all the task
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <a href="/barangMasuk" className="w-full">
            <div className="flex flex-col items-center justify-center py-4 border ">
              <p>Barang Keluar</p>
            </div>
          </a>
          <a href="/barangMasuk" className="w-full">
            <div className="flex flex-col items-center justify-center py-4">
              <p>Barang Masuk</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
