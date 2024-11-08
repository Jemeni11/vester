import { useFormContext } from '../store/FormContext';

export default function Dashboard() {
  const { formData } = useFormContext();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Dashboard</h1>
      {formData ? (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <strong className="text-gray-600">Startup Name:</strong>
              <p className="text-gray-800">{formData.startUpName}</p>
            </div>
            <div>
              <strong className="text-gray-600">Startup Website:</strong>
              <br/>
              <a href={formData.startUpWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {formData.startUpWebsite}
              </a>
            </div>
            <div>
              <strong className="text-gray-600">Country:</strong>
              <p className="text-gray-800">{formData.selectedCountry}</p>
            </div>
            <div>
              <strong className="text-gray-600">Industry:</strong>
              <p className="text-gray-800">{formData.selectedIndustry}</p>
            </div>
            <div>
              <strong className="text-gray-600">Company Tech:</strong>
              <p className="text-gray-800">{formData.selectedCompanyTech.join(', ')}</p>
            </div>
            <div>
              <strong className="text-gray-600">Date Founded:</strong>
              <p className="text-gray-800">{formData.dateFounded}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No form data available.</p>
      )}
    </div>
  );
};
