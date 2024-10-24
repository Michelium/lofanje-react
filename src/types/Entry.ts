export interface Entry {
    id?: number;
    category_id: number;
    value: { [key: string]: string | null };
}