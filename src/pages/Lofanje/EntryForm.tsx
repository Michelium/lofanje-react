import React, { useRef } from "react";
import { Category } from "../../types/Category";
import { Entry } from "../../types/Entry";
import { Dialog } from "primereact/dialog";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Button from "../../components/ui/Button";
import { FaCheck, FaTimes } from "react-icons/fa";

interface EntryFormProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    category: Category;
    entry?: Entry | null;
}

const EntryForm = ({ visible, setVisible, category, entry = null }: EntryFormProps) => {
    
    return (
        <Dialog
            className="w-full lg:w-3/4 border-gray-600 border-[1px] rounded-[4px]"
            headerClassName="p-3"
            contentClassName="pt-3"
            position="top"
            visible={visible}
            modal
            draggable={false}
            maskClassName="pt-5 lg:pt-12"
            onHide={() => {
                if (!visible) return;
                setVisible(false);
            }}>
            <header className="text-white">
                <h3 className="text-md font-bold mb-5">{entry ? "edit" : "new"} entry for <i>{category.name}</i></h3>
            </header>
            <main>
                <form>
                    {category.fields.map(field => (
                        <fieldset key={field.name} className="mb-4 flex items-center">
                            <label htmlFor={field.name} className="text-white w-1/6">{field.label}:</label>
                            <div className="w-5/6">
                                {field.type === "TextType" && (
                                    <Input
                                        className="w-full"
                                        type="text"
                                        id={field.name}
                                        name={field.name}
                                    />)}
                                {/*{field.type === "SelectType" && (*/}
                                {/*    <Select*/}
                                {/*        setValue={() => { }}*/}
                                {/*        options={field.options}*/}
                                {/*        getLabel={(option) => option}*/}
                                {/*        getValue={(option) => option} />*/}
                                {/*)}*/}
                            </div>
                        </fieldset>
                    ))}
                    <footer className="flex justify-end gap-x-3">
                        <Button type="button" size="small" onClick={() => setVisible(false)}><FaTimes className="mr-2"/> cancel</Button>
                        <Button color="primary" size="small" type="submit"><FaCheck className="mr-2" /> save</Button>
                    </footer>
                </form>
            </main>
        </Dialog>
    );
};

export default EntryForm;