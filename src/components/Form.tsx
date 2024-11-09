import { useEffect } from "react";
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

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormInput({
  label,
  id,
  className = "",
  required = true,
  ...props
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        required={required}
        className={`mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm valid:border-green-500 invalid:border-red-500 ${className}`}
        {...props}
      />
    </div>
  );
}

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export function FormSelect({
  label,
  id,
  options,
  required = true,
  className = "",
  ...props
}: FormSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        required={required}
        className={`mt-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm valid:border-green-500 invalid:border-red-500 ${className}`}
        {...props}
      >
        <option value="">--Please choose an option--</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

interface MultiSelectProps
  extends Omit<React.ComponentProps<typeof Listbox>, "children"> {
  label: string;
  options: string[];
  error?: string;
  required?: boolean;
  name?: string;
  onValidationChange?: (isValid: boolean) => void;
}

export function MultiSelect({
  label,
  options,
  error,
  required = true,
  value,
  id,
  name,
  onValidationChange,
  ...props
}: MultiSelectProps) {
  useEffect(() => {
    if (required && onValidationChange) {
      const isValid = Array.isArray(value) && value.length > 0;
      onValidationChange(isValid);
    }
  }, [value, required, onValidationChange]);

  return (
    <Field>
      <Label className="block text-sm font-medium text-gray-700">{label}</Label>
      <Listbox value={value} onChange={props.onChange} multiple {...props}>
        <div className="relative mt-2 w-full max-w-[100%] rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm sm:!max-w-[100%]">
          <ListboxButton
            id={id}
            name={name}
            className={`relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm ${required && Array.isArray(value) && value.length === 0 ? "border-red-500" : "border-green-500"} `}
            aria-required={required}
            aria-invalid={error ? "true" : "false"}
          >
            <span className="block truncate">
              {Array.isArray(value) && value.length === 0
                ? "Select company tech"
                : Array.isArray(value)
                  ? value.join(", ")
                  : "Select company tech"}
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
              {options.map((option) => (
                <ListboxOption
                  key={option}
                  value={option}
                  className={({ selected }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      selected ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
  );
}

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function FormButton({
  type = "submit",
  variant = "primary",
  className = "",
  disabled,
  children,
  ...props
}: FormButtonProps) {
  const baseStyles =
    "inline-block shrink-0 rounded-md border px-12 py-3 text-sm font-medium transition focus:outline-none focus:ring";
  const variantStyles = {
    primary:
      "border-[#f47207] bg-[#f47207] text-white hover:bg-transparent hover:text-[#f47207] active:text-[#f47207]",
    secondary:
      "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
