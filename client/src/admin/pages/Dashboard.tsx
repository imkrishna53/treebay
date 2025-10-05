import AdminLayout from "../components/AdminLayout";
import useRequireAdmin from "@/hooks/useRequireAdmin";

export default function Dashboard() {
    const checking = useRequireAdmin();
    if (checking) return <div className="p-8">Checking auth...</div>;
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-primary mb-6">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Welcome to the admin dashboard. Manage your application here.
      </p>

      {/* Example Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-3xl font-bold text-primary">120</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Projects</h2>
          <p className="text-3xl font-bold text-primary">45</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-3xl font-bold text-primary">$12.3k</p>
        </div>
      </div>
    </AdminLayout>
  );
}
