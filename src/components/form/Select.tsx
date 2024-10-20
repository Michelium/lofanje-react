import React from "react";
import ReactSelect, { StylesConfig } from "react-select";

export interface SelectProps<T> {
    value?: T | null; // Accept any type as value
    setValue: (value: T | null) => void; // Pass the selected value (generic)
    options: T[]; // List of options (generic)
    getLabel: (option: T) => string; // Function to extract the label from the option
    getValue: (option: T) => any; // Function to extract the value from the option
    className?: string;
    styles?: StylesConfig<any, false>;
}

const customStyles: StylesConfig<any, false> = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "rgba(31, 41, 55, 1)", // Tailwind's bg-gray-800
        borderColor: "rgba(75, 85, 99, 1)", // Tailwind's border-gray-600
        color: "white",
        padding: "0.2rem",
        boxShadow: "none",
        "&:hover": {
            borderColor: "rgba(156, 163, 175, 1)", // Tailwind's border-gray-400
            cursor: "pointer"
        }
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "rgba(31, 41, 55, 1)", // Tailwind's bg-gray-800
        color: "white"
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? "rgba(55, 65, 81, 1)" // Tailwind's bg-gray-700
            : state.isFocused
                ? "rgba(75, 85, 99, 1)" // Tailwind's bg-gray-600
                : "rgba(31, 41, 55, 1)", // Tailwind's bg-gray-800
        color: state.isSelected ? "white" : "rgba(229, 231, 235, 1)", // Tailwind's text-gray-200
        "&:hover": {
            backgroundColor: "rgba(75, 85, 99, 1)", // Tailwind's bg-gray-600
            cursor: "pointer"
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white"
    })
};

const Select = <T,>({ value, setValue, options, getLabel, getValue, className, styles, ...props }: SelectProps<T>) => {
    const handleChange = (option: any) => {
        const selectedOption = options.find(opt => getValue(opt) === option?.value);
        setValue(selectedOption || null);
    };

    const formattedOptions = options.map(opt => ({
        value: getValue(opt),
        label: getLabel(opt),
    }));

    return (
        <ReactSelect
            className={className}
            styles={{ ...customStyles, ...styles }}
            value={value ? { value: getValue(value), label: getLabel(value) } : null}
            onChange={handleChange}
            options={formattedOptions}
            {...props}
        />
    );
};

export default Select;
