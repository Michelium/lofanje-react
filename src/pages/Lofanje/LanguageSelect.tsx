import React, { useEffect, useState } from "react";
import Select, { Option } from "../../components/form/Select";
import { FaExchangeAlt } from "react-icons/fa";
import apiRequest from "../../helpers/apiHelper";

interface LanguageSelectProps {
    language: Option | null;
    setLanguage: (language: Option | null) => void;
    clearCategory?: () => void;
}

const LanguageSelect = ({ language, setLanguage, clearCategory }: LanguageSelectProps) => {
    const [selectVisible, setSelectVisible] = useState<boolean>(false); // Initially hidden

    const [languages, setLanguages] = useState<Option[] | null>(null);

    const toggleSelectVisibility = () => {
        setSelectVisible(!selectVisible);
    };

    useEffect(() => {
        apiRequest("get", "/api/languages")
            .then(data => {
                setLanguages(data.map((language: { id: Number, name: string }) => ({
                    value: language.id,
                    label: language.name
                })));
            }, (error) => {
                console.error({ error });
            });
    }, []);

    return (
        <section className="mb-4">
            <div className="flex gap-x-4">
                <p className="text-white mb-2">selected language: {language?.label}</p>

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
                        setValue={(selectedOption) => {
                            setLanguage(selectedOption);
                            if (clearCategory) clearCategory();
                            setSelectVisible(false);
                        }}
                    />
                )}
            </div>
        </section>
    );
};

export default LanguageSelect;
