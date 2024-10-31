import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Toast } from "primereact/toast";
import apiRequest from "../../../../helpers/apiHelper";
import Input from "../../../../components/form/Input";
import Button from "../../../../components/ui/Button";
import { User } from "../../../../types/User";

interface FormProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    user?: User | null;
    onSubmit?: () => void;
    onCancel?: () => void;
}

const Form = ({ visible, setVisible, user = null, onSubmit, onCancel }: FormProps) => {
    const [formData, setFormData] = useState<{ username: string, password?: string | null }>({ username: "", password: "" });

    const toast = useRef<Toast>(null);

    useEffect(() => {
        if (user) {
            setFormData({ username: user.username });
        } else {
            setFormData({ username: "" });
        }
    }, [user]);

    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const method = user ? "put" : "post";
        const route = user ? `/api/users/${user.id}` : "/api/users";

        const languageData = { username: formData.username, password: formData.password };

        apiRequest(method, route, languageData)
            .then((data: any) => {
                toast.current?.show({ severity: "success", summary: "Success", detail: "User saved successfully", life: 3000 });
                if (onSubmit) onSubmit();
                setVisible(false);
                setFormData({ username: "", password: "" });
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
                dismissableMask
                onHide={() => (onCancel ? onCancel() : setVisible(false))}>
                <header className="text-white">
                    <h3 className="text-md font-bold mb-5">{user ? "edit" : "create"} user</h3>
                </header>
                <main>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="mb-4 flex items-center">
                            <label htmlFor="name" className="text-white w-1/6">Username:</label>
                            <div className="w-5/6">
                                <Input
                                    className="w-full"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.username}
                                    onChange={(e) => handleInputChange("username", e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </fieldset>
                        <fieldset className="mb-4 flex items-center">
                            <label htmlFor="password" className="text-white w-1/6">Password:</label>
                            <div className="w-5/6">
                                <Input
                                    className="w-full"
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                />
                                {user && (
                                    <small className="text-gray-400">Leave empty to keep the current password</small>
                                )}
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
