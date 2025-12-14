import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/informasi")({
  component: Informasi,
});

function Informasi() {
  return (
    <>
      <div className="bg-[#003777] min-h-screen pb-10">
        {/* Section: Informasi */}
        <section className="bg-white rounded-3xl text-center px-4 md:px-20 py-12 mb-10">
          <h1 className="text-2xl  md:text-3xl font-bold mb-8">
            Satu Platform, Semua Prestasi — Resmi, Terverifikasi, Menginspirasi.
          </h1>
          <img
            src="/image/informasi-1.png"
            alt="Foto Pembagian Hadiah"
            className="mx-auto rounded-lg mb-6 h-50 md:h-100"
          />
          <p className="text-justify md:text-left max-w-3xl mx-auto text-gray-500">
            <b className="text-black">
              SIPRESMARU (Sistem Rekap Prestasi SMAN 1 Waru) adalah sistem
              berbasis web yang dirancang untuk menampilkan seluruh prestasi
              siswa secara rapi dan terstruktur.
            </b>{" "}
            Sistem ini dikelola langsung oleh petugas sekolah, sehingga data
            yang ditampilkan bersifat resmi dan sudah diverifikasi.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto">
            <div className="hidden md:block" />
            <div>
              <p className="text-justify md:text-left text-gray-500">
                <b className="text-black">
                  Tujuannya? Untuk memberikan apresiasi terbuka
                </b>{" "}
                kepada siswa berprestasi, sekaligus menjadi media promosi
                positif bagi SMANTARU kepada orang tua dan masyarakat.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Menginput Data */}
        <section className="bg-white rounded-3xl py-10 px-6 text-center mb-10">
          <h1 className="text-xl font-bold mb-2">Bagaimana Menginput Data?</h1>
          <img
            src="/image/img-inputdata.png"
            alt="Ilustrasi Input"
            className="mx-auto max-w-[250px]"
          />
          <p className="max-w-xl mx-auto text-sm text-gray-600">
            Untuk menjaga keakuratan dan keabsahan data, hanya petugas sekolah
            yang memiliki akses untuk menginput prestasi ke dalam SIPRESMARU.
            Siswa tidak dapat mengisi secara langsung, namun bisa mengajukan
            data prestasi melalui prosedur resmi.
          </p>
        </section>

        {/* Section: Ajukan Prestasi */}
        <section className="bg-white rounded-3xl py-12 px-6 text-center  mb-10">
          <h2 className="text-xl font-bold mb-2">Ingin Prestasimu Tercatat?</h2>
          <p className="text-sm text-gray-500 mb-4">Ajukan Prestasimu!</p>
          <img
            src="/image/img-catatprestasi.png"
            alt="Ilustrasi Ajukan Prestasi"
            className="mx-auto mb-2 max-w-[250px]"
          />
          <p className="max-w-2xl mx-auto text-sm text-gray-600 mb-6">
            Siswa dapat melaporkan prestasi yang telah diraih melalui formulir
            pengajuan prestasi yang disediakan oleh sekolah melalui Pak Khairul.
            Pastikan menyertakan bukti pendukung seperti sertifikat atau
            dokumentasi lainnya. Petugas akan memverifikasi data sebelum
            ditampilkan di website SIPRESMARU.
          </p>
          <div className="flex flex-row justify-center gap-10 mt-20">
            <img
              src="/image/pak-khairul.png"
              alt="Khairul Anam"
              className="w-30 md:w-40 h-full rounded-md"
            />
            <div className="flex flex-col text-left items-start justify-center">
              <p className="font-medium">Khairul Anwar</p>
              <p className="text-sm text-gray-500 mb-2">
                Staf Kesiswaan SMAN 1 Waru
              </p>
              <a
                href="https://wa.me/62895335665409"
                target="_blank"
                className="bg-green-500 text-white px-3 py-1 rounded-full text-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Section: Scoring */}
        <section className="bg-white rounded-3xl py-12 px-6 text-center">
          <h2 className="text-xl font-bold mb-2">
            Sistem Scoring dan Kategori
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Bagaimana Prestasi Dinilai?
          </p>

          <div className="overflow-x-auto max-w-2xl mx-auto">
            <div className="rounded-3xl border border-gray-300 shadow-lg overflow-hidden w-full">
              <table className="w-full text-sm text-left">
                <thead className="bg-white text-gray-500 border-b border-gray-300">
                  <tr>
                    <th className="p-3 w-[10%]">Kategori</th>
                    <th className="p-3 w-[75%]">Syarat (Subjektif)</th>
                    <th className="p-3 w-[15%]">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white align-top">
                    <td className="p-3">A</td>
                    <td className="p-3">
                      Prestasi pada tingkat nasional/internasional,
                      diselenggarakan oleh instansi pemerintah, meraih Juara 1,
                      akademik
                    </td>
                    <td className="p-3">70-100</td>
                  </tr>
                  <tr className="bg-white align-top">
                    <td className="p-3">B</td>
                    <td className="p-3">
                      Prestasi pada tingkat provinsi/nasional, diselenggarakan
                      oleh pemerintah atau lembaga terpercaya, meraih Juara 2/3
                    </td>
                    <td className="p-3">40-69</td>
                  </tr>
                  <tr className="bg-white align-top">
                    <td className="p-3">C</td>
                    <td className="p-3">
                      Prestasi pada tingkat kota/kabupaten, diselenggarakan oleh
                      non-pemerintah, meraih Juara favorit/partisipasi aktif
                    </td>
                    <td className="p-3">10-39</td>
                  </tr>
                  <tr className="bg-white align-top">
                    <td className="p-3">D</td>
                    <td className="p-3">
                      Prestasi tidak dapat divalidasi atau tidak relevan dengan
                      pengembangan akademik/non-akademik siswa
                    </td>
                    <td className="p-3">0-9</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-400 mt-2 italic">
              *Tabel di atas hanyalah referensi. Segala bentuk pemberian nilai
              dan keputusan akhir diserahkan kepada pihak sekolah.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
