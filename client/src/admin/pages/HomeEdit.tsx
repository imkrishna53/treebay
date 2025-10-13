import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import { Phone } from "lucide-react";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


const API_URL = `${apiBaseUrl}/api/home`;
const API_URL_INFO = `${apiBaseUrl}/api/info`;

export default function HomeEdit() {
  const [headerDescription, setHeaderDescription] = useState("");
  const [heroyearsExperience, setYearsExperience] = useState("");
  const [heroprojectsCompleted, setProjectCompleted] = useState("");
  const [heroqualityRating, setQualityRating] = useState("");
  const [herosupportAvailable, setSupportAvailable] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setsaved] = useState("");

  const [Infomail,setInfomail]= useState("");
  const [Infophone,setInfophone]= useState("");
  const [Infoaddress,setInfoaddress]= useState("");
  const [Infoface,setInfoface]= useState("");
  const [Infoinsta,setInfoinsta]= useState("");
  const [Infotwit,setInfotwit]= useState("");



  // ✅ Fetch current description from backend
  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const { data: homeData } = await axios.get(API_URL);
        
        setHeaderDescription(homeData.description || "");
        setYearsExperience(homeData.yearsExperience || "");
        setProjectCompleted(homeData.projectsCompleted || "");
        setQualityRating(homeData.qualityRating || "");
        setSupportAvailable(homeData.supportAvailable || "");

        // Fetch info data
        const { data: infoData } = await axios.get(API_URL_INFO);
        // console.log("Info Data:", infoData);

        setInfomail(infoData.email || "");
        setInfophone(infoData.phone || "");
        setInfoaddress(infoData.address || ""); // lowercase 'address' if that’s your backend field
        setInfoface(infoData.social?.facebook || "");
        setInfoinsta(infoData.social?.instagram || "");
        setInfotwit(infoData.social?.twitter || "");

      } catch (error) {
        console.error(error);
        setError("Failed to fetch current header description");
      } finally {
        setLoading(false);
      }
    };
    fetchHeader();
  }, []);

  // ✅ Handle update/save
  const handleSave = async () => {
    try {
      setSaving(true);
      console.log({ description: headerDescription, yearsExperience : heroyearsExperience, qualityRating : heroqualityRating, projectsCompleted : heroprojectsCompleted })
      await axios.put(API_URL, { description: headerDescription, yearsExperience : heroyearsExperience, qualityRating : heroqualityRating, projectsCompleted : heroprojectsCompleted });
      setsaved("Succesfully saved to the db....");
      toast.success("Header description updated successfully");
    } catch (error) {
      console.error(error);
      setError("Failed to update description");
    } finally {
      setSaving(false);
    }
  };


  const handleInfoSave = async () => {
    try {
      setSaving(true);
      await axios.put(API_URL_INFO, { email: Infomail, phone : Infophone, Address : Infoaddress, social: {
        facebook: Infoface,
        instagram: Infoinsta,
        twitter: Infotwit
      } });
      setsaved("Succesfully saved to the db....");
      toast.success("Header description updated successfully");
    } catch (error) {
      console.error(error);
      setError("Failed to update description");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <p className="text-gray-600">Loading current description...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Home Page Header</h1>
          <p className="text-gray-600 mt-1">
            Update the description text shown under the “Our Services” header section.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Description  {saved}
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={5}
            value={headerDescription}
            onChange={(e) => setHeaderDescription(e.target.value)}
            // placeholder="Enter your header description..."
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Project Completed 
          </label>
          <textarea
            className="w-full p-0.5 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-100"
            rows={5}
            value={heroprojectsCompleted}
            onChange={(e) => setProjectCompleted(e.target.value)}
            // placeholder="Enter your header description..."
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Year Experience 
          </label>
          <textarea
            className="w-full p-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-100"
            rows={5}
            value={heroyearsExperience}
            onChange={(e) => setYearsExperience(e.target.value)}
            // placeholder="Enter your header description..."
          />
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Quality Rating
          </label>
          <textarea
            className="w-full p-3 border rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-100"
            rows={5}
            value={heroqualityRating}
            onChange={(e) => setQualityRating(e.target.value)}
            // placeholder="Enter your header description..."
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Contact Info Email, Ph no </h1>
          <p className="text-gray-600 mt-1">
            Update the description text shown under the “Our Services” header section.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
           Info Email {saved}

          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={5}
            value={Infomail}
            onChange={(e) => setInfomail(e.target.value)}
            // placeholder="Enter your header description..."
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
                    Info Phone number {saved}

          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={5}
            value={Infophone}
            onChange={(e) => setInfophone(e.target.value)}
            // placeholder="Enter your header description..."
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
           Info Address {saved}

          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={5}
            value={Infoaddress}
            onChange={(e) => setInfoaddress(e.target.value)}
            // placeholder="Enter your header description..."
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
           Info FaceBook Link {saved}
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={5}
            value={Infoface}
            onChange={(e) => setInfoface(e.target.value)}
            // placeholder="Enter your header description..."
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
           Info Instagram Link {saved}

          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={5}
            value={Infoinsta}
            onChange={(e) => setInfoinsta(e.target.value)}
            // placeholder="Enter your header description..."
          />
           <div className="mt-4 flex justify-end">
            <button
              onClick={handleInfoSave}
              disabled={saving}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
          </div>
          </div>
    </AdminLayout>
  );
}
