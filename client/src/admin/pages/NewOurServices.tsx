import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function NewOurServices() {
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    image: null,
    features: [""],
    path: "",
    badge: "",
  });
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/our-services`);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (e, index) => {
    const updatedFeatures = [...newService.features];
    updatedFeatures[index] = e.target.value;
    setNewService((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const handleAddFeature = () => {
    setNewService((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = newService.features.filter((_, i) => i !== index);
    setNewService((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewService((prev) => ({
      ...prev,
      image: file,
    }));
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newService.title) newErrors.title = "Title is required.";
    if (!newService.description) newErrors.description = "Description is required.";
    if (!newService.path) newErrors.path = "Path is required.";
    if (!newService.badge) newErrors.badge = "Badge is required.";
    if (newService.features.some((feature) => !feature.trim())) {
      newErrors.features = "All features must be filled.";
    }
    if (!isEditMode && !newService.image) newErrors.image = "Image file is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("title", newService.title);
      formData.append("description", newService.description);
      formData.append("path", newService.path);
      formData.append("badge", newService.badge);
      newService.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });

      if (newService.image instanceof File) {
        formData.append("image", newService.image);
      }

      const url = isEditMode
        ? `${apiBaseUrl}/api/our-services/${currentServiceId}`
        : `${apiBaseUrl}/api/our-services`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit service");
      }

      const data = await response.json();
      setServices((prev) =>
        isEditMode
          ? prev.map((service) =>
              service._id === currentServiceId ? data.service : service
            )
          : [data.service, ...prev]
      );

      setNewService({
        title: "",
        description: "",
        image: null,
        features: [""],
        path: "",
        badge: "",
      });
      setPreviewImage(null);
      setErrors({});
      setIsEditMode(false);
    } catch (error) {
      console.error("Error submitting service:", error);
    }
  };

  const handleEdit = (service) => {
    setIsEditMode(true);
    setCurrentServiceId(service._id);
    setNewService({
      title: service.title,
      description: service.description,
      features: service.features || [""],
      image: service.image,
      path: service.path,
      badge: service.badge,
    });
    setPreviewImage(`${apiBaseUrl}/${service.image}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/our-services/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete service");

      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Services</h1>
          <Link to="/admin/create/our-services">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded">
              <Plus className="h-4 w-4" />
              Add Service
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded shadow p-4">
              <img
                src={`${apiBaseUrl}/${service.image}`}
                alt={service.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="text-lg font-semibold">{service.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{service.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(service)}
                  className="bg-yellow-500 px-4 py-2 rounded text-white"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-600 px-4 py-2 rounded text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4">
            {isEditMode ? "Edit Service" : "Create Service"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={newService.title}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={newService.description}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Features</label>
              {newService.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(e, index)}
                    className="w-full border px-4 py-2 rounded"
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
              <button type="button" onClick={handleAddFeature} className="text-blue-500">
                Add Feature
              </button>
              {errors.features && <p className="text-red-500 text-sm">{errors.features}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Path</label>
              <input
                type="text"
                name="path"
                value={newService.path}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              />
              {errors.path && <p className="text-red-500 text-sm">{errors.path}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Badge</label>
              <input
                type="text"
                name="badge"
                value={newService.badge}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              />
              {errors.badge && <p className="text-red-500 text-sm">{errors.badge}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {previewImage && (
                <img src={previewImage} alt="Preview" className="mt-2 w-40 h-auto rounded" />
              )}
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              {isEditMode ? "Update Service" : "Create Service"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
