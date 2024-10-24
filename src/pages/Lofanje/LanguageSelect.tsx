import React, { useEffect, useState } from "react";
import Select from "../../components/form/Select";
import { FaExchangeAlt } from "react-icons/fa";
import apiRequest from "../../helpers/apiHelper";
import { Language } from "../../types/Language";

interface LanguageSelectProps {
    language: Language | null;
    setLanguage: (language: Language | null) => void;
    onSelect?: () => void;
}

const LanguageSelect = ({ language, setLanguage, onSelect }: LanguageSelectProps) => {
    const [selectVisible, setSelectVisible] = useState<boolean>(false); // Initially hidden

    const [languages, setLanguages] = useState<Language[] | null>(null);

    const toggleSelectVisibility = () => {
        setSelectVisible(!selectVisible);
    };

    useEffect(() => {
        apiRequest("get", "/api/languages")
            .then(data => {
                setLanguages(data);
            }, (error) => {
                console.error({ error });
            });
    }, []);

    return (
        <section className="mb-4">
            <div className="flex gap-x-4">
                <p className="text-white mb-2">selected language: {language?.name}</p>

                <div
                    className={`transition-opacity delay-100 duration-700 ease-in-out ${
                        selectVisible ? "opacity-0 invisible" : "opacity-100 visible"
                    }`}
                >
                    {!selectVisible && (
                        <button
                            className="text-sm text-blue-500 hover:underline"
                            onClick={toggleSelectVisibility}
                        >
                            change language <FaExchangeAlt className="inline ml-1" />
                        </button>
                    )}
                </div>
            </div>

            <div
                className={`transition-opacity duration-300 ease-in-out ${
                    selectVisible ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                {selectVisible && languages !== null && (
                    <Select
                        options={languages}
                        value={language}
                        setValue={(selectedLanguage) => {
                            setLanguage(selectedLanguage);
                            onSelect && onSelect();
                            setSelectVisible(false);
                        }}
                        getLabel={(language) => language.name}
                        getValue={(language) => language.id}
                    />
                )}
            </div>
        </section>
    );
};

export default LanguageSelect;
