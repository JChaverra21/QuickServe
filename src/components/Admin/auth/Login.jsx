import React, { useState } from "react";

const Login = ({ setIsAdminLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        sessionStorage.setItem("username", username);
        setIsAdminLoggedIn(true);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      {/* Logo */}
      <img src="/Logo.webp" className="h-16 pb-4" alt="UvaLula" />

      {/* Formulario de inicio de sesión */}
      <div className="w-full max-w-md p-4 rounded-md shadow-sm bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
      <p className="items-center px-4 py-2 text-base font-medium text-gray-400">
        Si olvidaste la contraseña contacta a soporte
      </p>
    </div>
  );
};

export default Login;
