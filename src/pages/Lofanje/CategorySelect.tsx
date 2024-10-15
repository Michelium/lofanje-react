import React from 'react';
import Select, {Option} from "../../components/form/Select";

interface CategorySelectProps {
    language?: string | null;
}

const CategorySelect = ({language}: CategorySelectProps) => {

    const options: Option[] = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
    ];
    
    return (
        <div className="">
            <p className="text-white mb-2">choose a category:</p>
            {/*<Select*/}
            {/*    options={options}*/}
            {/*    placeholder="choose an option..."*/}
            {/*/>*/}
        </div>
    );
};

export default CategorySelect;