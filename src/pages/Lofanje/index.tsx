import React, { useRef, useState } from "react";
import CategorySelect from "./CategorySelect";
import LanguageSelect from "./LanguageSelect";
import Button from "../../components/ui/Button";
import { FaPlus } from "react-icons/fa6";
import Entries from "./Entries";
import { Language } from "../../types/Language";
import { Category } from "../../types/Category";
import EntryForm from "./EntryForm";
import { Entry } from "../../types/Entry";

const Lofanje = () => {

    const [language, setLanguage] = useState<Language | null>(null);
    const [category, setCategory] = useState<Category | null>(null);

    const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
    const [entryFormVisible, setEntryFormVisible] = useState<boolean>(false);

    const editEntryAction = (entry: Entry) => {
        setSelectedEntry(entry);
        setEntryFormVisible(true);
    };

    const cancelEntryForm = () => {
        setSelectedEntry(null);
        setEntryFormVisible(false);
    };

    const entriesRef = useRef<{ refreshEntries: () => void }>(null);
    const onEntryFormSubmit = () => {
        entriesRef.current?.refreshEntries();
        setEntryFormVisible(false);
    };
    
    const languageSelectAction = () => {
        setCategory(null);
    };

    return (
        <div className="my-5 lg:my-12">
            <header className="container bg-gray-900 p-5 shadow-lg text-white rounded-md">
                <LanguageSelect language={language} setLanguage={setLanguage} onSelect={languageSelectAction} />

                {language && (
                    <CategorySelect language={language} category={category} setCategory={setCategory} />
                )}
            </header>

            {language && category && (
                <main className="container mx-auto mt-5 bg-gray-900 p-5 shadow-lg text-white rounded-md">
                    <>
                        <section className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">{language.name} | {category.name}</h2>
                            <Button color="primary" size="small" onClick={() => setEntryFormVisible(true)}><FaPlus className="mr-2" /> new entry</Button>
                        </section>
                        <Entries category={category} onEditEntry={editEntryAction} ref={entriesRef} />
                        <EntryForm visible={entryFormVisible} setVisible={setEntryFormVisible} category={category} entry={selectedEntry} onSubmit={onEntryFormSubmit} onCancel={cancelEntryForm} />
                    </>
                </main>
            )}
        </div>
    );
};

export default Lofanje;