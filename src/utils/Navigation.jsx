import { useEffect, useState } from "react";

function Navigation() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Get the user role from session storage
    const session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      setUserRole(session.role); // Assuming the role is stored in session under 'role'
    }
  }, []);

  return (
    <div>
      <div className="flex max-w-sm w-full justify-center gap-8 fixed bottom-0 left-1/2 -translate-x-1/2 py-4 px-4 border-t bg-white">
        <a href="/dashboard">
          <img className="w-[24px]" src="/icon/home.png" alt="Home" />
        </a>

        {/* Conditional rendering based on user role */}
        {userRole === "inventory" && (
          <>
            <a href="/barang-masuk">
              <img
                className="w-[24px]"
                src="/icon/barangMasukMenu.png"
                alt="Barang Masuk"
              />
            </a>
            <a href="/barang">
              <img className="w-[24px]" src="/icon/barang.png" alt="Barang" />
            </a>
          </>
        )}
        {userRole === "inventory" ||
          (userRole === "user" && (
            <>
              <a href="/barang-keluar">
                <img
                  className="w-[24px]"
                  src="/icon/barangKeluarMenu.png"
                  alt="Barang Keluar"
                />
              </a>
            </>
          ))}

        {/* Render report link only for "inventory" and "manajemen" roles */}
        {(userRole === "inventory" || userRole === "manajemen") && (
          <a href="/report">
            <img className="w-[24px]" src="/icon/report.png" alt="Report" />
          </a>
        )}
      </div>
    </div>
  );
}

export default Navigation;
