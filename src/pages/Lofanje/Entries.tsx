import React, { useEffect, useState } from "react";
import { Category } from "../../types/Category";
import { Entry } from "../../types/Entry";
import apiRequest from "../../helpers/apiHelper";
import EntriesTable from "./EntriesTable";

interface EntriesTableProps {
    category: Category;
}

const Entries = ({ category }: EntriesTableProps) => {

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
                <EntriesTable entries={entries} category={category} />
            )
            }
        </section>
    );
};

export default Entries;