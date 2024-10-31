import { useState } from "react";
import supabase from "./utils/supabaseClient.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Step 1: Query the user table with the entered email
    const { data: user, error } = await supabase
      .from("user")
      .select("user_id, name, email, role, password")
      .eq("name", name)
      .single();

    if (error || !user) {
      setError("User not found or incorrect username");
      return;
    }

    // Step 2: Directly compare passwords (no encryption)
    if (user.password !== password) {
      setError("Incorrect password");
      return;
    }

    // Step 3: Store user session data in localStorage
    const sessionData = {
      key: `user_${user.user_id}`, // unique session key
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    localStorage.setItem("session", JSON.stringify(sessionData));

    // Redirect to /dashboard
    navigate("/dashboard");
  };

  return (
    <div className="bg-gray-300 flex flex-col items-center min-h-screen">
      <div className="flex flex-col w-full sm:max-w-sm bg-white h-screen">
        <div className="px-4 py-4 flex flex-col gap-4 h-full justify-center">
          <p className="text-2xl">Setujuan Coffee & Eatery</p>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full rounded-md"
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Type your password"
                className="input input-bordered w-full rounded-md"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="btn btn-primary btn-md w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
