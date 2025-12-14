// =====================================
// components/Dashboard.jsx (Integrated dengan service langsung)
// =====================================
import React, { useState, useEffect } from "react";
import {
  Users,
  Trophy,
  TrendingUp,
  LayoutDashboard,
  Share2,
  GraduationCap,
} from "lucide-react";
import { getDashboardStats } from "../../service/dashboard";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch dashboard data function
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getDashboardStats(
        selectedPeriod,
        selectedClass || undefined,
        selectedCategory || undefined
      );

      setDashboardData(data);
    } catch (err) {
      console.error("Dashboard stats error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Effect untuk fetch data saat filter berubah
  useEffect(() => {
    fetchDashboardStats();
  }, [selectedPeriod, selectedClass, selectedCategory]);

  // Update stats when dashboard data changes
  useEffect(() => {
    if (dashboardData) {
      const { overview, breakdown } = dashboardData;

      const statsData = [
        {
          title: "Total Students",
          value: overview.students.total.toLocaleString(),
          icon: Users,
          color: "bg-blue-500",
          change: overview.students.change,
          subtitle: `${overview.students.currentPeriod} this ${selectedPeriod}`,
        },
        {
          title: "Total Achievements",
          value: overview.achievements.total.toLocaleString(),
          icon: Trophy,
          color: "bg-green-500",
          change: overview.achievements.change,
          subtitle: `${overview.achievements.currentPeriod} this ${selectedPeriod}`,
        },
        {
          title: "Social Shares",
          value: overview.socialShares.total.toLocaleString(),
          icon: Share2,
          color: "bg-purple-500",
          change: overview.socialShares.change,
          subtitle: `${overview.socialShares.currentPeriod} this ${selectedPeriod}`,
        },
        {
          title: "Class Distribution",
          value: breakdown.byClass.length.toLocaleString(),
          icon: GraduationCap,
          color: "bg-orange-500",
          change: "+0%",
          subtitle: "Active classes",
        },
      ];

      setStats(statsData);
    }
  }, [dashboardData, selectedPeriod]);

  // Handle filter changes
  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleClassChange = (className) => {
    setSelectedClass(className);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">
            Failed to load dashboard
          </div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button
            onClick={fetchDashboardStats}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Student achievement analytics and insights
          </p>
        </div>
        <button
          onClick={fetchDashboardStats}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-semibold mb-4">Dashboard Filters</h2>
        <div className="flex flex-wrap gap-4">
          {/* Period Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="month">Monthly</option>
              <option value="quarter">Quarterly</option>
              <option value="year">Yearly</option>
            </select>
          </div>

          {/* Class Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Classes</option>
              <option value="grade_10">Grade 10</option>
              <option value="grade_11">Grade 11</option>
              <option value="grade_12">Grade 12</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Academic">Academic</option>
              <option value="Non_Academic">Non Academic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Additional Dashboard Content */}
      {dashboardData && (
        <>
          {/* Class Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Class Distribution</h3>
            <div className="space-y-3">
              {dashboardData.breakdown.byClass.map((classItem, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium capitalize">
                    {classItem.className.replace("_", " ")}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {classItem.count} students
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">
              Achievement Categories (This {selectedPeriod})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData.breakdown.byCategory.map((categoryItem, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        categoryItem.category === "Academic"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      }`}
                    ></div>
                    <span className="font-medium">{categoryItem.category}</span>
                  </div>
                  <span className="font-bold text-lg">
                    {categoryItem.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {dashboardData.recent.achievements
                .slice(0, 5)
                .map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-3 border rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        by {achievement.students.full_name} (
                        {achievement.students.class_name})
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(
                          achievement.created_at || achievement.date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        achievement.category_type === "Academic"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {achievement.category_type}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Social Media Platform Stats */}
          {dashboardData.overview.socialShares.platforms && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">
                Social Media Shares by Platform
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dashboardData.overview.socialShares.platforms.map(
                  (platform, index) => (
                    <div
                      key={index}
                      className="text-center p-4 border rounded-lg"
                    >
                      <div className="font-semibold text-lg">
                        {platform.count}
                      </div>
                      <div className="text-sm text-gray-600 capitalize">
                        {platform.platform}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// StatCard component
const StatCard = ({ title, value, icon: Icon, color, change, subtitle }) => {
  const isPositive = change && change.startsWith("+");
  const isNegative = change && change.startsWith("-");

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {change && (
        <div className="mt-4 flex items-center">
          <span
            className={`text-sm font-medium ${
              isPositive
                ? "text-green-600"
                : isNegative
                  ? "text-red-600"
                  : "text-gray-600"
            }`}
          >
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last period</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
