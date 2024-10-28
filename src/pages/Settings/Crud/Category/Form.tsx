import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FaCheck, FaPlus, FaTimes } from "react-icons/fa";
import { Toast } from "primereact/toast";
import apiRequest from "../../../../helpers/apiHelper";
import Input from "../../../../components/form/Input";
import Button from "../../../../components/ui/Button";
import { Category } from "../../../../types/Category";
import { Language } from "../../../../types/Language";
import { Field } from "../../../../types/Field";
import Select from "../../../../components/form/Select";

interface FormProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    language: Language;
    category?: Category | null;
    onSubmit?: () => void;
    onCancel?: () => void;
}

const emptyFormData = {
    name: "",
    fields: []
};

// ...

const Form = ({ visible, setVisible, language, category = null, onSubmit, onCancel }: FormProps) => {
    const [formData, setFormData] = useState<{ name: string, fields: Field[] | [] }>(emptyFormData);

    const toast = useRef<Toast>(null);

    useEffect(() => {
        if (category) {
            setFormData({ name: category.name, fields: category.fields });
        } else {
            setFormData(emptyFormData);
        }
    }, [category]);

    const handleFieldChange = (index: number, key: "label" | "type", value: any) => {
        setFormData((prev) => {
            const updatedFields = [...prev.fields];
            updatedFields[index] = { ...updatedFields[index], [key]: value };
            return { ...prev, fields: updatedFields };
        });
    };

    const handleCategoryChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const addField = () => {
        setFormData(prev => ({
            ...prev,
            fields: [...prev.fields, { label: "", type: "TextType" } as Field]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const method = category ? "put" : "post";
        const route = category ? `/api/categories/${category.id}` : "/api/categories";

        const categoryData = {
            language: language.id,
            name: formData.name,
            fields: formData.fields
        };

        apiRequest(method, route, categoryData)
            .then((data: any) => {
                toast.current?.show({ severity: "success", summary: "Success", detail: "Category saved successfully", life: 3000 });
                if (onSubmit) onSubmit();
                setVisible(false);
                setFormData(emptyFormData);
            })
            .catch((error: any) => {
                console.error(error);
                toast.current?.show({ severity: "error", summary: "Error", detail: "Something went wrong", life: 3000 });
            });
    };

    return (
        <>
            <Toast ref={toast} />
            <Dialog
                className="w-full lg:w-3/4 border-gray-600 border-[1px] rounded-[4px]"
                headerClassName="p-3"
                contentClassName="pt-3"
                position="top"
                visible={visible}
                modal
                draggable={false}
                maskClassName="pt-5 lg:pt-12"
                closeOnEscape
                blockScroll={false}
                dismissableMask
                onHide={() => (onCancel ? onCancel() : setFormData(emptyFormData))}>
                <header className="text-white">
                    <h3 className="text-md font-bold mb-5">{category ? "edit" : "new"} category</h3>
                </header>
                <main>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="mb-4 flex items-center">
                            <label htmlFor="name" className="text-white w-1/6">Name:</label>
                            <div className="w-5/6">
                                <Input
                                    className="w-full"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => handleCategoryChange("name", e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </fieldset>
                        <fieldset className="mb-4 flex">
                            <label htmlFor="fields" className="text-white w-1/6">Fields:</label>
                            <div className="w-5/6">
                                {formData.fields.map((field, index) => (
                                    <div key={index} className="flex gap-x-4 mb-2 items-center">
                                        <Input
                                            type="text"
                                            value={field.label}
                                            placeholder="Field Label"
                                            onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                                            className="w-3/4"
                                        />
                                        <Select
                                            value={field.type}
                                            setValue={(value) => handleFieldChange(index, "type", value)}
                                            options={["TextType", "TextareaType", "SelectType"]}
                                            getLabel={(option) => option}
                                            getValue={(option) => option}
                                            className="w-1/4"
                                        />
                                        <Button type="button" size="small" onClick={() => setFormData((prev) => ({ ...prev, fields: prev.fields.filter((_, i) => i !== index) }))}>
                                            <FaTimes />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" size="small" className="mt-2" onClick={addField}>
                                    <FaPlus className="mr-2" /> add field
                                </Button>
                            </div>
                        </fieldset>
                        <footer className="flex justify-end gap-x-3">
                            <Button type="button" size="small" onClick={() => (onCancel ? onCancel() : setVisible(false))}>
                                <FaTimes className="mr-2" /> cancel
                            </Button>
                            <Button color="primary" size="small" type="submit">
                                <FaCheck className="mr-2" /> save
                            </Button>
                        </footer>
                    </form>
                </main>
            </Dialog>
        </>
    );
};

export default Form;

