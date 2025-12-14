import { Link, useRouterState } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "@tanstack/react-router";
import { setUser, setToken } from "../../redux/slices/auth";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Tags,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Projector,
  DoorClosed,
} from "lucide-react";

// Import context hook - pastikan path sesuai dengan struktur folder Anda
import { useSidebar } from "../../routes/__root"; // Sesuaikan path ini

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { location } = useRouterState();
  const { user } = useSelector((state) => state.auth);

  // Gunakan context untuk state management
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } =
    useSidebar();

  const currentPath = location.pathname;

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/admin",
      exact: true,
    },
    {
      icon: Projector,
      label: "Fasilitas",
      path: "/admin/fasilitas",
      exact: true,
    },
    {
      icon: DoorClosed,
      label: "Ruangan",
      path: "/admin/ruangan",
      exact: true,
    },
    {
      icon: FileText,
      label: "Template Berkas",
      path: "/admin/berkas",
      exact: true,
    },
    {
      icon: LayoutDashboard,
      label: "Peminjaman",
      path: "/admin/peminjaman",
      exact: true,
    },
  ];

  const logout = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate({ to: "/" });
  };

  const goToPublicSite = () => {
    navigate({ to: "/" });
  };

  const isActive = (path, exact = false) => {
    if (exact) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  // Only render on admin routes
  if (!currentPath.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl border-r border-gray-200 z-50
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <img src="/image/logo-upn.png" alt="Logo" className="h-8 w-8" />
                <div>
                  <h2 className="font-bold text-orange-600  text-sm">
                    Admin Panel
                  </h2>
                  <p className="text-xs text-gray-600">Sistem Peminjaman Fasilitas</p>
                </div>
              </div>
            )}

            {/* Collapse Button - Desktop */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </button>

            {/* Close Button - Mobile */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex-1 min-w-0">
              <p className="font-large text-gray-900 truncate">
                {user?.full_name || user?.name || "Admin"}
              </p>
              <p className="text-xs text-orange-600 truncate font-large">
                Administrator
              </p>
            </div>
          </div>
        )}

        {/* Quick Action - Back to Public Site */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={goToPublicSite}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors
              ${isCollapsed ? "justify-center" : ""}
            `}
            title="Visit Public Site"
          >
            <Home size={20} />
            {!isCollapsed && <span className="font-medium">Public Site</span>}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${
                        active
                          ? "bg-orange-100  text-orange-600 border-r-4 border-orange-600  shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      }
                      ${isCollapsed ? "justify-center" : ""}
                    `}
                    title={isCollapsed ? item.label : ""}
                  >
                    <Icon size={20} />
                    {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
              text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200
              ${isCollapsed ? "justify-center" : ""}
            `}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
