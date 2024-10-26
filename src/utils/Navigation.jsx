function Navigation() {
  return (
    <div>
      <div className="flex max-w-sm w-full justify-between fixed bottom-0 left-1/2 -translate-x-1/2">
        <a href="/dashboard">
          <img className="w-[24px]" src="/icon/home.png" alt="Home" />
        </a>
        <a href="/barang-keluar">
          <img className="w-[24px]" src="/icon/home.png" alt="Profile" />
        </a>
        <a href="/barang-masuk">
          <img className="w-[24px]" src="/icon/home.png" alt="Settings" />
        </a>
      </div>
    </div>
  );
}

export default Navigation;
