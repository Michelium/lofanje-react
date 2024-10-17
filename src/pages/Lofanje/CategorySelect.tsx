import React, {useEffect, useState} from 'react';
import Select, {Option} from "../../components/form/Select";
import apiRequest from "../../helpers/apiHelper";

interface CategorySelectProps {
    language?: string | null;
    category?: Option | null;
    setCategory?: (category: Option | null) => void;
}

const CategorySelect = ({language, category, setCategory}: CategorySelectProps) => {

    const [categories, setCategories] = useState<Option[]|null>(null);

    useEffect(() => {
        apiRequest('get', `/api/categories?language=${language}`)
            .then(data => {
                setCategories(data.map((category: { id: Number, name: string }) => ({
                    value: category.id,
                    label: category.name,
                })));
            }, (error) => {
                console.error({error});
            })
    }, [language]);
    
    return (
        <section>
            <p className="text-white mb-2">choose a category:</p>
            {categories !== null && (
                <Select
                    options={categories}
                    setValue={(selectedOption) => {
                        if (setCategory) {
                            setCategory(selectedOption);
                        }
                    }}
                />
            )}
            
        </section>
    );
};

export default CategorySelect;