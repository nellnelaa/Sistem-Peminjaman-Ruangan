import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { login } from "../service/auth";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate({ to: "/admin" });
    }
  }, [navigate, token]);

  const onSubmit = async (event) => {
      event.preventDefault();
  
      const body = {
        email,
        password,
      };
  
      const result = await login(body);
      if (result.success) {
        dispatch(setToken(result.data.token));
  
        navigate({ to: "/" });
        return;
      }
  
      toast.error(result?.message);
    };

  return (
    <div className=" flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-4 border-gray-300">
        {/* Header with Logo */}
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
          {/* Email Field */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Masukkan email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Masukkan password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Masuk
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-700">
            Tidak punya akun?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
