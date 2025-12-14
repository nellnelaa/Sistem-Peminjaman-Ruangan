import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaGlobe } from "react-icons/fa";
import { createReport } from "../../service/report";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const { mutate: create, isPending } = useMutation({
    mutationFn: (request) => createReport(request),
    onSuccess: () => {
      toast.success("Laporan berhasil dibuat!");
      setName("");
      setEmail("");
      setText("");
    },
    // onError: (error) => {
    //   toast.error(error?.message || "Terjadi kesalahan saat mengirim laporan.");
    // },
    onError: () => {
      toast.error("Terjadi kesalahan saat mengirim laporan.");
    },
  });
  const onSubmit = async (event) => {
    event.preventDefault();

    const request = {
      name,
      email,
      text
    };
    create(request);
  };

  return (
    <footer className="bg-gradient-to-b from-[#0066DD] to-[#003777] text-white pt-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-semibold mb-4">Contact Us!</h2>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nama anda"
              className="p-3 rounded text-black bg-white"
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type="email"
              placeholder="E-mail"
              className="p-3 rounded text-black bg-white"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <textarea
              placeholder="Ketik pesan anda..."
              rows="4"
              className="p-3 rounded text-black bg-white"
              required
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            ></textarea>
            <button
              type="submit"
              disabled={isPending}
              className="text-white py-2 rounded"
              style={{
                background: "linear-gradient(to right, #009140, #23D772)",
              }}
            >
              Submit
            </button>
          </form>
        </div>

        {/* Sitemap */}
        <div className="md:col-span-1 md:ml-20">
          <h2 className="text-3xl font-semibold mb-4">Sitemap</h2>
          <ul className="space-y-2 underline">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/prestasi">Prestasi</a>
            </li>
            <li>
              <a href="/tentangKami">About Us</a>
            </li>
            <li>
              <a href="/informasi">Informasi</a>
            </li>
          </ul>
        </div>

        {/* Logo dan Info Kontak */}
        <div className="md:col-span-2 flex flex-col items-center text-center md:text-left">
          <img
            src="/image/logo.png"
            alt="Logo SMAN 1 WARU"
            className="w-32 mb-4"
          />
          <h2 className="text-xl font-semibold">SMA NEGERI 1 WARU</h2>
          <p className="text-sm mb-4">KABUPATEN SIDOARJO</p>
          <div className="flex flex-col gap-3 items-center md:items-start text-sm">
            <div className="flex items-center gap-2">
              <FaPhoneAlt /> <span>0318661460</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope /> <span>smataru_school@yahoo.co.id</span>
            </div>
            <div className="flex items-center gap-2">
              <FaGlobe /> <span>sman1waru.sch.id</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bawah */}
      <div className="bg-[#EA526F] text-center text-white py-4 mt-12">
        © 2025 Naila & Adeva Foundation. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
