import { useFormContext } from '../store/FormContext';

export default function Dashboard() {
  const { formData } = useFormContext();

  return (
    <div>
      <h1>Dashboard</h1>
      {formData ? (
        <div>
          <p>Startup Name: {formData.startUpName}</p>
          <p>Startup Website: {formData.startUpWebsite}</p>
          <p>Country: {formData.selectedCountry}</p>
          <p>Industry: {formData.selectedIndustry}</p>
          <p>Company Tech: {formData.selectedCompanyTech}</p>
          <p>Date Founded: {formData.dateFounded}</p>
        </div>
      ) : (
        <p>No form data available.</p>
      )}
    </div>
  );
};
