import { Field } from "./Field";

export interface Category {
    id: number,
    name: string,
    fields: Field[]
}