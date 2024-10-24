import React, { useEffect, useState } from "react";
import { Category } from "../../types/Category";
import { Entry } from "../../types/Entry";
import apiRequest from "../../helpers/apiHelper";
import EntriesTable from "./EntriesTable";

interface EntriesProps {
    category: Category;
}

const Entries = ({ category }: EntriesProps) => {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [rows, setRows] = useState<number>(25);
    const [sortField, setSortField] = useState<string | undefined>(undefined);
    const [sortOrder, setSortOrder] = useState<1 | -1 | undefined>(undefined);  // Set sortOrder to use 1 | -1 | undefined

    const fetchEntries = (page: number, rows: number, sortField: string | undefined, sortOrder: 1 | -1 | undefined) => {
        setLoading(true);
        let apiUrl = `/api/entries?category=${category.id}&page=${page}&rows=${rows}`;

        if (sortField) {
            apiUrl += `&sortField=${sortField}&sortOrder=${sortOrder}`;
        }

        apiRequest("get", apiUrl)
            .then((data) => {
                setEntries(data.entries);
                console.log(entries);
                setTotalRecords(Number(data.totalRecords));
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching entries:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (category?.id) {
            fetchEntries(page, rows, sortField, sortOrder);
        }
    }, [category, page, rows, sortField, sortOrder]);

    const onPageChange = (event: any) => {
        setPage(event.page + 1);
        setRows(event.rows);
    };

    const onSort = (event: any) => {
        console.log("onSort event:", event);
        setSortField(event.sortField);
        setSortOrder(event.sortOrder);
    };

    return (
        <section>
            {loading ? (
                <p>Loading entries...</p>
            ) : (
                <EntriesTable
                    entries={entries}
                    category={category}
                    totalRecords={totalRecords}
                    page={page}
                    rows={rows}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onPageChange={onPageChange}
                    onSort={onSort}
                />
            )}
        </section>
    );
};

export default Entries;
