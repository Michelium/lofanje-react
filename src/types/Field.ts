export interface Field {
    id: number,
    label: string, // Human-readable name of the field 
    name: string, // Code readable name of the field
    type: 'TextType' | 'TextareaType' | 'SelectType',
    options: string[],
    multiple: boolean,
}