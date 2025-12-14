import {
  createRootRoute,
  Outlet,
  useRouterState,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useSelector } from "react-redux";
import { useEffect, useState, createContext, useContext } from "react";
import Navbar from "../components/Navbar";
import AdminSidebar from "../components/AdminSidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../components/ScrollToTop";
import "react-confirm-alert/src/react-confirm-alert.css";
import NotFound from "../components/NotFound";

const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
};

function AdminLayoutWrapper() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
        isMobileOpen,
        setIsMobileOpen,
      }}
    >
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? "lg:ml-16" : "lg:ml-64"
          }`}
        >
          <div className="min-h-screen">
            <main className="p-4 lg:p-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}

// function AdminLayoutWrapper() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);

//   return (
//     <SidebarContext.Provider
//       value={{
//         isCollapsed,
//         setIsCollapsed,
//         isMobileOpen,
//         setIsMobileOpen,
//       }}
//     >
//       <div className="flex min-h-screen bg-gray-50">
//         {/* Pindahkan AdminSidebar ke sini */}
//         <AdminSidebar />
//         <div
//           className={`flex-1 transition-all duration-300 ${
//             isCollapsed ? "lg:ml-16" : "lg:ml-64"
//           }`}
//         >
//           <div className="min-h-screen">
//             <main className="p-4 lg:p-8">
//               <Outlet />
//             </main>
//           </div>
//         </div>
//       </div>
//     </SidebarContext.Provider>
//   );
// }

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  component: RootComponent,
});

function RootComponent() {
  //console.log("=== ROOT COMPONENT RENDERED ===");
  const { location } = useRouterState();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, loading, token } = useSelector((state) => state.auth);

  const isAdminRoute = currentPath.startsWith("/admin");
  const isUserAdmin = user?.role_id === 1;

  useEffect(() => {
    if (isAdminRoute && !loading && token) {
      if (!isUserAdmin) {
        toast.error("Access denied. Administrator privileges required.");
        navigate({ to: "/" });
      }
    }
  }, [isAdminRoute, loading, token, isUserAdmin, navigate]);

  if (loading && isAdminRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (isAdminRoute && !isUserAdmin && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin panel. Administrator
            privileges are required.
          </p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {isAdminRoute && isUserAdmin ? (
        // Admin Layout
        <AdminLayoutWrapper />
      ) : (
        // Public Layout
        <>
          <Navbar />
          <main className="pt-20">
            <Outlet />
          </main>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ScrollToTop />
      <TanStackRouterDevtools />
    </>
  );
}
