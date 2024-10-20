import React, { useState } from "react";
import CategorySelect from "./CategorySelect";
import LanguageSelect from "./LanguageSelect";
import Button from "../../components/ui/Button";
import { FaPlus } from "react-icons/fa6";
import EntriesTable from "./EntriesTable";
import { Language } from "../../types/Language";
import { Category } from "../../types/Category";

const Lofanje = () => {

    const [language, setLanguage] = useState<Language | null>(null);
    const [category, setCategory] = useState<Category | null>(null);

    return (
        <div className="my-12">
            <header className="container mx-auto bg-gray-900 p-5 shadow-lg text-white rounded-md">
                <LanguageSelect language={language} setLanguage={setLanguage} />

                {language && (
                    <CategorySelect language={language} category={category} setCategory={setCategory} />
                )}
            </header>

            <main className="container mx-auto mt-5 bg-gray-900 p-5 shadow-lg text-white rounded-md">
                {language && category && (
                    <>
                        <section className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">{language.name} | {category.name}</h2>
                            <Button color="primary" size="small"><FaPlus className="mr-2" /> new entry</Button>
                        </section>
                        <EntriesTable category={category} />
                    </>
                )}
            </main>
        </div>
    );
};

export default Lofanje;