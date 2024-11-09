import { useFormContext } from "../store/FormContext";
import { useState } from "react";
import { Search } from "lucide-react";

const similarCompanies = [
  {
    name: "DevStream Inc",
    industry: "Software Development",
    country: "Ghana",
    founded: "2022",
    tech: ["React", "Python", "GCP"],
  },
  {
    name: "CloudTech Solutions",
    industry: "Software Development",
    country: "Egypt",
    founded: "2023",
    tech: ["Vue", "Node.js", "AWS"],
  },
  {
    name: "DataFlow Systems",
    industry: "Software Development",
    country: "South Africa",
    founded: "2023",
    tech: ["React", "Java", "Azure"],
  },
];

export default function Dashboard() {
  const { formData } = useFormContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFollowUp, setShowFollowUp] = useState(false);

  const filteredCompanies = similarCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.country.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="mx-auto min-h-screen max-w-7xl">
      <header className="bg-white px-[5%] py-4 md:px-8 lg:px-12">
        <h1 className="mb-8 text-2xl font-bold text-gray-900 sm:text-3xl">
          Dashboard
        </h1>
      </header>
      {formData ? (
        <div className="container mx-auto space-y-6 p-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">
              Your Startup Information
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold">Company Name</h3>
                <p className="text-gray-600">{formData.startUpName}</p>
              </div>
              <div>
                <h3 className="font-semibold">Website</h3>
                <p className="text-gray-600">
                  <a
                    href={formData.startUpWebsite}
                    className="text-blue-600 hover:underline"
                  >
                    {formData.startUpWebsite}
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Country</h3>
                <p className="text-gray-600">{formData.selectedCountry}</p>
              </div>
              <div>
                <h3 className="font-semibold">Industry</h3>
                <p className="text-gray-600">{formData.selectedIndustry}</p>
              </div>
              <div>
                <h3 className="font-semibold">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.selectedCompanyTech.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Founded</h3>
                <p className="text-gray-600">
                  {new Date(formData.dateFounded).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex flex-col justify-between gap-y-4 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold">Similar Companies</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Company Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Founded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Technologies
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredCompanies.map((company, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-6 py-4">
                        {company.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {company.industry}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {company.country}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {company.founded}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {company.tech.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="space-y-4 text-center">
              <h3 className="text-lg font-semibold">
                Would you like to learn more about similar companies?
              </h3>
              {!showFollowUp ? (
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowFollowUp(true)}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Yes, tell me more
                  </button>
                  <button className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    No, thanks
                  </button>
                </div>
              ) : (
                <div className="mx-auto max-w-md space-y-4 text-left">
                  <p className="text-gray-600">
                    We can provide detailed insights about similar companies,
                    including:
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-gray-600">
                    <li>Growth trajectories and milestones</li>
                    <li>Technology stack details</li>
                    <li>Funding history</li>
                    <li>Market positioning</li>
                  </ul>
                  <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Request Detailed Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No form data available.</p>
      )}
    </div>
  );
}
