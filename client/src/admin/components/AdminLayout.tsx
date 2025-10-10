import { removeToken } from "@/utils/auth";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-primary/90 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="flex flex-col space-y-4"> {/* Flex column layout */}
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/services">Services</Link>
          <Link to="/admin/contact">Queries</Link>
          <Link to="/admin/our-services">Our Services</Link>
          <button onClick={logout} className="mt-6 text-sm bg-white/10 p-2 rounded">Logout</button>
        </nav>
      </aside>
      <main className="flex-1 bg-background p-8">{children}</main>
    </div>
  );
}
