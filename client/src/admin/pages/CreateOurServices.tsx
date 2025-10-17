import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CreateOurServices() {
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    image: null, // Store File object instead of string
    features: [""], // Start with one empty feature
    path: "",
    badge: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle feature input changes
  const handleFeatureChange = (index, e) => {
    const updatedFeatures = [...newService.features];
    updatedFeatures[index] = e.target.value;
    setNewService((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  // Add a new feature input field
  const handleAddFeature = () => {
    setNewService((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  // Remove a feature input field
  const handleRemoveFeature = (index) => {
    if (newService.features.length > 1) {
      const updatedFeatures = newService.features.filter((_, i) => i !== index);
      setNewService((prev) => ({
        ...prev,
        features: updatedFeatures,
      }));
    }
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    
    if (file) {
      // Store the File object directly
      setNewService((prev) => ({
        ...prev,
        image: file,
      }));
      
      // Create preview
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Validate the form before submitting
  const validateForm = () => {
    const newErrors = {};
    if (!newService.title.trim()) newErrors.title = "Title is required.";
    if (!newService.description.trim()) newErrors.description = "Description is required.";
    if (!newService.path.trim()) newErrors.path = "Path is required.";
    if (!newService.badge.trim()) newErrors.badge = "Badge is required.";
    if (!newService.image) newErrors.image = "Service image is required.";
    
    // Validate features
    const validFeatures = newService.features.filter(feature => feature.trim() !== "");
    if (validFeatures.length === 0) {
      newErrors.features = "At least one feature is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission - USING FORMDATA FOR EVERYTHING
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // ✅ Create ONE FormData and append ALL fields
      const formData = new FormData();
      
      // Append text fields
      formData.append("title", newService.title);
      formData.append("description", newService.description);
      formData.append("path", newService.path);
      formData.append("badge", newService.badge);
      
      // Append features array
      newService.features.forEach((feature, index) => {
        if (feature.trim() !== "") {
          formData.append(`features[${index}]`, feature);
        }
      });
      
      // ✅ Append the image file directly
      formData.append("image", newService.image);

      console.log("Sending FormData with fields:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // ✅ Send ONE request with FormData - NO Content-Type header!
      const response = await fetch(`${apiBaseUrl}/api/our-services`, {
        method: "POST",
        body: formData, // Let browser set Content-Type automatically
      });

      if (response.ok) {
        const data = await response.json();
        
        // Success message
        Swal.fire({
          title: 'Success!',
          text: 'Service created successfully.',
          icon: 'success',
          confirmButtonText: 'Okay',
        });

        // Reset form
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
        
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create service");
      }
    } catch (error) {
      console.error("Error creating service:", error);
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to create service. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Service</h1>
            <p className="text-gray-600 mt-1">Fill in the details to create a new service</p>
          </div>

          <Link to="/admin/our-services">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Plus className="h-4 w-4" />
              View Services
            </button>
          </Link>
        </div>

        {/* Create Service Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Service</h2>
          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={newService.title}
                onChange={handleInputChange}
                className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                disabled={isSubmitting}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={newService.description}
                onChange={handleInputChange}
                className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                rows="3"
                disabled={isSubmitting}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Service Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Service Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                disabled={isSubmitting}
              />
              {previewImage && (
                <div className="mt-2">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="w-40 h-40 object-cover rounded-lg border"
                  />
                </div>
              )}
              {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>

            {/* Features Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Features</label>
              {newService.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e)}
                    className="w-full sm:w-2/3 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={`Feature ${index + 1}`}
                    disabled={isSubmitting}
                  />
                  {newService.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400"
                      disabled={isSubmitting}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mt-2 disabled:bg-green-400"
                disabled={isSubmitting}
              >
                Add Feature
              </button>
              {errors.features && <p className="text-red-500 text-sm mt-1">{errors.features}</p>}
            </div>

            {/* Path Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Path</label>
              <input
                type="text"
                name="path"
                value={newService.path}
                onChange={handleInputChange}
                className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                disabled={isSubmitting}
              />
              {errors.path && <p className="text-red-500 text-sm mt-1">{errors.path}</p>}
            </div>

            {/* Badge Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Badge</label>
              <input
                type="text"
                name="badge"
                value={newService.badge}
                onChange={handleInputChange}
                className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                disabled={isSubmitting}
              />
              {errors.badge && <p className="text-red-500 text-sm mt-1">{errors.badge}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Service..." : "Create Service"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}