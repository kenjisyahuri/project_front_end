import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LupaPassword from "./lupapassword";
import Dashboard from "./dashboard";
import "./login.css";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username dan Password wajib diisi");
    } else {
      setError("");

      fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Login failed");
          }
          return response.json();
        })
        .then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/dashboard";
          } else {
            setError("Invalid login response");
          }
        })
        .catch((error) => {
          setError("Invalid username or password");
        });
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0">
      <div className="row w-100 h-100">
        {/* Bagian kiri halaman dengan gambar latar belakang */}
        <div className="col-12 col-md-6 p-0 d-none d-md-block">
          <div
            className="h-100"
            style={{
              backgroundImage: "url('/Life_Cycle-Bg-02-1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        {/* Bagian kanan halaman dengan form login */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-white form-container">
          <div className="w-100 p-4 form-content" style={{ maxWidth: "500px" }}>
            {/* Tampilkan logo dan judul di atas form login dalam satu baris */}
            <div className="d-flex align-items-center mb-4 justify-content-center">
              <img
                src="/Life_Cycle-01-1.png"
                alt="Life Cycle Management Logo"
                className="mb-2 me-2"
                style={{ maxWidth: "60rem", height: "auto" }} // Responsif logo
              />
              <div className="left">
                <h2 style={{ color: "#226195" }}>FITZ</h2>
                <h2 style={{ color: "#000", fontSize: "23px", margin: "0" }}>
                  Integrated Service Operation Tool
                </h2>
              </div>
            </div>

            {/* Tampilkan pesan error */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Form login */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  id="username"
                  placeholder="Masukkan Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-pill"
                  id="password"
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span></span>
                <a
                  href="/lupapassword"
                  className="text-muted"
                  style={{ color: "#226195" }}
                  onClick={LupaPassword}
                >
                  Lupa Password?
                </a>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 mt-3 beta"
                style={{ borderRadius: "20px", padding: "10px 15px" }}
              >
                Masuk
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Styling untuk responsivitas */}
      <style>
        {`
          /* Ketika di layar kecil, gambar akan jadi background form login dan tambahkan padding putih */
          @media (max-width: 768px) {
            .form-container {
              background-image: url('/Life_Cycle-Bg-02-1.png');
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }

            .form-content {
              background-color: rgba(255, 255, 255, 10); /* Tambahkan warna putih semi-transparan */
              padding: 20px; /* Tambahkan padding di sekitar form */
              border-radius: 10px; /* Berikan border radius untuk tampilan lebih rapi */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
