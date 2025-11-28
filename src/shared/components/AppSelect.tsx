import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui";

interface Option {
  value: string;
  label: string;
}

interface AppSelectProps {
  placeholder: string;
  options: Option[];
  triggerClassName?: string;
  label?: string;
  error?: string;
  onValueChange: (value: string) => void;
}

const AppSelect = ({
  placeholder,
  label,
  options,
  triggerClassName,
  error,
  onValueChange,
}: AppSelectProps) => {
  return (
    <div>
      <Select onValueChange={onValueChange}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default AppSelect;
