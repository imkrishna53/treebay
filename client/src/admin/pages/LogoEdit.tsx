import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const API_LOGO = `${apiBaseUrl}/api/logo`;

export default function LogoEdit() {
  const [logoUrl, setLogoUrl] = useState("");
  const [newLogo, setNewLogo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const { data } = await axios.get(API_LOGO);
        setLogoUrl(data?.logoUrl || "");
      } catch (err) {
        toast.error("Failed to load logo");
      } finally {
        setLoading(false);
      }
    };
    fetchLogo();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }
    setNewLogo(file);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      let finalUrl = logoUrl;

      // upload new logo
      if (newLogo) {
        const formData = new FormData();
        formData.append("image", newLogo);

        const uploadRes = await fetch(`${apiBaseUrl}/api/s3`, {
          method: "POST",
          body: formData,
        });

        const s3 = await uploadRes.json();
        finalUrl = s3.fileUrl;
      }

      await axios.put(API_LOGO, { logoUrl: finalUrl });

      setLogoUrl(finalUrl);
      setNewLogo(null);

      toast.success("Logo updated successfully!");
    } catch (err) {
      toast.error("Failed to update logo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p className="p-6 text-gray-600">Loading logo...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Website Logo</h1>

        {/* Preview current logo */}
        {logoUrl && !newLogo && (
          <div className="mb-4 relative inline-block">
            <img src={logoUrl} className="h-20 object-contain" />
            <button
              onClick={() => setLogoUrl("")}
              className="absolute top-0 right-0 bg-red-600 text-white px-2 rounded-full text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Preview new selected logo */}
        {newLogo && (
          <div className="mb-4 relative inline-block">
            <img
              src={URL.createObjectURL(newLogo)}
              className="h-20 object-contain"
            />
            <button
              onClick={() => setNewLogo(null)}
              className="absolute top-0 right-0 bg-red-600 text-white px-2 rounded-full text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Upload field */}
        {!logoUrl && !newLogo && (
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="border p-2 rounded w-full"
          />
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Logo"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
