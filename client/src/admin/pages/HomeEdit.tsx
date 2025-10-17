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

  const [heroDesignString1, setHeroDesignString1] = useState([""]);
  const [heroDesignString2, setHeroDesignString2] = useState([""]);
  const [heroFeature, setHeroFeature] = useState([{ key: "", value: "" }]);
  
  const [ServicesHeader,setServicesHeader]= useState("");
  const [ServicesDescription,setServicesDescription]= useState("");
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

        setHeroDesignString1(homeData.hero_design_string1 || []);
        setHeroDesignString2(homeData.hero_design_string2 || []);
        setHeroFeature(homeData.hero_feature || [{ key: "", value: "" }]);
        setServicesDescription(homeData.sevices_description || "");
        setServicesHeader(homeData.sevices_header || "");
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
      console.log({ description: headerDescription, yearsExperience : heroyearsExperience, qualityRating : heroqualityRating, projectsCompleted : heroprojectsCompleted,hero_design_string1:heroDesignString1,hero_design_string2:heroDesignString2,hero_feature: heroFeature,sevices_description:ServicesDescription,
        sevices_header : ServicesHeader })
      // await axios.put(API_URL, { description: headerDescription, yearsExperience : heroyearsExperience, qualityRating : heroqualityRating, projectsCompleted : heroprojectsCompleted });
      await axios.put(API_URL, {
        description: headerDescription,
        yearsExperience: heroyearsExperience,
        qualityRating: heroqualityRating,
        projectsCompleted: heroprojectsCompleted,
        hero_design_string1:heroDesignString1,
        hero_design_string2:heroDesignString2,
        hero_feature:heroFeature,
        sevices_description:ServicesDescription,
        sevices_header : ServicesHeader
      });
      
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
          <h1 className="text-2xl font-bold text-gray-900">Edit Our services Header & Description </h1>
          <p className="text-gray-600 mt-1">
            Update the description text shown under the “Our Services” header section.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
          Header  {saved}

          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={5}
            value={ServicesHeader}
            onChange={(e) => setServicesHeader(e.target.value)}
            // placeholder="Enter your header description..."
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
          Description   

          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={5}
            value={ServicesDescription}
            onChange={(e) => setServicesDescription(e.target.value)}
            // placeholder="Enter your header description..."
          />
        </div>


        </div>
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
          {/* hero string  */}
          <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Hero Design String 1
    </label>
    {heroDesignString1.map((item, index) => (
      <div key={index} className="flex gap-2 mb-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
          value={item}
          onChange={(e) => {
            const newArr = [...heroDesignString1];
            newArr[index] = e.target.value;
            setHeroDesignString1(newArr);
          }}
        />
        <button
          onClick={() => {
            const newArr = heroDesignString1.filter((_, i) => i !== index);
            setHeroDesignString1(newArr);
          }}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          ✕
        </button>
      </div>
    ))}
    <button
      onClick={() => setHeroDesignString1([...heroDesignString1, ""])}
      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
    >
      + Add String
    </button>
  </div>

  {/* hero_design_string2 */}
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Hero Design String 2
    </label>
    {heroDesignString2.map((item, index) => (
      <div key={index} className="flex gap-2 mb-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
          value={item}
          onChange={(e) => {
            const newArr = [...heroDesignString2];
            newArr[index] = e.target.value;
            setHeroDesignString2(newArr);
          }}
        />
        <button
          onClick={() => {
            const newArr = heroDesignString2.filter((_, i) => i !== index);
            setHeroDesignString2(newArr);
          }}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          ✕
        </button>
      </div>
    ))}
    <button
      onClick={() => setHeroDesignString2([...heroDesignString2, ""])}
      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
    >
      + Add String
    </button>
  </div>

  {/* hero_feature */}
  <div className="mt-6">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Hero Feature (Key & Value)
    </label>
      {heroFeature.map((feature, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
            placeholder="Key"
            value={feature.key}
            onChange={(e) => {
              const updated = [...heroFeature];
              updated[index].key = e.target.value;
              setHeroFeature(updated);
            }}
          />
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-500"
            placeholder="Value"
            value={feature.value}
            onChange={(e) => {
              const updated = [...heroFeature];
              updated[index].value = e.target.value;
              setHeroFeature(updated);
            }}
          />
          <button
            onClick={() => {
              const newArr = heroFeature.filter((_, i) => i !== index);
              setHeroFeature(newArr);
            }}
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            ✕
          </button>
          </div>
        ))}
      <button
        onClick={() => setHeroFeature([...heroFeature, { key: "", value: "" }])}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
      >
        + Add Feature
      </button>
    </div>

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
     {/* from here Information of the company update starts   */}
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
