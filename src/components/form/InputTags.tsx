import React, { useState, KeyboardEvent, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface InputTagsProps {
    tags: string[];
    setTags: (tags: string[]) => void;
    value: string[] | [];
    placeholder?: string;
}

const InputTags = ({ tags, setTags, value, placeholder = "Add an option..." }: InputTagsProps) => {
    const [inputValue, setInputValue] = useState("");

    const addTag = (tag: string) => {
        if (tag.trim() && !tags.includes(tag)) {
            setTags([...tags, tag.trim()]);
        }
        setInputValue("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(inputValue);
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (value) setTags(value);
    }, [value]);

    return (
        <div className="flex flex-wrap items-center bg-gray-800 text-white py-1 px-3 
        border border-gray-600 rounded-[4px] hover:border-gray-400
        focus-within:border-gray-400 focus-within:bg-gray-700 
        transition-all duration-200 ease-in-out">
            {tags.map((tag, index) => (
                <div key={index} className="flex items-center bg-gray-500 text-white rounded-full px-3 py-1 mr-2 hover:cursor-pointer hover:bg-gray-600" onClick={() => removeTag(index)}>
                    <span className="text-sm">{tag}</span>
                    <button
                        type="button"
                        className="ml-2 text-gray-400 hover:text-gray-200"
                    >
                        <FaTimes size={12} />
                    </button>
                </div>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={tags.length === 0 ? placeholder : ""}
                className="bg-gray-800 text-white border-none outline-none py-2 px-2 placeholder-gray-400 flex-grow focus:border-gray-400 focus:bg-gray-700 transition-all duration-200 ease-in-out"
            />
        </div>
    );
};

export default InputTags;
