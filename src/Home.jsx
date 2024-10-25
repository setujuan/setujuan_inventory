function Home() {
  return (
    <div className="bg-gray-300 flex flex-col items-center min-h-screen">
      <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen">
        <div className="px-4 py-4 flex flex-col gap-4 h-full justify-center">
          <p className="text-2xl">Setujuan Coffee & Eatery</p>
          <form action="">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full rounded-md"
                name="username"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">password</label>
              <input
                type="password"
                placeholder="Type your password"
                className="input input-bordered w-full rounded-md"
                name="password"
              />
            </div>
          </form>
          <a href="/dashboard" className="btn btn-primary btn-md w-full">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
