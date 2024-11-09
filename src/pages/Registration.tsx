import { useNavigate } from "react-router-dom";
import { useFormContext } from "../store/FormContext";
import React, { useState } from "react";
import {
  Listbox,
  ListboxOptions,
  ListboxOption,
  ListboxButton,
  Transition,
  Field,
  Label,
} from "@headlessui/react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";

import {
  AfricanCountries,
  CompanyTechnologies,
  StartupIndustries,
} from "../constants";

export default function Registration() {
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [selectedIndustry, setSelectedIndustry] = React.useState("");
  const [selectedCompanyTech, setSelectedCompanyTech] = React.useState<
    string[]
  >([]);
  const [startUpName, setStartUpName] = useState("");
  const [startUpWebsite, setStartUpWebsite] = useState("");
  const [dateFounded, setDateFounded] = useState("");

  const navigate = useNavigate();
  const { setFormData } = useFormContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      startUpName,
      startUpWebsite,
      selectedCountry,
      selectedIndustry,
      selectedCompanyTech,
      dateFounded,
    };

    if (!selectedCountry) {
      alert("Please select a country.");
      return;
    }

    if (!selectedIndustry) {
      alert("Please select an industry.");
      return;
    }

    setFormData(formData);
    navigate("/dashboard");
  };

  return (
    <section className="bg-white">
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="xl: relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full">
          <div className="absolute inset-0 h-full w-full bg-[#f47207] opacity-80" />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to Vester.AI
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Bridging the Gap Between Innovation and Investment
            </p>
          </div>
        </section>

        <main className="flex w-full items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12">
          <div className="w-full max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Vester.AI
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Bridging the Gap Between Innovation and Investment
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-rows-7 gap-6"
            >
              <div>
                <label
                  htmlFor="StartUpName"
                  className="block text-sm font-medium text-gray-700"
                >
                  What is your startup's name?
                </label>

                <input
                  type="text"
                  id="StartUpName"
                  name="start_up_name"
                  value={startUpName}
                  onChange={(e) => setStartUpName(e.target.value)}
                  className="mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="StartUpWebsite"
                  className="block text-sm font-medium text-gray-700"
                >
                  What is your startup's website?
                </label>

                <input
                  type="url"
                  id="StartUpWebsite"
                  name="start_up_website"
                  value={startUpWebsite}
                  onChange={(e) => setStartUpWebsite(e.target.value)}
                  className="mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="Location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Where in Africa is your company legally registered?
                </label>

                <select
                  id="Location"
                  name="location"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                >
                  <option value="">--Please choose an option--</option>
                  {AfricanCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="Industry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Which of these best describes your industry?
                </label>

                <select
                  id="Industry"
                  name="industry"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                >
                  <option value="">--Please choose an option--</option>
                  {StartupIndustries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <Field>
                <Label
                  htmlFor="CompanyTechnologies"
                  className="block text-sm font-medium text-gray-700"
                >
                  What technology does your company mainly use?
                </Label>

                <Listbox
                  name="CompanyTechnologies"
                  value={selectedCompanyTech}
                  onChange={setSelectedCompanyTech}
                  multiple
                >
                  <div className="relative mt-2 w-full max-w-[100%] rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm sm:!max-w-[100%]">
                    <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">
                        {selectedCompanyTech.length === 0
                          ? "Select technologies"
                          : selectedCompanyTech.join(", ")}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronsUpDown
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </ListboxButton>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-[var(--button-width)] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {CompanyTechnologies.map((technology) => (
                          <ListboxOption
                            key={technology}
                            value={technology}
                            className={({ selected }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                selected
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {technology}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
              </Field>

              <div>
                <label
                  htmlFor="DateFounded"
                  className="block text-sm font-medium text-gray-700"
                >
                  When was your company founded?
                </label>

                <input
                  type="date"
                  id="DateFounded"
                  name="date_founded"
                  value={dateFounded}
                  onChange={(e) => setDateFounded(e.target.value)}
                  className="mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-block shrink-0 rounded-md border border-[#f47207] bg-[#f47207] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#f47207] focus:outline-none focus:ring active:text-[#f47207]"
              >
                Register
              </button>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
