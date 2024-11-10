import React, { useEffect, useRef, useState } from "react";
import apiRequest from "../../../../helpers/apiHelper";
import { Language } from "../../../../types/Language";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Button from "../../../../components/ui/Button";
import { FaPlus } from "react-icons/fa6";
import Form from "./Form";
import { FaEdit, FaTimes } from "react-icons/fa";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { Toast } from "primereact/toast";
import { Category } from "../../../../types/Category";
import languages from "../Language/Languages";

interface CategoriesProps {
    language: Language;
}

const Categories = ({ language }: CategoriesProps) => {

    const toast = useRef<Toast>(null);

    const [categories, setCategories] = useState<Category[] | null>(null);

    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    
    const cancelForm = () => {
        setFormVisible(false);
        setSelectedCategory(null);
    }

    const fetchCategories = () => {
        apiRequest("get", `/api/categories?language=${language.id}`)
            .then(data => {
                setCategories(data);
            }, (error) => {
                console.error({ error });
            });
    };

    const deleteCategory = (category: Category) => {
        apiRequest("delete", `/api/categories/${category.id}`)
            .then(() => {
                toast.current?.show({ severity: "success", summary: "Success", detail: "Category deleted successfully", life: 3000 });
                fetchCategories();
            }, (error) => {
                console.error({ error });
            });
    };

    const deleteConfirmDialog = (category: Category) => {
        confirmDialog({
            message: (<p>Are you sure you want to delete this category? This action cannot be undone. <br /> <strong>All fields and entries associated with this category will be deleted as well.</strong></p>),
            header: "Delete Category",
            icon: <BsFillExclamationTriangleFill />,
            defaultFocus: "reject",
            dismissableMask: true,
            closeOnEscape: true,
            draggable: false,
            acceptClassName: "bg-red-500 hover:bg-red-600 border-red-600 hover:border-red-400 focus:border-red-400 px-3 py-2 text-sm rounded-[4px] text-white",
            rejectClassName: "bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-gray-400 focus:border-gray-400 px-3 py-2 text-sm rounded-[4px] text-white mr-4",
            accept: () => deleteCategory(category),
            reject: () => {
            }
        });
    };

    useEffect(() => {
        fetchCategories();
    }, [language]);


    const actionBodyTemplate = (rowData: Category) => {
        return (<div className="flex gap-x-2">
            <Button type="button" size="small" rounded onClick={() => {
                setSelectedCategory(rowData);
                setFormVisible(true);
            }}><FaEdit />
            </Button>
            <Button type="button" size="small" rounded onClick={() => {
                deleteConfirmDialog(rowData);
            }}>
                <FaTimes />
            </Button>
        </div>);
    };

    return (
        <div>
            <div>
                <section className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold">Categories</h2>
                        <p>Changing category for: <b>{language.name}</b></p>
                    </div>
                    <Button color="primary" size="small" onClick={() => setFormVisible(true)}><FaPlus className="mr-2" /> new category</Button>
                </section>
            </div>
            {categories !== null && (
                <DataTable
                    value={categories}
                    className="border-gray-600 border-[1px] rounded-[2px]"
                    cellClassName={(() => 'py-2 px-5')}
                    stripedRows
                    rowHover
                >
                    <Column key="name" field="name" header="Name" />
                    <Column key="actions" body={actionBodyTemplate} className="w-[70px]" />
                </DataTable>
            )}
            <Form visible={formVisible} setVisible={setFormVisible} language={language} category={selectedCategory} onSubmit={fetchCategories} onCancel={cancelForm} />
            <Toast ref={toast} />
            <ConfirmDialog />
        </div>
    );
};

export default Categories;