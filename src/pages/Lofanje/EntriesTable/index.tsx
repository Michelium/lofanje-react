import React from "react";
import { Entry } from "../../../types/Entry";
import { Category } from "../../../types/Category";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Button from "../../../components/ui/Button";
import { FaEdit } from "react-icons/fa";

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
}

const EntriesTable = ({ category, entries, totalRecords, page, rows, sortField, sortOrder, onPageChange, onSort, onEditEntry }: EntriesTableProps) => {
    const first = (page - 1) * rows;

    const actionBodyTemplate = (rowData: Entry) => {
        return <Button type="button" size="small" rounded onClick={() => onEditEntry(rowData)}><FaEdit /></Button>;
    };

    return (
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
            removableSort
            showGridlines
            stripedRows
            rowHover
            scrollable={false}
            tableStyle={{ tableLayout: "fixed" }}
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
            <Column body={actionBodyTemplate} style={{ width: "70px" }} />
        </DataTable>
    );
};

export default EntriesTable;
