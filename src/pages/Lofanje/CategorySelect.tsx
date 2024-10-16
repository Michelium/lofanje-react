import React from 'react';
import Select, {Option} from "../../components/form/Select";

interface CategorySelectProps {
    language?: string | null;
    category?: Option | null;
    setCategory?: (category: Option | null) => void;
}

const CategorySelect = ({language, category, setCategory}: CategorySelectProps) => {

    const options: Option[] = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
    ];
    
    return (
        <div className="">
            <p className="text-white mb-2">choose a category:</p>
            <Select
                options={options}
                // value={category}
                setValue={(selectedOption) => {
                    if (setCategory) {
                        setCategory(selectedOption);
                    }
                }}
            />
        </div>
    );
};

export default CategorySelect;