import React from 'react';
import ReactSelect, {StylesConfig} from 'react-select';

export interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    value: Option | null; // Now accept the full Option object
    setValue: (value: Option | null) => void; // Pass the full Option object in setter
    options: Option[];
    className?: string;
    styles?: StylesConfig<Option, false>;

    [key: string]: any; // Spread any additional props to ReactSelect
}

const customStyles: StylesConfig<Option, false> = {
    control: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(31, 41, 55, 1)', // Tailwind's bg-gray-800
        borderColor: 'rgba(75, 85, 99, 1)', // Tailwind's border-gray-600
        color: 'white',
        padding: '0.2rem',
        boxShadow: 'none',
        '&:hover': {
            borderColor: 'rgba(156, 163, 175, 1)', // Tailwind's border-gray-400
            cursor: 'pointer',
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(31, 41, 55, 1)', // Tailwind's bg-gray-800
        color: 'white',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? 'rgba(55, 65, 81, 1)' // Tailwind's bg-gray-700
            : state.isFocused
                ? 'rgba(75, 85, 99, 1)' // Tailwind's bg-gray-600
                : 'rgba(31, 41, 55, 1)', // Tailwind's bg-gray-800
        color: state.isSelected ? 'white' : 'rgba(229, 231, 235, 1)', // Tailwind's text-gray-200
        '&:hover': {
            backgroundColor: 'rgba(75, 85, 99, 1)', // Tailwind's bg-gray-600
            cursor: 'pointer',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    }),
};

const Select = ({value, setValue, options, className, styles, ...props}: SelectProps) => {

    const handleChange = (option: Option | null) => {
        setValue(option); // Set the full Option object instead of just value
    };

    return (
        <ReactSelect
            className={className}
            styles={{...customStyles, ...styles}}
            value={value} // Use full Option object as the value
            onChange={handleChange}
            options={options}
            {...props}
        />
    );
};

export default Select;
