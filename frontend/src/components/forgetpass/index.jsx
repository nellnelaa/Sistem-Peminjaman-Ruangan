import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { forgotPassword } from "../../service/auth";
import { toast } from "react-toastify";

function ForgetPass() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    const body = { email };

    const result = await forgotPassword(body);
    if (result.success) {
      setIsSubmitted(true);
      toast.success(
        "Email reset password telah dikirim! Silakan cek inbox Anda."
      );
      return;
    }

    toast.error(result?.message || "Gagal mengirim email reset password");
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center py-12 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border-4 border-gray-300">
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

          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Email Terkirim!
            </h2>
            <p className="text-gray-600">
              Kami telah mengirimkan link reset password ke email Anda. Silakan
              cek inbox atau folder spam.
            </p>
          </div>

          <button
            onClick={() => navigate({ to: "/login" })}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-25 px-4">
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

        <div className="mb-6">
          <p className="text-gray-700 text-sm leading-relaxed">
            Silakan masukkan alamat email UPN Anda, dan kami akan mengirimkan
            tautan untuk mengatur ulang kata sandi agar Anda dapat memilih yang
            baru.
          </p>
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
              placeholder="*****@student.upnjatim.ac.id"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Kirim Email Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgetPass;
