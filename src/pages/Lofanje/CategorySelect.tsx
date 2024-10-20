import React, { useEffect, useState } from "react";
import Select from "../../components/form/Select";
import apiRequest from "../../helpers/apiHelper";
import { Category } from "../../types/Category";
import { Language } from "../../types/Language";

interface CategorySelectProps {
    language?: Language | null;
    category?: Category | null;
    setCategory: (category: Category | null) => void;
}

const CategorySelect = ({ language, category, setCategory }: CategorySelectProps) => {

    const [categories, setCategories] = useState<Category[] | null>(null);

    useEffect(() => {
        apiRequest("get", `/api/categories?language=${language?.id}`)
            .then(data => {
                setCategories(data);
            }, (error) => {
                console.error({ error });
            });
    }, [language]);

    return (
        <section>
            <p className="text-white mb-2">choose a category:</p>
            {categories !== null && (
                <Select
                    options={categories}
                    value={category}
                    setValue={(selectedCategory) => {
                        setCategory(selectedCategory);
                    }}
                    getLabel={(category) => category.name}
                    getValue={(category) => category.id}
                />
            )}

        </section>
    );
};

export default CategorySelect;