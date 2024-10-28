import React from "react";
import HeaderMenu from "./HeaderMenu";

const Settings = () => {
    return (
        <div className="my-5 lg:my-12">
            <header className="container bg-gray-900 p-5 shadow-lg text-white rounded-md">
                <div className="w-100 flex justify-between items-center">
                    <h1 className="text-2xl">Settings</h1>
                    <HeaderMenu />
                </div>
            </header>

            <main className="container mx-auto mt-5 bg-gray-900 p-5 shadow-lg text-white rounded-md">
            </main>
        </div>
    );
};

export default Settings;