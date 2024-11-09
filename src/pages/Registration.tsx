import { useNavigate } from "react-router-dom";
import { useFormContext } from "../store/FormContext";
import React, { useState } from "react";
import { FormInput, FormSelect, MultiSelect, FormButton } from "../components";
import {
  AfricanCountries,
  CompanyTechnologies,
  StartupIndustries,
} from "../constants";

interface FormData {
  startUpName: string;
  startUpWebsite: string;
  selectedCountry: string;
  selectedIndustry: string;
  selectedCompanyTech: string[];
  dateFounded: string;
}

export default function Registration() {
  const [formData, setFormData] = useState<FormData>({
    startUpName: "",
    startUpWebsite: "",
    selectedCountry: "",
    selectedIndustry: "",
    selectedCompanyTech: [],
    dateFounded: "",
  });

  const [multiSelectError, setMultiSelectError] = useState<string | undefined>(
    undefined,
  );
  const navigate = useNavigate();
  const { setFormData: setContextFormData } = useFormContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.selectedCompanyTech.length === 0) {
      setMultiSelectError("Please select at least one technology");
      return;
    }

    setContextFormData(formData);
    navigate("/dashboard");
  };

  const handleChange = <T extends HTMLInputElement | HTMLSelectElement>(
    e: React.ChangeEvent<T>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            <div className="relative -mt-8 block lg:hidden">
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
              <FormInput
                label="What is your startup's name?"
                id="startUpName"
                name="startUpName"
                value={formData.startUpName}
                onChange={handleChange}
              />

              <FormInput
                label="What is your startup's website?"
                id="startUpWebsite"
                name="startUpWebsite"
                type="url"
                value={formData.startUpWebsite}
                onChange={handleChange}
              />

              <FormSelect
                label="Where in Africa is your company legally registered?"
                id="selectedCountry"
                name="selectedCountry"
                value={formData.selectedCountry}
                onChange={handleChange}
                options={AfricanCountries}
              />

              <FormSelect
                label="Which of these best describes your industry?"
                id="selectedIndustry"
                name="selectedIndustry"
                value={formData.selectedIndustry}
                onChange={handleChange}
                options={StartupIndustries}
              />

              <MultiSelect
                label="What technology does your company mainly use?"
                value={formData.selectedCompanyTech}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    selectedCompanyTech: value as string[],
                  }))
                }
                options={CompanyTechnologies}
                id="selectedCompanyTech"
                name="selectedCompanyTech"
                error={multiSelectError}
                onValidationChange={(isValid) => {
                  if (isValid && multiSelectError) {
                    setMultiSelectError(undefined);
                  }
                }}
              />

              <FormInput
                label="When was your company founded?"
                id="dateFounded"
                name="dateFounded"
                type="date"
                value={formData.dateFounded}
                onChange={handleChange}
              />

              <FormButton type="submit" className="max-h-12">
                Register
              </FormButton>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}
