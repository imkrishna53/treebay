import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2';  // Import SweetAlert
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CreateOurServices() {
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    image: "",
    features: [],
    path: "",
    badge: "",
  });
  const [image, setImage] = useState(null);
  const [featureInputs, setFeatureInputs] = useState([{}]);
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

  // Add a new feature input field
  const handleAddFeatureInput = () => {
    setFeatureInputs((prev) => [...prev, {}]);
  };

  // Remove a feature input field
  const handleRemoveFeatureInput = (index) => {
    setFeatureInputs((prev) => prev.filter((_, i) => i !== index));
    const updatedFeatures = [...newService.features];
    updatedFeatures.splice(index, 1); 
    setNewService((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  // Handle feature input changes
  const handleFeatureChange = (index, e) => {
    const { value } = e.target;
    const updatedFeatures = [...newService.features];
    updatedFeatures[index] = value;
    setNewService((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Validate the form before submitting
  const validateForm = () => {
    const newErrors = {};

    if (!newService.title) newErrors.title = "Title is required.";
    if (!newService.description) newErrors.description = "Description is required.";
    if (!newService.path) newErrors.path = "Path is required.";
    if (!newService.badge) newErrors.badge = "Badge is required.";
    if (!image) newErrors.image = "Service image is required.";
    if (newService.features.length === 0 || newService.features.some((feature) => !feature.trim())) {
      newErrors.features = "At least one feature is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);  // Set form to submitting state

    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const imageResponse = await fetch(`${apiBaseUrl}/api/upload`, {
          method: "POST",
          body: formData,
        });

        if (!imageResponse.ok) throw new Error("Failed to upload image");

        const imageData = await imageResponse.json();
        imageUrl = imageData.imageUrl;
      } catch (error) {
        console.error(error);
        setIsSubmitting(false);  // Reset submitting state if image upload fails
        return;
      }
    }

    // Prepare the data to be sent to the backend
    const serviceData = { ...newService, image: imageUrl || newService.image };

    try {
      const response = await fetch(`${apiBaseUrl}/api/our-services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (response.status === 201) {
        // Success: show SweetAlert, reset form, and disable the form for 3 seconds
        Swal.fire({
          title: 'Success!',
          text: 'Service created successfully.',
          icon: 'success',
          confirmButtonText: 'Okay',
        });

        // Disable form for 3 seconds and reset the form
        setTimeout(() => {
          setNewService({
            title: "",
            description: "",
            image: "",
            features: [],
            path: "",
            badge: "",
          });
          setFeatureInputs([{}]);
          setIsSubmitting(false);
        }, 3000);
      } else {
        throw new Error("Failed to create service");
      }
    } catch (error) {
      console.error("Error creating service:", error);
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

          <Link to="/admin/create/our-services">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              Add New Service
            </button>
          </Link>
        </div>

        {/* Create Service Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Service</h2>
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
                disabled={isSubmitting}  // Disable if submitting
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
                disabled={isSubmitting}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            {/* Service Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700">Upload Service Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full sm:w-2/3 lg:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                required
                disabled={isSubmitting}
              />
              {image && (
                <div className="mt-2">
                  <p className="text-gray-600">Selected Image: {image.name}</p>
                </div>
              )}
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            {/* Features Input */}
            <div className="mb-4">
              <label className="block text-gray-700">Features</label>
              {featureInputs.map((input, index) => (
                <div key={index} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    value={newService.features[index] || ""}
                    onChange={(e) => handleFeatureChange(index, e)}
                    className="w-full sm:w-2/3 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder={`Feature ${index + 1}`}
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeatureInput(index)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    disabled={isSubmitting}
                  >
                    Remove
                  </button>
                </div>
              ))}
              {errors.features && <p className="text-red-500 text-sm">{errors.features}</p>}

              <button
                type="button"
                onClick={handleAddFeatureInput}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2"
                disabled={isSubmitting}
              >
                Add New Feature
              </button>
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              {errors.badge && <p className="text-red-500 text-sm">{errors.badge}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={isSubmitting}  // Disable submit button if submitting
            >
              {isSubmitting ? "Submitting..." : "Create Service"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
