import React, {useState} from 'react';
import CategorySelect from "./CategorySelect";
import LanguageSelect from "./LanguageSelect";
import {Option} from "../../components/form/Select";

const Lofanje = () => {

    const [language, setLanguage] = useState<Option | null>({ value: 'gambinian', label: 'Gambinian (gambinoste)' });
    const [category, setCategory] = useState<Option | null>({ value: 'option1', label: 'Option 1' });
    
    const clearCategory = () => {
        setCategory(null);
    }
    
    return (
        <div className="">
            <main className="container mx-auto mt-12 bg-gray-900 p-5 shadow-lg text-white rounded-md">
                <LanguageSelect language={language} setLanguage={setLanguage} clearCategory={clearCategory}/>

                <CategorySelect language={language?.value} category={category} setCategory={setCategory}/>
            </main>
        </div>
    );
};

export default Lofanje;