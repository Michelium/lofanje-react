import React, {useState} from 'react';
import CategorySelect from "./CategorySelect";
import LanguageSelect from "./LanguageSelect";
import {Option} from "../../components/form/Select";
import Button from "../../components/ui/Button";
import {FaPlus} from "react-icons/fa6";

const Lofanje = () => {

    const [language, setLanguage] = useState<Option | null>(null);
    const [category, setCategory] = useState<Option | null>(null);

    const clearCategory = () => {
        setCategory(null);
    }

    return (
        <div className="">
            <header className="container mx-auto mt-12 bg-gray-900 p-5 shadow-lg text-white rounded-md">
                <LanguageSelect language={language} setLanguage={setLanguage} clearCategory={clearCategory}/>

                {language && (
                    <CategorySelect language={language?.value} category={category} setCategory={setCategory}/>
                )}
            </header>

            <main>
                {category && (
                    <section className="container mx-auto mt-5 bg-gray-900 p-5 shadow-lg text-white rounded-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">{language?.label} | {category.label}</h2>
                            <Button color="primary" size="small"><FaPlus className="mr-2"/> new entry</Button>
                        </div>

                    </section>
                )}
            </main>
        </div>
    );
};

export default Lofanje;