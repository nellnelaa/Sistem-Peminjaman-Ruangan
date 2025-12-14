import { useEffect, useState, useCallback } from "react";
import { getLeaderboard } from "../../service/leaderboard";

const LeaderboardTab = ({ achievements = null }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to determine if student is graduated
  const isStudentGraduated = useCallback((graduationYear) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

    // Graduation typically happens in June-July (month 6-7)
    return (
      currentYear > graduationYear ||
      (currentYear === graduationYear && currentMonth >= 6)
    );
  }, []);

  // Function to calculate leaderboard from achievements
  const calculateLeaderboardFromAchievements = useCallback(
    (achievementsData) => {
      const studentPoints = {};

      achievementsData.forEach((achievement) => {
        const student = achievement.students;
        if (student && !isStudentGraduated(student.graduation_year)) {
          const studentId = student.id;
          if (!studentPoints[studentId]) {
            studentPoints[studentId] = {
              id: student.id,
              full_name: student.full_name,
              NIS: student.NIS,
              class_name: student.class_name,
              graduation_year: student.graduation_year,
              total_points: 0,
            };
          }
          studentPoints[studentId].total_points += achievement.points || 0;
        }
      });

      // Convert to array and sort by total points
      return Object.values(studentPoints).sort(
        (a, b) => b.total_points - a.total_points
      );
    },
    [isStudentGraduated]
  );

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        if (achievements) {
          // Use provided achievements data
          const calculatedLeaderboard =
            calculateLeaderboardFromAchievements(achievements);
          setLeaderboard(calculatedLeaderboard);
        } else {
          // Fallback to API call
          const result = await getLeaderboard();
          // Filter out graduated students from API result
          const activeStudents = result.filter(
            (student) => !isStudentGraduated(student.graduation_year)
          );
          setLeaderboard(activeStudents);
        }
      } catch (error) {
        console.error("Gagal mengambil leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [achievements, calculateLeaderboardFromAchievements, isStudentGraduated]);

  const rankIcon = (index) => {
    const baseStyle = "text-xl w-6 flex justify-center"; // fixed width
    switch (index) {
      case 0:
        return <span className={baseStyle}>🥇</span>;
      case 1:
        return <span className={baseStyle}>🥈</span>;
      case 2:
        return <span className={baseStyle}>🥉</span>;
      default:
        return (
          <span className={`${baseStyle} text-gray-500`}>{index + 1}</span>
        );
    }
  };

  return (
    <div className="w-full mt-10 max-w-3xl mx-auto rounded-xl p-4">
      {loading ? (
        <p className="text-center p-8">Memuat data leaderboard...</p>
      ) : leaderboard.length === 0 ? (
        <p className="text-center p-8">
          Belum ada data leaderboard untuk siswa aktif.
        </p>
      ) : (
        <ul className="flex flex-col space-y-3">
          {leaderboard.map((student, index) => (
            <li
              key={student.id}
              className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                {rankIcon(index)}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center font-semibold">
                  {student.full_name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm md:text-base font-medium text-gray-800">
                  {student.full_name}
                </div>
              </div>
              <div className="text-sm md:text-base font-bold text-gray-700">
                {student.total_points} poin
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeaderboardTab;
