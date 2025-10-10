import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function NewOurServices() {
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    serviceImage: "",
    features: [""], // Ensure there's at least one feature
    path: "",
    badge: "",
  });
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  // Fetch all services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/our-services`);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Handle input change for both adding and editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle feature change dynamically
  const handleFeatureChange = (e, index) => {
    const updatedFeatures = [...newService.features];
    updatedFeatures[index] = e.target.value;
    setNewService((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  // Add a new feature input
  const handleAddFeature = () => {
    setNewService((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  // Remove a feature input
  const handleRemoveFeature = (index) => {
    const updatedFeatures = newService.features.filter((_, i) => i !== index);
    setNewService((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  // Validation function for form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!newService.title) newErrors.title = "Title is required.";
    if (!newService.description) newErrors.description = "Description is required.";
    if (!newService.path) newErrors.path = "Path is required.";
    if (!newService.badge) newErrors.badge = "Badge is required.";
    if (newService.features.some((feature) => !feature.trim())) {
      newErrors.features = "All features must be filled.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle adding or updating a service
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const serviceData = { ...newService };
      const url = isEditMode
        ? `${apiBaseUrl}/api/our-services/${currentServiceId}` // Update URL
        : `${apiBaseUrl}/api/our-services`; // Create URL
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error(isEditMode ? "Failed to update service" : "Failed to create service");
      }

      const data = await response.json();
      setServices((prev) =>
        isEditMode
          ? prev.map((service) => (service.id === currentServiceId ? data : service))
          : [data, ...prev]
      );

      setNewService({
        title: "",
        description: "",
        serviceImage: "",
        features: [""], // Reset the features input
        path: "",
        badge: "",
      });
      setErrors({});
      setIsEditMode(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle editing a service
  const handleEdit = (service) => {
    setIsEditMode(true);
    setCurrentServiceId(service.id);
    setNewService({ ...service, features: service.features || [""] }); // Ensure features are always initialized
  };

  // Handle deleting a service
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/our-services/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete service");

      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
            <p className="text-gray-600 mt-1">View, edit, or delete services</p>
          </div>

          <Link to="/admin/create/our-services">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              Add New Service
            </button>
          </Link>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white shadow-lg rounded-lg p-4">
              <img
                src={`${apiBaseUrl}/${service.serviceImage}`} // Correct image URL
                alt={service.title}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{service.description}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEdit(service)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create/Update Service Form */}
        {isEditMode && (
          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Service</h2>
            <form onSubmit={handleSubmit}>
              {/* Title Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newService.title}
                  onChange={handleInputChange}
                  className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newService.description}
                  onChange={handleInputChange}
                  className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>

              {/* Features Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Features</label>
                {newService.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(e, index)}
                      className="w-full sm:w-2/3 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder={`Feature ${index + 1}`}
                    />
                    {newService.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="text-blue-600"
                >
                  Add Feature
                </button>
                {errors.features && <p className="text-red-500 text-sm">{errors.features}</p>}
              </div>

              {/* Path Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Path</label>
                <input
                  type="text"
                  name="path"
                  value={newService.path}
                  onChange={handleInputChange}
                  className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.path && <p className="text-red-500 text-sm">{errors.path}</p>}
              </div>

              {/* Badge Input */}
              <div className="mb-4">
                <label className="block text-gray-700">Badge</label>
                <input
                  type="text"
                  name="badge"
                  value={newService.badge}
                  onChange={handleInputChange}
                  className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
                {errors.badge && <p className="text-red-500 text-sm">{errors.badge}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isEditMode ? "Update Service" : "Create Service"}
              </button>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
