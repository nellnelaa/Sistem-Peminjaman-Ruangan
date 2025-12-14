import { useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { register } from "../../service/auth";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [npm, setNpm] = useState("");

  const [prodi, setProdi] = useState("Informatika");
  const [fakultas, setFakultas] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate({ to: "/" });
    }
  }, [navigate, token]);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok");
      return;
    }

    const body = {
      name: fullName,
      email,
      password,
      no_pokok: npm,
      prodi,
      fakultas,
      jabatan: "mahasiswa", 
    };

    const result = await register(body);

    if (result.success) {
      toast.success("Registrasi berhasil! Silakan login.");
      navigate({ to: "/login" });
      return;
    }

    toast.error(result?.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-4 border-gray-300">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src="/image/logo-upn.png" alt="Logo UPN" className="h-16" />
          <div className="text-left">
            <h1 className="text-orange-600 font-bold text-lg leading-tight italic">
              SISTEM
              <br />
              PEMINJAMAN RUANG
              <br />
              SEMI-OTOMATIS
            </h1>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Nama */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Nama lengkap mahasiswa"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="*****@student.upnjatim.ac.id"
              required
            />
          </div>

          {/* NPM */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              NPM
            </label>
            <input
              type="text"
              value={npm}
              onChange={(e) => setNpm(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="220810******"
              required
            />
          </div>

          {/* Prodi */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Prodi
            </label>
            <select
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="Informatika">Informatika</option>
              <option value="Sistem_Informasi">Sistem Informasi</option>
              <option value="Sains_Data">Sains Data</option>
              <option value="Bisnis_Digital">Bisnis Digital</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          {/* Fakultas */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Fakultas
            </label>
            <input
              type="text"
              value={fakultas}
              onChange={(e) => setFakultas(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Fakultas Ilmu Komputer"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Konfirmasi Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
          >
            Daftar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
