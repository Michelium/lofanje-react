import React, { useEffect, useRef, useState } from "react";
import apiRequest from "../../../../helpers/apiHelper";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Button from "../../../../components/ui/Button";
import { FaPlus } from "react-icons/fa6";
import Form from "./Form";
import { FaEdit, FaTimes } from "react-icons/fa";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { Toast } from "primereact/toast";
import { User } from "../../../../types/User";

const Users = () => {

    const toast = useRef<Toast>(null);

    const [users, setUsers] = useState<User[] | null>(null);

    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const cancelForm = () => {
        setFormVisible(false);
        setSelectedUser(null);
    };

    const fetchUsers = () => {
        apiRequest("get", "/api/users")
            .then(data => {
                setUsers(data);
            }, (error) => {
                console.error({ error });
            });
    };

    const deleteUser = (user: User) => {
        apiRequest("delete", `/api/users/${user.id}`)
            .then(() => {
                toast.current?.show({ severity: "success", summary: "Success", detail: "User deleted successfully", life: 3000 });
                fetchUsers();
            }, (error) => {
                console.error({ error });
            });
    };

    const deleteConfirmDialog = (user: User) => {
        confirmDialog({
            message: (<p>Are you sure you want to delete this user? This action cannot be undone.</p>),
            header: "Delete User",
            icon: <BsFillExclamationTriangleFill />,
            defaultFocus: "reject",
            dismissableMask: true,
            closeOnEscape: true,
            draggable: false,
            acceptClassName: "bg-red-500 hover:bg-red-600 border-red-600 hover:border-red-400 focus:border-red-400 px-3 py-2 text-sm rounded-[4px] text-white",
            rejectClassName: "bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-gray-400 focus:border-gray-400 px-3 py-2 text-sm rounded-[4px] text-white mr-4",
            accept: () => deleteUser(user),
            reject: () => {
            }
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    const actionBodyTemplate = (rowData: User) => {
        return (<div className="flex gap-x-2">
            <Button type="button" size="small" rounded onClick={() => {
                setSelectedUser(rowData);
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
            {users !== null && (
                <DataTable
                    value={users}
                    className="border-gray-600 border-[1px] rounded-[2px]"
                    stripedRows
                    rowHover
                >
                    <Column key="username" field="username" header="Username" />
                    <Column key="actions" body={actionBodyTemplate} className="w-[70px]" />
                </DataTable>
            )}
            <Form visible={formVisible} setVisible={setFormVisible} user={selectedUser} onSubmit={fetchUsers} onCancel={cancelForm} />
            <Toast ref={toast} />
            <ConfirmDialog />
        </div>
    );
};

export default Users;