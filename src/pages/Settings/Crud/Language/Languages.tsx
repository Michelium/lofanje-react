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

const Languages = () => {

    const toast = useRef<Toast>(null);

    const [languages, setLanguages] = useState<Language[] | null>(null);

    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

    const cancelForm = () => {
        setFormVisible(false);
        setSelectedLanguage(null);
    };

    const fetchLanguages = () => {
        apiRequest("get", "/api/languages")
            .then(data => {
                setLanguages(data);
            }, (error) => {
                console.error({ error });
            });
    };

    const deleteLanguage = (language: Language) => {
        apiRequest("delete", `/api/languages/${language.id}`)
            .then(() => {
                toast.current?.show({ severity: "success", summary: "Success", detail: "Language deleted successfully", life: 3000 });
                fetchLanguages();
            }, (error) => {
                console.error({ error });
            });
    };

    const deleteConfirmDialog = (language: Language) => {
        confirmDialog({
            message: (<p>Are you sure you want to delete this language? This action cannot be undone. <br /> <strong>All categories, fields and entries associated with this language will be deleted as well.</strong></p>),
            header: "Delete Language",
            icon: <BsFillExclamationTriangleFill />,
            defaultFocus: "reject",
            dismissableMask: true,
            closeOnEscape: true,
            draggable: false,
            acceptClassName: "bg-red-500 hover:bg-red-600 border-red-600 hover:border-red-400 focus:border-red-400 px-3 py-2 text-sm rounded-[4px] text-white",
            rejectClassName: "bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-gray-400 focus:border-gray-400 px-3 py-2 text-sm rounded-[4px] text-white mr-4",
            accept: () => deleteLanguage(language),
            reject: () => {
            }
        });
    };

    useEffect(() => {
        fetchLanguages();
    }, []);


    const actionBodyTemplate = (rowData: Language) => {
        return (<div className="flex gap-x-2">
            <Button type="button" size="small" rounded onClick={() => {
                setSelectedLanguage(rowData);
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
                    <h2 className="text-xl font-bold">Languages</h2>
                    <Button color="primary" size="small" onClick={() => setFormVisible(true)}><FaPlus className="mr-2" /> new language</Button>
                </section>
            </div>
            {languages !== null && (
                <DataTable
                    value={languages}
                    className="border-gray-600 border-[1px] rounded-[2px]"
                    stripedRows
                    rowHover
                >
                    <Column key="name" field="name" header="Name" />
                    <Column key="actions" body={actionBodyTemplate} className="w-[70px]" />
                </DataTable>
            )}
            <Form visible={formVisible} setVisible={setFormVisible} language={selectedLanguage} onSubmit={fetchLanguages} onCancel={cancelForm} />
            <Toast ref={toast} />
            <ConfirmDialog />
        </div>
    );
};

export default Languages;