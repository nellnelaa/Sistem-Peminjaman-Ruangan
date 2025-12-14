// file: StatistikBar.jsx

const StatistikBar = () => {
  return (
    <div className="flex flex-col sm:flex-row rounded overflow-hidden shadow-md w-full max-w-5xl text-white text-sm font-light">
      {/* Label Statistik */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 px-6 py-4 italic font-semibold flex items-center justify-center sm:justify-start">
        STATISTIK
      </div>

      {/* Data Tahun */}
      <div className="flex-1 bg-gradient-to-r from-blue-500 to-blue-900 px-4 py-4 flex flex-col sm:flex-row items-center justify-around gap-3 sm:gap-0">
        <div className="flex items-center gap-2">
          <span className="opacity-70">TAHUN 2022</span>
          <span className="font-bold text-white">320</span>
        </div>
        <div className="h-px w-4/5 bg-white/30 sm:hidden" />

        <div className="flex items-center gap-2">
          <span className="opacity-70">TAHUN 2023</span>
          <span className="font-bold text-white">124</span>
        </div>
        <div className="h-px w-4/5 bg-white/30 sm:hidden" />

        <div className="flex items-center gap-2">
          <span className="opacity-70">TAHUN 2024</span>
          <span className="font-bold text-white">43</span>
        </div>
        <div className="h-px w-4/5 bg-white/30 sm:hidden" />

        <div className="flex items-center gap-2">
          <span className="opacity-70">TAHUN 2025</span>
          <span className="font-bold text-white">409</span>
        </div>
      </div>
    </div>
  );
};

export default StatistikBar;
