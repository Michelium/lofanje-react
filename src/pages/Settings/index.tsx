import React, { useEffect, useState } from "react";
import { MdArrowBack, MdLanguage } from "react-icons/md";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "../../components/layout/HeaderMenu";
import { LuListMinus } from "react-icons/lu";
import { FaUsersCog } from "react-icons/fa";
import { Language } from "../../types/Language";
import apiRequest from "../../helpers/apiHelper";
import Languages from "./Crud/Language/Languages";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import Categories from "./Crud/Category/Categories";
import SidebarItem from "./SidebarItem";

const Settings = () => {
    const navigate = useNavigate();

    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

    const [languages, setLanguages] = useState<Language[] | null>(null);

    useEffect(() => {
        apiRequest("get", "/api/languages")
            .then(data => {
                setLanguages(data);
            }, (error) => {
                console.error({ error });
            });
    }, []);


    const activeClasses = '' ;
    
    return (
        <div className="my-5 lg:my-12">
            <header className="container bg-gray-900 p-5 shadow-lg text-white rounded-md">
                <div className="w-100 flex justify-between items-center">
                    <h1 className="text-2xl">Settings</h1>
                    <HeaderMenu>
                        <Button size="small" rounded onClick={() => navigate("/")} title="Lofanje">
                            <MdArrowBack />
                        </Button>
                    </HeaderMenu>
                </div>
            </header>

            <main className="container mx-auto mt-5 bg-gray-900 p-5 shadow-lg text-white rounded-md flex gap-x-4">
                <aside className="w-1/6 border-r border-gray-700 pr-5">
                    <ul className="space-y-2">
                        <li>
                            <SidebarItem
                                icon={<MdLanguage />}
                                label="Languages"
                                isActive={selectedSection === "languages"}
                                onClick={() => setSelectedSection("languages")}
                            />
                        </li>
                        <li>
                            <SidebarItem
                                icon={<LuListMinus />}
                                label="Categories"
                                isActive={selectedSection === "categories"}
                                onClick={() => setSelectedSection("categories")}
                            />
                        </li>
                        {selectedSection === "categories" && languages?.map(language => (
                            <li key={language.id}>
                                <SidebarItem
                                    icon={null}
                                    label={language.name}
                                    isActive={selectedLanguage?.id === language.id}
                                    onClick={() => setSelectedLanguage(language)}
                                    nested
                                />
                            </li>
                        ))}
                        <li>
                            <SidebarItem
                                icon={<FaUsersCog />}
                                label="Users"
                                isActive={selectedSection === "users"}
                                onClick={() => setSelectedSection("users")}
                            />
                        </li>
                    </ul>
                </aside>
                <section className="w-5/6">
                    {selectedSection === "languages" && <Languages />}
                    {selectedSection === "categories" && (
                        <div>
                            {!selectedLanguage ? (
                                <i className="flex items-center gap-x-2"><BsFillExclamationTriangleFill /> select a language in the menu first</i>
                            ) : (
                                <Categories language={selectedLanguage} />
                            )}
                        </div>
                    )}
                    {selectedSection === "users" && (
                        <div>
                            <h2 className="text-xl">Users</h2>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Settings;