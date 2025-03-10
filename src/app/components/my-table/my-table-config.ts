export class MyTableConfig{
    headers: MyHeaders[] | undefined;
    pagination: MyPagination | undefined;
    myActions: MyActions[] | undefined;
    aggiuntaUrl: string | undefined;
}

export interface MyHeaders {
    name: string;
    field: string;
    sorting?: "asc" | "desc";
    visibile: boolean;
    css?: any;
    type?: string;
}

export interface MyActions{
    label?: string | undefined;
    field?: string;
    icon?: string;
    iconPosition?: string;
    css?: any | undefined;
}

export interface MyPagination{
    itemPerPage: number | undefined;
    numeroPagine?: number[] | undefined;
}
