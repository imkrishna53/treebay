import { useEffect, useState } from "react";
import axios from "axios";
import { Link  } from "react-router-dom";
import authHeader from "../../utils/authHeader";
import AdminLayout from "../components/AdminLayout";
import { ArrowRight, Plus } from 'lucide-react';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
console.log(apiBaseUrl)
const API_URL = `${apiBaseUrl}/api/services`;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  heroDescription: string;
  keyFeatures?: Array<{ title: string; description: string }>;
  applications?: Array<{ title: string; description: string; features: string[] }>;
}

export default function ServicesListAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(API_URL, { headers: authHeader() });
      setServices(res.data);
    } catch (err) {
      setError("Error fetching services.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }

    setDeleteLoading(id);
    try {
      await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
      setServices(services.filter(service => service._id !== id));
    } catch (err) {
      setError("Error deleting service.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const getFeatureCount = (service: Service) => {
    return service.keyFeatures?.length || 0;
  };

  const getApplicationCount = (service: Service) => {
    return service.applications?.length || 0;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading services...</p>
            </div>
          </div>
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
            <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
            <p className="text-gray-600 mt-1">Manage all your services and their content</p>
          </div>
          <Link to="/admin/services/new">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              Add New Service
            </button>
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Services Grid */}
        {services.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first service.</p>
            <Link to="/admin/services/new">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Create Service
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Service Header */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {service.title}
                    </h3>
                    <Badge variant="secondary" className="flex-shrink-0 ml-2">
                      {service.slug}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {service.heroDescription || service.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{getFeatureCount(service)}</span>
                      <span>Features</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{getApplicationCount(service)}</span>
                      <span>Applications</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{service.technicalSpecifications?.length || 0}</span>
                      <span>Specs</span>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="text-xs text-gray-500 mb-4">
                    Updated: {formatDate(service.updatedAt)}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link to={`/services/${service.slug}`}>
                      <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                        View Live
                      </button>
                    </Link>
                    <Link to={`/admin/services/edit/${service._id}`}>
                      <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(service._id, service.title)}
                      disabled={deleteLoading === service._id}
                      className="px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      {deleteLoading === service._id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {services.length > 0 && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{services.length}</span>
                <span>Total Services</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {services.reduce((acc, service) => acc + getFeatureCount(service), 0)}
                </span>
                <span>Total Features</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  {services.reduce((acc, service) => acc + getApplicationCount(service), 0)}
                </span>
                <span>Total Applications</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}