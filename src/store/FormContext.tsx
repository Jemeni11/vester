import React, { createContext, useContext, useState } from 'react';

interface FormData {
  startUpName: string;
  startUpWebsite: string;
  selectedCountry: string;
  selectedIndustry: string;
  selectedCompanyTech: string[];
  dateFounded: string;
}

interface FormContextProps {
  formData: FormData | null;
  setFormData: React.Dispatch<React.SetStateAction<FormData | null>>;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
