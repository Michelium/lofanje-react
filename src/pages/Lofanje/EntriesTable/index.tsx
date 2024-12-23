import React, { useRef, useState } from "react";
import { Entry } from "../../../types/Entry";
import { Category } from "../../../types/Category";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Button from "../../../components/ui/Button";
import { FaEdit } from "react-icons/fa";
import { LiaTimesSolid } from "react-icons/lia";
import { ContextMenu } from "primereact/contextmenu";
import apiRequest from "../../../helpers/apiHelper";

interface EntriesTableProps {
    category: Category;
    entries: Entry[];
    totalRecords: number;
    page: number;
    rows: number;
    sortField: string | undefined;
    sortOrder: -1 | 1 | undefined;
    onPageChange: (event: any) => void;
    onSort: (event: any) => void;
    onEditEntry: (entry: Entry) => void;
    refreshEntries: () => void;
}

const EntriesTable = ({ category, entries, totalRecords, page, rows, sortField, sortOrder, onPageChange, onSort, onEditEntry, refreshEntries }: EntriesTableProps) => {
    const first = (page - 1) * rows;

    const contextMenu = useRef<ContextMenu>(null);

    const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
    const menuModel = [
        { label: "delete", icon: <LiaTimesSolid className="mr-2 mt-0.5" />, command: () => selectedEntry ? deleteProduct(selectedEntry) : null }
    ];
    const deleteProduct = (entry: Entry | null) => {
        if (!entry) return;

        apiRequest("delete", `/api/entries/${entry.id}`)
            .then(() => {
                console.log(`Entry ${entry.id} deleted successfully.`);
                refreshEntries();
            })
            .catch(error => {
                console.error("Error deleting entry:", error);
            });
    };


    const actionBodyTemplate = (rowData: Entry) => {
        return <Button type="button" size="small" rounded onClick={() => onEditEntry(rowData)}><FaEdit /></Button>;
    };

    return (
        <>
            <ContextMenu model={menuModel} ref={contextMenu} onHide={() => setSelectedEntry(null)} />
            <DataTable
                value={entries}
                paginator
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rows={rows}
                totalRecords={totalRecords}
                lazy
                onPage={onPageChange}
                onSort={onSort}
                first={first}
                sortField={sortField}
                sortOrder={sortOrder}
                rowsPerPageOptions={[10, 25, 50]}
                onContextMenu={(e) => contextMenu.current?.show(e.originalEvent)}
                contextMenuSelection={selectedEntry || {}}
                onContextMenuSelectionChange={(e) => setSelectedEntry(e.value)}
                removableSort
                showGridlines
                stripedRows
                rowHover
                scrollable={false}
                tableStyle={{ tableLayout: "fixed" }}
                paginatorClassName="border-gray-600 border-t-[1px]"
                className="border-gray-600 border-[1px] rounded-[2px]"
            >
                {category.fields.map(field => (
                    <Column
                        key={field.name}
                        field={`value.${field.name}`}
                        header={field.label}
                        sortable
                        headerClassName="align-bottom"
                    />
                ))}
                <Column key="actions" body={actionBodyTemplate} className="w-[70px]" />
            </DataTable>
        </>
    );
};

export default EntriesTable;
