import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import LeaderboardTab from "../components/Leaderboard";
import Select from "react-select";
import PrestasiCard from "../components/PrestasiCard";
import { getAchievements } from "../service/achievement";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/prestasi")({
  component: Prestasi,
});

function Prestasi() {
  const [achievements, setAchievements] = useState([]);
  const [activeTab, setActiveTab] = useState("akademik");
  const [instansi, setInstansi] = useState(null);
  const [tingkatan, setTingkatan] = useState(null);
  const [grade, setGrade] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");

  const isStudentGraduated = (graduationYear) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; 
    return (
      currentYear > graduationYear ||
      (currentYear === graduationYear && currentMonth >= 6)
    );
  };

  const { data: achievementData, isSuccess: isAchievementsSuccess } = useQuery({
    queryKey: [
      "achievements",
      activeTab,
      instansi,
      tingkatan,
      grade,
      searchTitle,
    ],
    queryFn: () =>
      getAchievements({
        category_type:
          activeTab === "akademik"
            ? "Academic"
            : activeTab === "non-akademik"
              ? "Non_Academic"
              : undefined,
        title: searchTitle,
        grade: grade?.value,
        tag:
          instansi?.value === "pemerintah"
            ? "Lembaga Pemerintah"
            : instansi?.value === "non-pemerintah"
              ? "Lembaga Non-Pemerintah"
              : undefined,
        search: searchTitle,
      }),
  });

  console.log(achievementData);

  useEffect(() => {
    if (isAchievementsSuccess && achievementData) {
      setAchievements(achievementData);
    }
  }, [achievementData, isAchievementsSuccess]);

  const instansiOptions = [
    { value: "pemerintah", label: "Pemerintah" },
    { value: "non-pemerintah", label: "Non Pemerintah" },
  ];

  const tingkatanOptions = [
    { value: "internasional", label: "Internasional" },
    { value: "nasional", label: "Nasional" },
  ];

  const gradeOptions = ["A", "B", "C", "D"].map((g) => ({
    value: g,
    label: g,
  }));

  const tabs = [
    { id: "akademik", label: "Prestasi Akademik" },
    { id: "non-akademik", label: "Prestasi Non-Akademik" },
    { id: "leaderboard", label: "Leaderboard" },
    { id: "alumni", label: "Alumni" },
  ];

  const filterAchievements = () => {
    return achievements.filter((a) => {
      const tagList =
        a.tags?.map((t) => t.tag_details?.tag?.toLowerCase()) || [];

      const studentGraduated = isStudentGraduated(a.students?.graduation_year);

      if (activeTab === "alumni") {
        if (!studentGraduated) return false;
      } else if (
        activeTab === "akademik" ||
        activeTab === "non-akademik" ||
        activeTab === "leaderboard"
      ) {
        if (studentGraduated) return false;
      }

      if (activeTab === "akademik") {
        if (a.category_type !== "Academic") return false;
      } else if (activeTab === "non-akademik") {
        if (a.category_type !== "Non_Academic") return false;
      }

      const matchInstansi =
        !instansi ||
        (instansi.value === "pemerintah" &&
          tagList.includes("lembaga pemerintah")) ||
        (instansi.value === "non-pemerintah" &&
          tagList.includes("lembaga non-pemerintah"));

      const matchTingkatan =
        !tingkatan || tagList.includes(tingkatan.value.toLowerCase());

      const matchGrade = !grade || a.grade === grade.value;

      const matchSearch =
        !searchTitle ||
        a.title?.toLowerCase().includes(searchTitle.toLowerCase()) ||
        a.organizer_name?.toLowerCase().includes(searchTitle.toLowerCase()) ||
        a.students?.full_name
          ?.toLowerCase()
          .includes(searchTitle.toLowerCase()) ||
        a.date?.toString().includes(searchTitle);

      return matchInstansi && matchTingkatan && matchGrade && matchSearch;
    });
  };

  return (
    <div className="flex flex-row items-center max-w-6xl mx-auto">
      <div className="min-h-screen bg-white px-4 md:px-16 py-10 w-full">
        <h2 className="text-center text-xl md:text-2xl font-medium mb-6">
          Siswa-siswa berikut telah menunjukkan bahwa{" "}
          <span className="font-bold text-[#003777]">konsistensi</span> dan{" "}
          <span className="font-bold text-[#003777]">dedikasi</span> membawa
          mereka menuju keberhasilan.
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition ${
                activeTab === tab.id
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dropdown Filters - Hide for leaderboard tab */}
        {activeTab !== "leaderboard" && (
          <div className="w-full grid grid-cols-2 md:flex md:flex-row md:items-center mt-5 gap-4 md:gap-6 mb-8 justify-between">
            <div className="col-span-2 md:flex md:flex-row w-full md:w-auto gap-4 md:gap-6 flex-1">
              <div className="col-span-1">
                <Select
                  className="w-full"
                  options={instansiOptions}
                  placeholder="Instansi"
                  value={instansi}
                  onChange={setInstansi}
                  isClearable
                />
              </div>
              <div className="col-span-1">
                <Select
                  className="w-full"
                  options={tingkatanOptions}
                  placeholder="Tingkatan"
                  value={tingkatan}
                  onChange={setTingkatan}
                  isClearable
                />
              </div>
              <div className="col-span-1">
                <Select
                  className="w-full"
                  options={gradeOptions}
                  placeholder="Grade"
                  value={grade}
                  onChange={setGrade}
                  isClearable
                />
              </div>
            </div>

            {/* Search Input */}
            <div className="col-span-2 md:w-64">
              <input
                type="text"
                placeholder="Cari..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "leaderboard" ? (
          <LeaderboardTab
            achievements={achievements.filter(
              (a) => !isStudentGraduated(a.students?.graduation_year)
            )}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filterAchievements().length === 0 ? (
              <h1 className="text-center col-span-full">
                {activeTab === "alumni"
                  ? "Tidak ada data prestasi alumni ditemukan."
                  : "Tidak ada data prestasi ditemukan."}
              </h1>
            ) : (
              filterAchievements().map((achievement) => (
                <PrestasiCard achievement={achievement} key={achievement?.id} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
