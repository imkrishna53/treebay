import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";

export default function Query() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contact");

        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const data = await response.json();
        setQueries(data); 
        setLoading(false); 
      } catch (err) {
        setError(err.message); 
        setLoading(false);
      }
    };

    fetchQueries(); 
  }, []); 

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <p className="text-gray-600">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6">
          <p className="text-red-600">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Query Management</h1>
            <p className="text-gray-600 mt-1">Manage all your Queries</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300">#</th>
                <th className="px-4 py-2 border border-gray-300">Full Name</th>
                <th className="px-4 py-2 border border-gray-300">Email</th>
                <th className="px-4 py-2 border border-gray-300">Company</th>
                <th className="px-4 py-2 border border-gray-300">Message</th>
                <th className="px-4 py-2 border border-gray-300">Service</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the queries data and create rows */}
              {queries.map((query, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td> {/* Display row number */}
                  <td className="px-4 py-2 border border-gray-300">{query.fullName}</td>
                  <td className="px-4 py-2 border border-gray-300">{query.email}</td>
                  <td className="px-4 py-2 border border-gray-300">{query.company}</td>
                  <td className="px-4 py-2 border border-gray-300">{query.message}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {query.serviceInterest?.title || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
