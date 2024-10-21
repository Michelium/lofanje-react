import React from "react";
import { Entry } from "../../../types/Entry";
import { Category } from "../../../types/Category";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
}

const EntriesTable = ({ category, entries, totalRecords, page, rows, sortField, sortOrder, onPageChange, onSort }: EntriesTableProps) => {
    const first = (page - 1) * rows;

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
        </DataTable>
    );
};

export default EntriesTable;
