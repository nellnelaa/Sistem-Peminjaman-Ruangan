import { createFileRoute } from '@tanstack/react-router'
//import { useRef } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Carousel from "../components/Carousel";

export const Route = createFileRoute('/tentangKami')({
  component: TentangKami,
})

function TentangKami() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row  items-center gap-6 px-4 py-16 max-w-6xl mx-auto pt-25">
        <div className="w-full md:w-auto max-w-md md:ml-30">
          <h2 className="text-2xl font-bold mb-4">
            Mencetak Generasi Unggul dan Berprestasi
          </h2>
          <p className="text-sm">
            SMA Negeri 1 Waru, yang berlokasi di Jalan Barito-Wisma Tropodo,
            Sidoarjo, telah berdiri sejak Mei 1981. Sejak awal, sekolah ini
            berkomitmen untuk membentuk insan yang beriman, berakhlak mulia,
            berprestasi, mandiri, berbudaya lingkungan, dan mampu bersaing
            secara global.
          </p>
          <div className="mt-10 mb-5">
            <img
              src="/image/salim.png"
              alt="Siswa Berprestasi"
              className="rounded-lg shadow-md w-full md:w-2/3 object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-auto max-w-md">
          <img
            src="/image/basket1.png"
            alt="Siswa Berprestasi"
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        className="bg-blue-900 text-white px-4 py-16 flex flex-col items-center space-y-16"
        style={{
          boxShadow:
            "inset 0 8px 10px rgba(0,0,0,0.3), inset 0 -8px 10px rgba(0,0,0,0.3), inset 8px 0 10px rgba(0,0,0,0.3), inset -8px 0 10px rgba(0,0,0,0.3)",
        }}
      >
        {/* Vision */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-4xl w-full">
          <div className="w-full md:w-auto max-w-md">
            <h1 className="text-3xl font-bold mb-3">VISION</h1>
            <p>
              Terwujudnya Insan yang Beriman, Berakhlak Mulia, Berprestasi,
              Mandiri, Berbudaya Lingkungan dan Berdaya Saing Global
            </p>
          </div>
          <div className="w-full md:w-auto max-w-md">
            <img
              src="/image/basket2.png"
              alt="Siswa Berprestasi"
              className="rounded-lg shadow-md w-full object-cover"
            />
          </div>
        </div>

        {/* Mission */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-4xl w-full">
          <div className="w-full md:w-auto max-w-md order-2 md:order-1">
            <img
              src="/image/misi.png"
              alt="Siswa Berprestasi"
              className="rounded-lg shadow-md w-full object-cover"
            />
          </div>
          <div className="w-full md:w-auto max-w-md order-1 md:order-2">
            <h1 className="text-3xl font-bold mb-3">MISSION</h1>
            <p>
              SMAN 1 Waru bertujuan membentuk siswa yang beriman dan bertakwa,
              berprestasi di berbagai bidang, mandiri dan berkarakter, peduli
              lingkungan, serta siap beradaptasi dengan perkembangan zaman.
            </p>
          </div>
        </div>
      </section>

      {/* Fasilitas Sekolah */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-8">
          Fasilitas Sekolah
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-8">
          SMANTARU dilengkapi dengan berbagai fasilitas seperti ruang kelas
          modern, laboratorium lengkap, perpustakaan, ruang seni, gazebo, serta
          lingkungan yang asri. Fasilitas ini menjadi bagian penting dalam
          menciptakan suasana belajar yang kondusif dan menyenangkan.
        </p>
        <Carousel />
      </section>

      {/* Location */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-4">Find Us!</h2>

        <div className="w-full h-96 flex justify-center">
          <iframe
            src="https://www.google.com/maps?q=JQV5+X5P,+Jl.+Brantas+Jl.+Barito+Barat,+Tropodo,+Waru,+Sidoarjo&output=embed"
            width="50%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <p className="text-center mt-6">
          Jl. Brantas Jl. Barito Barat, Tropodo Kulon, Tropodo, Kec. Waru,
          Kabupaten Sidoarjo, Jawa Timur 61256
        </p>
      </section>
    </>
  );
}
