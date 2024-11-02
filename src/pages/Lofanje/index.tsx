import React, { useEffect, useRef, useState } from "react";
import CategorySelect from "./CategorySelect";
import LanguageSelect from "./LanguageSelect";
import Button from "../../components/ui/Button";
import { FaPlus } from "react-icons/fa6";
import Entries from "./Entries";
import { Language } from "../../types/Language";
import { Category } from "../../types/Category";
import EntryForm from "./EntryForm";
import { Entry } from "../../types/Entry";
import { MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../../components/layout/HeaderMenu";

const Lofanje = () => {

    const navigate = useNavigate();

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
    const refreshEntries = () => {
        entriesRef.current?.refreshEntries();
        setSelectedEntry(null);
        setEntryFormVisible(false);
    };

    const languageSelectAction = () => {
        setCategory(null);
    };

    useEffect(() => {
        const storedLanguage = sessionStorage.getItem("language");
        if (storedLanguage) {
            setLanguage(JSON.parse(storedLanguage) as Language);
        }
    }, []);

    useEffect(() => {
        if (language) {
            sessionStorage.setItem("language", JSON.stringify(language));
        }
    }, [language]);

    return (
        <div className="my-5 lg:my-12 mx-4">
            <header className="container bg-gray-900 p-5 shadow-lg text-white rounded-md">
                <div className="w-100 flex justify-between items-center mb-5">
                    <h1 className="text-2xl">Lofanje</h1>
                    <HeaderMenu>
                        <Button size="small" rounded onClick={() => navigate("/settings")} title="Settings">
                            <MdSettings/>
                        </Button>
                    </HeaderMenu>
                </div>
                <LanguageSelect language={language} setLanguage={setLanguage} onSelect={languageSelectAction} />

                {language && (
                    <CategorySelect language={language} category={category} setCategory={setCategory} />
                )}
            </header>

            {language && category && (
                <main className="container mx-auto mt-5 bg-gray-900 p-5 shadow-lg text-white rounded-md">
                    <>
                        <section className="flex flex-col gap-y-4 md:flex-row md:items-center md:justify-between mb-4">
                            <h2 className="text-xl font-bold">{language.name} | {category.name}</h2>
                            <Button color="primary" size="small" onClick={() => setEntryFormVisible(true)}><FaPlus className="mr-2" /> new entry</Button>
                        </section>
                        <Entries category={category} onEditEntry={editEntryAction} ref={entriesRef} />
                        <EntryForm visible={entryFormVisible} setVisible={setEntryFormVisible} category={category} entry={selectedEntry} onSubmit={refreshEntries} onCancel={cancelEntryForm} />
                    </>
                </main>
            )}
        </div>
    );
};

export default Lofanje;
