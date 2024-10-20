import React from "react";
import { Entry } from "../../types/Entry";
import { Category } from "../../types/Category";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface EntriesTableProps {
    category: Category;
    entries: Entry[];
}

const EntriesTable = ({ category, entries }: EntriesTableProps) => {

    console.log("EntriesTable", { category, entries });

    return (
        <DataTable value={entries} paginator rows={25} rowsPerPageOptions={[10, 25, 50]} removableSort showGridlines stripedRows
                   className="border-gray-600 border-[1px] rounded-[2px]">
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