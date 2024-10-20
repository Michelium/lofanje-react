import React, { useEffect, useState } from "react";
import { Category } from "../../types/Category";
import { Entry } from "../../types/Entry";
import apiRequest from "../../helpers/apiHelper";

interface EntriesTableProps {
    category: Category;
}

const EntriesTable = ({ category }: EntriesTableProps) => {

    const [entries, setEntries] = useState<Entry[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        if (category?.id) {
            apiRequest("get", `/api/entries?category=${category.id}`)
                .then(data => {
                    setEntries(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching entries:", error);
                });
        }
    }, [category]);

    if (!category?.fields || category.fields.length === 0) {
        return <div>No fields available for this category.</div>;
    }

    return (
        <section>
            {loading ? (
                <p>Loading entries...</p>
            ) : (
                <table className="table-auto w-full text-left">
                    <thead>
                    <tr className="align-bottom">
                        {category.fields.map(field => (
                            <th key={field.id}>{field.label}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {entries.length > 0 ? (
                        entries.map(entry => (
                            <tr key={entry.id}>
                                {category.fields.map(field => (
                                    <td key={field.id}>
                                        {entry.value[field.name] || ""}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={category.fields.length}>No entries found for category {category.name}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            )
            }
        </section>
    );
};

export default EntriesTable;