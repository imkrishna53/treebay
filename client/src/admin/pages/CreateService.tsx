import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authHeader from "../../utils/authHeader";
import AdminLayout from "../components/AdminLayout";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${apiBaseUrl}/api/services`;
const UPLOAD_API_URL = `${apiBaseUrl}/api/upload`; // You'll need to create this endpoint


export default function CreateService() {
  // In both CreateService.jsx and EditService.jsx
//const UPLOAD_API_URL = '/api/upload'; // Use relative path if using proxy

// Or if not using proxy:
 const UPLOAD_API_URL = `${apiBaseUrl}/api/upload`;
  const navigate = useNavigate();
  const [service, setService] = useState({
    title: "",
    description: "",
    heroDescription: "",
    image: "",
    keyFeaturesDescription: "",
    keyFeatures: [],
    applicationsDescription: "",
    applications: [],
    technicalSpecifications: [],
    whyChooseUs: []
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const  [formData, setFormData] = useState(new FormData());
  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  // Image Upload Handler
  const handleImageUpload = async (e) => {
    

    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
     
      formData.append('image', file);

      const response = await axios.post(UPLOAD_API_URL, formData, {
        headers: {
          ...authHeader(),
          'Content-Type': 'multipart/form-data'
        }
      });

      // Set the image URL returned from the server
      setService({ ...service, image: response.data.imageUrl });
      setImagePreview(URL.createObjectURL(file)); // Create preview
      
    } catch (err) {
      setError("Error uploading image: " + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setService({ ...service, image: "" });
    setImagePreview("");
  };

  // ... (keep all the existing handler functions the same)
  // Key Features Methods
  const handleKeyFeatureChange = (index, field, value) => {
    const newKeyFeatures = [...service.keyFeatures];
    if (!newKeyFeatures[index]) {
      newKeyFeatures[index] = { title: "", description: "" };
    }
    newKeyFeatures[index][field] = value;
    setService({ ...service, keyFeatures: newKeyFeatures });
  };

  const addKeyFeature = () => {
    setService({ 
      ...service, 
      keyFeatures: [...service.keyFeatures, { title: "", description: "" }] 
    });
  };

  const removeKeyFeature = (index) => {
    const newKeyFeatures = service.keyFeatures.filter((_, i) => i !== index);
    setService({ ...service, keyFeatures: newKeyFeatures });
  };

  // Applications Methods
  const handleApplicationChange = (index, field, value) => {
    const newApplications = [...service.applications];
    if (!newApplications[index]) {
      newApplications[index] = { title: "", description: "", features: [""] };
    }
    newApplications[index][field] = value;
    setService({ ...service, applications: newApplications });
  };

  const handleApplicationFeaturesChange = (appIndex, featureIndex, value) => {
    const newApplications = [...service.applications];
    if (!newApplications[appIndex].features) {
      newApplications[appIndex].features = [""];
    }
    newApplications[appIndex].features[featureIndex] = value;
    setService({ ...service, applications: newApplications });
  };

  const addApplicationFeature = (appIndex) => {
    const newApplications = [...service.applications];
    newApplications[appIndex].features.push("");
    setService({ ...service, applications: newApplications });
  };

  const removeApplicationFeature = (appIndex, featureIndex) => {
    const newApplications = [...service.applications];
    newApplications[appIndex].features = newApplications[appIndex].features.filter((_, i) => i !== featureIndex);
    setService({ ...service, applications: newApplications });
  };

  const addApplication = () => {
    setService({ 
      ...service, 
      applications: [...service.applications, { title: "", description: "", features: [""] }] 
    });
  };

  const removeApplication = (index) => {
    const newApplications = service.applications.filter((_, i) => i !== index);
    setService({ ...service, applications: newApplications });
  };

  // Technical Specifications Methods
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...service.technicalSpecifications];
    if (!newSpecs[index]) {
      newSpecs[index] = { name: "", value: "" };
    }
    newSpecs[index][field] = value;
    setService({ ...service, technicalSpecifications: newSpecs });
  };

  const addSpec = () => {
    setService({ 
      ...service, 
      technicalSpecifications: [...service.technicalSpecifications, { name: "", value: "" }] 
    });
  };

  const removeSpec = (index) => {
    const newSpecs = service.technicalSpecifications.filter((_, i) => i !== index);
    setService({ ...service, technicalSpecifications: newSpecs });
  };

  // Why Choose Us Methods
  const handleWhyChooseUsChange = (index, value) => {
    const newWhyChooseUs = [...service.whyChooseUs];
    newWhyChooseUs[index] = value;
    setService({ ...service, whyChooseUs: newWhyChooseUs });
  };

  const addWhyChooseUs = () => {
    setService({ ...service, whyChooseUs: [...service.whyChooseUs, ""] });
  };

  const removeWhyChooseUs = (index) => {
    const newWhyChooseUs = service.whyChooseUs.filter((_, i) => i !== index);
    setService({ ...service, whyChooseUs: newWhyChooseUs });
  };

  const validateForm = () => {
    if (!service.title.trim()) {
      return "Title is required";
    }
    if (!service.description.trim()) {
      return "Description is required";
    }
    if (!service.heroDescription.trim()) {
      return "Hero description is required";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");


  const method = 'POST';
      const res = await fetch(`${apiBaseUrl}/api/s3`, {
      method,
      body: formData,
    });
  const s3resp = await res.json();
  console.log(formData);
  
  console.log(s3resp);
  service.image = s3resp.fileUrl
  
  console.log('image ended')
  
    try {
      await axios.post(API_URL, service, { headers: authHeader() });
      navigate("/admin/services");
    } catch (err) {
      setError("Error creating service: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Service</h1>
          <button 
            onClick={() => navigate("/admin/services")}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Back to Services
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={service.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Ethanol"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={service.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Detailed service description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Description *
                </label>
                <textarea
                  name="heroDescription"
                  value={service.heroDescription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Main description that appears below the title"
                  required
                />
              </div>

              {/* UPDATED IMAGE UPLOAD FIELD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Image
                </label>
                
                {/* Image Preview */}
                {(imagePreview || service.image) && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <div className="relative inline-block">
                      <img 
                        src={imagePreview || service.image} 
                        alt="Service preview" 
                        className="h-32 w-32 object-cover rounded-lg border-2 border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* File Upload Input */}
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <div className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-gray-400 transition-colors">
                      {uploading ? (
                        <div className="flex flex-col items-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-2"></div>
                          <p className="text-sm text-gray-600">Uploading image...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                          <p className="text-xs text-gray-500 mt-1">JPEG, PNG, WebP (Max 5MB)</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                {/* Fallback URL Input */}
                {/* <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Or enter image URL:</p>
                  <input
                    type="url"
                    name="image"
                    value={service.image}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div> */}
              </div>
            </div>
          </div>

          {/* Keep all other sections the same */}
          {/* Key Features & Benefits */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Key Features & Benefits</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <textarea
                name="keyFeaturesDescription"
                value={service.keyFeaturesDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Short description that appears under 'Key Features & Benefits' title"
              />
            </div>

            <div className="space-y-4 mb-4">
              {service.keyFeatures.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">Feature {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeKeyFeature(index)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      type="text"
                      value={feature.title || ""}
                      onChange={(e) => handleKeyFeatureChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Feature title (e.g., Ultra-high Purity)"
                    />
                    <textarea
                      value={feature.description || ""}
                      onChange={(e) => handleKeyFeatureChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Feature description"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addKeyFeature}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
            >
              + Add Feature Section
            </button>
          </div>

          {/* Applications & Industries */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Applications & Industries</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <textarea
                name="applicationsDescription"
                value={service.applicationsDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Short description that appears under 'Applications & Industries' title"
              />
            </div>

            <div className="space-y-4 mb-4">
              {service.applications.map((app, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-900">Application {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeApplication(index)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 mb-4">
                    <input
                      type="text"
                      value={app.title || ""}
                      onChange={(e) => handleApplicationChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Application title (e.g., Industrial Solvent)"
                    />
                    <textarea
                      value={app.description || ""}
                      onChange={(e) => handleApplicationChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Application description"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features/Items</label>
                    <div className="space-y-2 mb-2">
                      {app.features?.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleApplicationFeaturesChange(index, featureIndex, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Feature item"
                          />
                          {app.features.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeApplicationFeature(index, featureIndex)}
                              className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => addApplicationFeature(index)}
                      className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                      + Add Feature Item
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addApplication}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
            >
              + Add Application
            </button>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Technical Specifications</h2>
            
            <div className="space-y-3 mb-4">
              {service.technicalSpecifications.map((spec, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <input
                    type="text"
                    value={spec.name || ""}
                    onChange={(e) => handleSpecChange(index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Spec name (e.g., Purity)"
                  />
                  <input
                    type="text"
                    value={spec.value || ""}
                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Spec value (e.g., 99.9%)"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSpec}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
            >
              + Add Specification
            </button>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Why Choose Us</h2>
            
            <div className="space-y-3 mb-4">
              {service.whyChooseUs.map((point, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => handleWhyChooseUsChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Reason to choose this service"
                  />
                  {service.whyChooseUs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWhyChooseUs(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addWhyChooseUs}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
            >
              + Add Reason
            </button>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button 
              type="button" 
              onClick={() => navigate("/admin/services")}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={loading || uploading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading || uploading}
            >
              {loading ? "Creating Service..." : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}