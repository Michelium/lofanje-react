import React, {useState} from 'react';
import CategorySelect from "./CategorySelect";
import LanguageSelect from "./LanguageSelect";
import {Option} from "../../components/form/Select";

const Lofanje = () => {

    const [language, setLanguage] = useState<Option | null>({ value: 'gambinian', label: 'Gambinian' });
    const [category, setCategory] = useState<string | null>(null);
    
    return (
        <div className="">
            <main className="container mx-auto mt-12 bg-gray-900 p-5 shadow-lg text-white">
                <LanguageSelect language={language} setLanguage={setLanguage}/>

                <CategorySelect language={language?.value}/>
            </main>
        </div>
    );
};

export default Lofanje;